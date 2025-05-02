const nodemailer = require("nodemailer");
const twilio = require("twilio");

// Email
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ID,
		pass: process.env.EMAIL_PASS,
	},
});

// SMS (Twilio)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendExpiryNotification = async ({ user, product }) => {
	const message = `Reminder: ${product.name} will expire on ${product.expd}.`;

	// Email
	await transporter.sendMail({
		to: user.email,
		subject: "Product Expiry Alert",
		text: message,
	});

	// SMS
	await twilioClient.messages.create({
		body: message,
		from: process.env.TWILIO_PHONE,
		to: user.phone, // Ensure this exists
	});

	return true;
};

module.exports = sendExpiryNotification;
