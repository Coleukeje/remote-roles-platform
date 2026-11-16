import { PDFDocument, rgb, degrees, PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  PLAYFAIR_SEMIBOLD,
  POPPINS_REGULAR,
  POPPINS_MEDIUM,
  RR_LOGO_PNG,
  decodeAsset,
} from "./certificate-assets";

/* Brand */
const INK = rgb(0.11, 0.04, 0.22);      // #1C0A38
const PURPLE = rgb(0.486, 0.227, 0.929); // #7C3AED
const MUTED = rgb(0.42, 0.39, 0.5);
const PAPER = rgb(1, 1, 1);
const WASH = rgb(0.976, 0.961, 0.996);

export type CertificateData = {
  recipientName: string;
  code: string;
  issuedOn: Date;
  verifyUrl: string;
};

/** Keep only characters the display face can actually draw.
 *  Playfair covers Latin and the common accents but not every Yoruba or
 *  Igbo mark, and pdf-lib draws a missing glyph as a silent gap — a blank
 *  hole in someone's name on their own certificate. So decompose, drop
 *  the marks the font lacks, and recompose. "Ọlúwaṣeun" keeps its ú and
 *  becomes "Ọluwaseun" only where the font genuinely has nothing. */
function glyphSafe(font: { hasGlyphForCodePoint?: (cp: number) => boolean }, text: string): string {
  const can = (ch: string) => {
    const cp = ch.codePointAt(0)!;
    return font.hasGlyphForCodePoint ? font.hasGlyphForCodePoint(cp) : true;
  };
  return [...text]
    .map((ch) => {
      if (can(ch)) return ch;
      const decomposed = [...ch.normalize("NFD")].filter(can).join("");
      const recomposed = decomposed.normalize("NFC");
      return [...recomposed].every(can) ? recomposed : decomposed.replace(/\p{M}/gu, "");
    })
    .join("");
}

/** Letterspaced small caps — pdf-lib has no tracking, so draw per glyph. */
function drawTracked(
  page: ReturnType<PDFDocument["addPage"]>,
  text: string,
  opts: { font: PDFFont; size: number; y: number; color: ReturnType<typeof rgb>; tracking: number; centerX: number },
) {
  const { font, size, y, color, tracking, centerX } = opts;
  const chars = [...text];
  const width =
    chars.reduce((w, c) => w + font.widthOfTextAtSize(c, size), 0) +
    tracking * Math.max(0, chars.length - 1);
  let x = centerX - width / 2;
  for (const c of chars) {
    page.drawText(c, { x, y, size, font, color });
    x += font.widthOfTextAtSize(c, size) + tracking;
  }
}

/** Shrink the display size until the name fits the available width. */
function fitSize(font: PDFFont, text: string, maxWidth: number, start: number, min: number) {
  let size = start;
  while (size > min && font.widthOfTextAtSize(text, size) > maxWidth) size -= 1;
  return size;
}

