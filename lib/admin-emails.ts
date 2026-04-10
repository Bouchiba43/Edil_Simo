export const ALLOWED_ADMIN_EMAILS = [
  "ahmedbouchiba43@gmail.com",
  "ousa.bouchiba3@hotmail.it",
] as const;

export function isAllowedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase() as (typeof ALLOWED_ADMIN_EMAILS)[number]);
}
