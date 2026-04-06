import nodemailer from "nodemailer"

export const sendMail = async (to, subject, html="") => {
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.MAILTRAP_SMTP_HOST,
			port: process.env.MAILTRAP_SMTP_PORT,
			auth: {
				user: process.env.MAILTRAP_SMTP_USER,
				pass: process.env.MAILTRAP_SMTP_PASS
			}
		});

		const info = await transporter.sendMail({
			from: 'Inngest TMS', 
			to,
			subject,
			html
		});

		console.log("Message sent: %s", info.messageId);
		
		return info;
		
	} catch (error) {		
		console.log("Error in Mail : %s", error.message);
		throw error;
	}
}

