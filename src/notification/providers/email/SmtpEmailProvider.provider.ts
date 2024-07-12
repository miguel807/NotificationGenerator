import { EmailProvider } from "src/notification/interfaces/EmailProvider";


export class SmtpEmailProvider implements EmailProvider {
  async sendEmail(to: string, content: string): Promise<void> {
    
    // Implementación para enviar correo usando SMTP
    console.log(`Enviando correo a ${to} usando SMTP.`);
    // Aquí iría el código para enviar el correo usando un cliente SMTP.
  }
}
