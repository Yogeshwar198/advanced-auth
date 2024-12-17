import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email send successfully");

    } catch (error) {
        console.error('Error sending verification', error)
        throw new Error(`Error sending verification message: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "87815ac2-9fe8-4609-b120-6e78246aa066",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name
            }
        })
        console.log("Welcom email send successfully", response);

    } catch (error) {
        console.error(`Error sending welcome email`, error)
        throw new Error(`Error sending welcome email: ${email}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.log('Error in sending password reset email', error);

        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully", response);

    } catch (error) {
        console.error('Error sending password reset success email', error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}