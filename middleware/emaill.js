const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");

const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN })

module.exports = mg;