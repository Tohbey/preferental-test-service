const RandExp = require("randexp");
const dotenv = require('dotenv').config();
const mailjetAPIKEY1 = process.env.MAILJETAPIKEY1;
const mailjetAPIKEY2 = process.env.MAILJETAPIKEY2;

const mailjet = require('node-mailjet').connect(mailjetAPIKEY1, mailjetAPIKEY2)



GenerateCode = (num) => {
  const token = new RandExp(`[a-z]{${num}}`).gen();

  return token;
};

GenerateOTP = (num) => {
  const OTPCode = new RandExp(`[0-9]{${num}}`).gen();

  return OTPCode;
};

const paginate = (req) => {
  const page =
    typeof req.query.page !== "undefined" ? Math.abs(req.query.page) : 1;
  const pageSize =
    typeof req.query.pageSize !== "undefined"
      ? Math.abs(req.query.pageSize)
      : 50;
  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
};

const mailSender = async (to, subject, text, html) => {
  const request = mailjet.post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "fafoworatobi25@gmail.com",
            "Name": "Admin"
          },
          "To": [
            to
          ],
          "Subject": subject,
          "TextPart": text,
          "HTMLPart": html,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })

  await request.then((result) => {
    console.log(result.body)
  }).catch((err) => {
    console.log({ err })
  })
}



module.exports = {
  paginate,
  GenerateCode,
  mailSender,
  GenerateOTP
};