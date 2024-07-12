export interface EmailProvider {
    sendEmail(to: string,content: string): Promise<void>;
  }
  