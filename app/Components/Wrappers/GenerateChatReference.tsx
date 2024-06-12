const sanitizeEmail = (email: string) => {
    return email.replace(/[.#$[\]]/g, '_');
  };
  
  export const generateChatRef = (email1: string, email2: string) => {
    const emails = [sanitizeEmail(email1), sanitizeEmail(email2)].sort();  // Sort to maintain consistency
    return emails.join('_');
  };
  