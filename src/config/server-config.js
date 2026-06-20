require('dotenv').config();

const PORT = Number(process.env.PORT);
const GMAIL_PASS = process.env.GMAIL_PASS
const GMAIL_EMAIL = process.env.GMAIL_EMAIL
module.exports = {
    PORT,
    GMAIL_PASS,
    GMAIL_EMAIL
}