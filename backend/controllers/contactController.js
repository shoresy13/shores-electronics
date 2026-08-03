import nodemailer from "nodemailer";
import dns from "dns";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    connectionTimeout: 10000,
    dnsTimeout: 10000,
    lookup: (hostname, options, callback) => {
        return dns.lookup(hostname, { family: 4 }, callback);
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: emailPass,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "ALL FIELDS REQUIRED." });
    }

    try {
        const sanitizedMessage = message.replace(/\n/g, "<br />");
        const fontStack = "Arial, Helvetica, sans-serif";

        // ADMIN EMAIL
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `[NEW MESSAGE] - ${name.toUpperCase()}`,
            text: `NAME: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`,
            html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: ${fontStack}; color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #1925aa; box-shadow: 6px 6px 0 #1925aa;">
            
            <div style="background-color: #1925aa; color: #ffffff; padding: 16px;">
              <h1 style="margin: 0; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; color: #ffffff;">
                NEW CONTACT INQUIRY
              </h1>
            </div>

            <div style="padding: 24px;">
              <div style="border-left: 4px solid #1925aa; background-color: #f8f9fa; padding: 12px 16px; margin-bottom: 20px;">
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">NAME:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">EMAIL:</strong> <a href="mailto:${email}" style="color: #1925aa; text-decoration: underline;">${email}</a></p>
              </div>

              <div style="background-color: #ffffff; border: 2px solid #000000; padding: 16px;">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">MESSAGE</p>
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #111111; font-size: 14px;">${sanitizedMessage}</p>
              </div>
            </div>

            <div style="background-color: #f4f4f4; border-top: 2px solid #000000; padding: 12px 24px; font-size: 12px; color: #555555;">
              Reply directly to this email to respond to <a href="mailto:${email}" style="color: #1925aa; font-weight: bold;">${email}</a>.
            </div>

          </div>
        </div>
      `,
        };

        // CUSTOMER EMAIL
        const customerMailOptions = {
            from: `"SHORES ELECTRONICS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `[CONFIRMATION] We received your message`,
            text: `Hello ${name},\n\nThank you for contacting Shores Electronics. We have received your message:\n\n"${message}"\n\nWe will review your inquiry and get back to you as soon as possible.\n\nBest regards,\nJacob Lewis-Shores\nShores Electronics`,
            html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: ${fontStack}; color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #1925aa; box-shadow: 6px 6px 0 #1925aa;">
            
            <div style="background-color: #1925aa; color: #ffffff; padding: 16px;">
              <h1 style="margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">SHORES ELECTRONICS</h1>
              <p style="margin: 4px 0 0 0; font-size: 11px; letter-spacing: 1px; opacity: 0.9; color: #ffffff;">MESSAGE CONFIRMATION</p>
            </div>

            <div style="padding: 24px;">
              <p style="margin-top: 0; font-weight: bold; font-size: 15px;">Hello ${name},</p>
              
              <p style="line-height: 1.6; font-size: 14px; color: #222222;">
                Thank you for contacting <strong>Shores Electronics</strong>. We have successfully received your message and will review your request shortly.
              </p>

              <div style="background-color: #f9f9f9; border: 2px solid #000000; padding: 16px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #1925aa; letter-spacing: 1px;">
                  YOUR MESSAGE:
                </p>
                <p style="margin: 0; font-style: italic; color: #333333; line-height: 1.6; font-size: 14px;">
                  "${sanitizedMessage}"
                </p>
              </div>

              <p style="line-height: 1.6; font-size: 14px; color: #222222;">
                We will reply to your inquiry as soon as possible.
              </p>

              <br />
              <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-size: 13px;">Best regards,</p>
              <p style="margin: 4px 0 0 0; color: #1925aa; font-weight: bold; font-size: 15px;">Jacob Lewis-Shores</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #555555;">Shores Electronics</p>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #e5e5e5; border-top: 2px solid #000000; padding: 12px 24px; font-size: 11px; color: #555555;">
              <p style="margin: 0 0 4px 0;">This is an automated confirmation of your contact form submission.</p>
              <p style="margin: 0; color: #777777;">Please check your spam folder if future replies do not appear in your inbox.</p>
            </div>

          </div>
        </div>
      `,
        };

        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(customerMailOptions),
        ]);

        res.status(200).json({
            message: "MESSAGE SENT SUCCESSFULLY. PLEASE CHECK YOUR INBOX AND SPAM FOLDER FOR CONFIRMATION."
        });
    } catch (error) {
        console.error("Nodemailer error:", error);
        res.status(500).json({ message: "MESSAGE SENDING FAILED." });
    }
};