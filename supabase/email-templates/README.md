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

## The logo

Both templates load the logo from
`https://remoteroles.online/brand/rr-logo-email.png` — a 160px copy kept in
`public/brand/` specifically for email, so nothing heavy is being pulled
into an inbox.

That URL only resolves once the site is deployed at that domain. Until
then, point it at the Netlify address instead:
`https://rrh-training.netlify.app/brand/rr-logo-email.png`

Either way the email reads correctly with images off — mail clients block
them by default, and the alt text carries the wordmark.
