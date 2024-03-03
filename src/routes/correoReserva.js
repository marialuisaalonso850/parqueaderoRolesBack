const nodemailer = require("nodemailer");

// const password1="multiservicios1234"
const password = "rvhe hydp zxzo arvt"
const correo = "parkinlocation753@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: correo,
    pass: password,
  },
});

async function sendConfirmationReserva(nombre, telefono, date, gmail, time, placa) {
  try {
    await transporter.sendMail({
      from: "parkinlocation753@gmail.com",
      to: gmail,
      subject: "Reseva Exitosa",
      html: `
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

      <div style="width: 100%; background-color: #ffffff; padding: 5rem 0;">
        <div style="max-width: 700px; background-color: rgba(27, 78, 166, 0.445); margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="width: 100%; background: linear-gradient(90deg, rgba(27,77,166,1) 66%, rgba(42,5,69,1) 91%);; padding: 20px 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <a href="#">
              <img src="https://i.ibb.co/wQYC7K6/images-jpg-Photoroom-png-Photoroom.png" style="width: 100%; height: 70px; object-fit: contain;" alt="Logo de ParkingLocation">
            </a>
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid;">
            <p style="font-weight: 800; font-size: 1.2rem; color: #e65f4d; padding: 0 30px;">
              ¡Gracias por reservar en nuestro parqueadero, ${nombre}!
            </p>
            <p style="padding: 0 30px; color: #000000;">
              Estimad@ Aventurero,
              <br><br>
              Queremos expresar nuestro sincero agradecimiento por tu reserva en nuestro parqueadero. Aquí están los detalles de tu reserva:
              <br><br>
              - Nombre: ${nombre}
              <br>
              - Fecha: ${telefono}
              <br>
              - hora: ${date}
              <br>
              - telefono: ${time}
              <br>
              - placa: ${placa}
              
              <br><br>
              Esperamos que disfrutes de tu estancia en nuestro parqueadero. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
              <br><br>
              ¡Bienvenido a bordo!
              <br>
              
            </p>
          </div>
        </div>
      </div>
  
  
</body>
      `
    });
    console.log("Correo de confirmación enviado a ${gmail}");
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
}
  module.exports = sendConfirmationReserva;