export async function buildCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const displayBytes = decodeAsset(PLAYFAIR_SEMIBOLD);
  const displayMetrics = fontkit.create(displayBytes) as unknown as {
    hasGlyphForCodePoint: (cp: number) => boolean;
  };
  const display = await pdf.embedFont(displayBytes, { subset: true });
  const body = await pdf.embedFont(decodeAsset(POPPINS_REGULAR), { subset: true });
  const label = await pdf.embedFont(decodeAsset(POPPINS_MEDIUM), { subset: true });
  const logo = await pdf.embedPng(decodeAsset(RR_LOGO_PNG));

  // A4 landscape
  const W = 841.89;
  const H = 595.28;
  const page = pdf.addPage([W, H]);
  const cx = W / 2;

  pdf.setTitle(`Remote Roles Hub — Certificate of Completion — ${data.recipientName}`);
  pdf.setAuthor("Remote Roles Hub");
  pdf.setSubject(`Certificate ${data.code}`);
  pdf.setProducer("Remote Roles Hub");

  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAPER });

  // Deep ink spine down the left edge, with the wordmark running up it.
  const spine = 46;
  page.drawRectangle({ x: 0, y: 0, width: spine, height: H, color: INK });
  page.drawText("REMOTE ROLES HUB", {
    x: spine / 2 + 5.5,
    y: 40,
    size: 9,
    font: label,
    color: rgb(1, 1, 1),
    rotate: degrees(90),
  });
  page.drawText("remoteroles.online", {
    x: spine / 2 + 5.5,
    y: H - 150,
    size: 7.5,
    font: body,
    color: rgb(0.65, 0.58, 0.8),
    rotate: degrees(90),
  });

  // Inner rule, offset from the spine
  const pad = 30;
  page.drawRectangle({
    x: spine + pad,
    y: pad,
    width: W - spine - pad * 2,
    height: H - pad * 2,
    borderColor: rgb(0.906, 0.882, 0.949),
    borderWidth: 1,
  });

  // Logo, centred in the field to the right of the spine
  const fieldCx = spine + (W - spine) / 2;
  const logoW = 54;
  const logoH = (logo.height / logo.width) * logoW;
  page.drawImage(logo, { x: fieldCx - logoW / 2, y: H - 128, width: logoW, height: logoH });

  drawTracked(page, "CERTIFICATE OF COMPLETION", {
    font: label, size: 10, y: H - 168, color: PURPLE, tracking: 3.6, centerX: fieldCx,
  });

  // Recipient
  page.drawText("This is to certify that", {
    x: fieldCx - body.widthOfTextAtSize("This is to certify that", 11) / 2,
    y: H - 214, size: 11, font: body, color: MUTED,
  });

  const name = glyphSafe(displayMetrics, data.recipientName.trim()) || "Trainee";
  const nameSize = fitSize(display, name, W - spine - 190, 42, 18);
  const nameWidth = display.widthOfTextAtSize(name, nameSize);
  page.drawText(name, { x: fieldCx - nameWidth / 2, y: H - 266, size: nameSize, font: display, color: INK });

  const ruleHalf = Math.max(150, nameWidth / 2 + 14);
  page.drawLine({
    start: { x: fieldCx - ruleHalf, y: H - 284 },
    end: { x: fieldCx + ruleHalf, y: H - 284 },
    thickness: 1.2,
    color: PURPLE,
  });

  // Citation
  const lines = [
    "has completed the Remote Roles Hub Remote Work and Real Estate",
    "Cold Calling Programme — sixteen days of training, assessment",
    "and live roleplay across telemarketing, seller discovery and acquisitions.",
  ];
  lines.forEach((line, i) => {
    page.drawText(line, {
      x: fieldCx - body.widthOfTextAtSize(line, 11.5) / 2,
      y: H - 316 - i * 19, size: 11.5, font: body, color: rgb(0.25, 0.21, 0.35),
    });
  });

  drawTracked(page, "16 DAYS   ·   3 MODULES   ·   ASSESSED ROLEPLAY", {
    font: label, size: 8.5, y: H - 404, color: MUTED, tracking: 2.2, centerX: fieldCx,
  });

  // Footer: date left, verification right, both on the same baseline
  const footY = 92;
  const leftX = spine + 86;
  const rightX = W - 86;

  page.drawLine({ start: { x: leftX, y: footY + 16 }, end: { x: leftX + 170, y: footY + 16 }, thickness: 0.8, color: rgb(0.78, 0.74, 0.85) });
  page.drawText("Cole Ukeje", { x: leftX, y: footY, size: 11, font: label, color: INK });
  page.drawText("Founder, Remote Roles", { x: leftX, y: footY - 14, size: 8.5, font: body, color: MUTED });

  // Fixed timezone: a certificate issued late on the 16th in Lagos must not
  // print the 15th because the server happens to sit west of UTC.
  const issued = data.issuedOn.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos",
  });
  page.drawLine({ start: { x: rightX - 170, y: footY + 16 }, end: { x: rightX, y: footY + 16 }, thickness: 0.8, color: rgb(0.78, 0.74, 0.85) });
  page.drawText(issued, { x: rightX - label.widthOfTextAtSize(issued, 11), y: footY, size: 11, font: label, color: INK });
  page.drawText("Date of issue", { x: rightX - body.widthOfTextAtSize("Date of issue", 8.5), y: footY - 14, size: 8.5, font: body, color: MUTED });

  // Verification strip along the bottom
  const stripH = 30;
  page.drawRectangle({ x: spine + pad, y: pad, width: W - spine - pad * 2, height: stripH, color: WASH });
  const codeLabel = `Certificate ${data.code}`;
  const verifyLabel = `Verify at ${data.verifyUrl}`;
  page.drawText(codeLabel, { x: spine + pad + 16, y: pad + 11, size: 8.5, font: label, color: INK });
  page.drawText(verifyLabel, {
    x: W - pad - 16 - body.widthOfTextAtSize(verifyLabel, 8.5),
    y: pad + 11, size: 8.5, font: body, color: MUTED,
  });

  return pdf.save();
}
