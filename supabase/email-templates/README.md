# Email templates

Supabase sends these. Paste each file into
**Supabase → Authentication → Emails**, into the matching template.

| File | Supabase template | When it sends |
|------|-------------------|---------------|
| `invite.html` | Invite user | A new trainee is invited from the staff panel |
| `reset-password.html` | Reset password | A password reset, and re-invites — the invite API falls back to a reset link when the account already exists |

Set the subject lines too, above the body:

- Invite user: **You're in — your Remote Roles Hub place is confirmed**
- Reset password: **Set your Remote Roles Hub password**

## Before these are worth sending

Supabase's built-in sender is rate-limited to a handful of emails an hour
and sends from a Supabase address, which lands in spam often enough to
matter. Connect a real sender first:

1. Create an account with a transactional provider (Resend is the easiest).
2. Add its SPF, DKIM and DMARC records to `remoteroles.online` DNS.
3. Supabase → Project Settings → Authentication → SMTP Settings. Enter the
   provider's host, port, username and password, and set the sender to
   something like `hello@remoteroles.online` with sender name
   `Remote Roles Hub`.
4. Send yourself an invite and check it does not land in spam.

Until step 3 is done these templates still render — they just go out from
Supabase's address, slowly.

## Variables

`{{ .ConfirmationURL }}` is the link, `{{ .Email }}` is the recipient.
Supabase fills both in. Don't rename them.

## No images

Both templates are text and colour only. Mail clients block remote images
by default, so a logo would show as a broken box for most recipients the
first time they open it. Once the domain is live you can swap the header
wordmark for an `<img>` pointing at `https://remoteroles.online/brand/rr-logo.png`
if you'd rather — just know roughly half of people won't see it.
