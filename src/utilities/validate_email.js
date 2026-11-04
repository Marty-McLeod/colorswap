// Returns a boolean true/false for a validated email address
// (true = valid)
export function validateEmail(email_address) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email_address);
};