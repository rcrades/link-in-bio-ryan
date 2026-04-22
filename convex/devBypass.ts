// Treat gmail/googlemail addresses as dot-insensitive for dev-bypass matching,
// because Gmail delivers `ryan.rademann@gmail.com` and `ryanrademann@gmail.com`
// to the same mailbox. Also strip +suffix so `ryan+test@gmail.com` matches too.
function canonicalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  const atIdx = trimmed.lastIndexOf("@");
  if (atIdx < 0) return trimmed;
  const local = trimmed.slice(0, atIdx);
  const domain = trimmed.slice(atIdx + 1);
  const isGmail = domain === "gmail.com" || domain === "googlemail.com";
  if (!isGmail) return trimmed;
  const plusIdx = local.indexOf("+");
  const base = plusIdx >= 0 ? local.slice(0, plusIdx) : local;
  return base.replace(/\./g, "") + "@gmail.com";
}

export function shouldAutoPromote(
  email: string | undefined,
  bypassFlag: string | undefined,
  bypassEmail: string | undefined,
): boolean {
  if (!email) return false;
  if (bypassFlag !== "true" && bypassFlag !== "1") return false;
  if (!bypassEmail) return false;
  return canonicalizeEmail(email) === canonicalizeEmail(bypassEmail);
}
