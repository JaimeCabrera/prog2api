const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  const { email, username, userEmail, tasks } = req.body;

  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e0126e1d4839aa",
      pass: "f7c6a8263ac656",
    },
  });

  var arrayItems = "";
  tasks.map((task) => {
    arrayItems +=
      `<li style="margin-top: 15px; padding: 10px; border: 1px solid #9c9c9c">` +
      task.name +
      `</li>`;
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${username} ${userEmail}`, // sender address
    to: `${email}`, // list of receivers
    subject: "Tareas ✔", // Subject line
    text: "Hola te comparto mis tareas", // plain text body
    html: `
    <main
      style="
        background-color: #E5E8E8;
        color: #2e5983;
        width: auto;
        padding: 50px;
      "
    >
      <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius: 10px;padding-bottom: 40px;">
        <h2 style="text-align: center; color: #20262e; padding-top: 40px;">Gestor de Tareas:</h2>
        <ul style="list-style: none; padding: 25px; ">${arrayItems}</ul>
      </div>
    </main>
  
    
    `, // html body
  });
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  res.send({ ok: true, message: "Email Enviado" });
};
