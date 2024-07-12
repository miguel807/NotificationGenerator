import { EmailProvider } from "src/notification/interfaces/EmailProvider";



export class SendGridEmailProvider implements EmailProvider {


  async sendEmail(to: string, content: string): Promise<void> {
   
    console.log(`Enviando correo a ${to}  usando SendGrid.`);
  }
}
