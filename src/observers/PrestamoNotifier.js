const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class PrestamoSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  async notify(prestamoId, userEmail) {
    for (const observer of this.observers) {
      await observer.update(prestamoId, userEmail);
    }
  }
}

class EmailNotifier {
  async update(prestamoId, userEmail) {
    await transporter.sendMail({
      from: '"Biblioteca USIP" <no-reply@biblioteca.com>',
      to: userEmail,
      subject: 'Préstamo Eliminado',
      text: `El préstamo con ID ${prestamoId} ha sido cancelado.`,
    });
  }
}

const notifier = new PrestamoSubject();
notifier.subscribe(new EmailNotifier());

module.exports = notifier;