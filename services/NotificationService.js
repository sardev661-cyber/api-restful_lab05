const { v4: uuidv4 } = require("uuid");
const NotificationRepository = require("../repositories/NotificationRepository");
const EmailService = require("./email/EmailService");

class NotificationService {
  constructor() {
    this.repo = new NotificationRepository();
    this.emailService = new EmailService();
  }

  create(type, message, ticketId) {
    const notification = {
      id: uuidv4(),
      type,
      message,
      status: "pending",
      ticketId
    };

    // Si el tipo de notificación es "email", enviamos el correo
    if (type == "email") {
      this.emailService.sendEmail({ 
        to: "cvalerianofya29@gmail.com", // Recuerda cambiar esto por tu correo real si vas a probarlo
        subject: "API RESTful - Alertas del sistema de Tickets", 
        htmlBody: "<h1>" + message +" </h1>" 
      });
    }

    return this.repo.save(notification);
  }

  list() {
    return this.repo.findAll();
  }
}

module.exports = NotificationService;