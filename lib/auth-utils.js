export async function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendVerificationCode(contact, code, type = "email") {
  console.log(`Verification code for ${contact}: ${code}`)

  if (type === "email") {
    try {
      const nodemailer = require("nodemailer")

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: contact,
        subject: "Verification Code - Admin Dashboard",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Verification Code</h2>
            <p>Your verification code is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
              ${code}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      })

      return true
    } catch (error) {
      console.error("Email sending failed:", error)
      return false
    }
  }

  return false
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function hasPermission(userRole, requiredPermission) {
  const rolePermissions = {
    admin: ["all"],
    manager: ["user_management", "view_reports", "edit_users"],
    user: ["view_profile", "edit_profile"],
  }

  const permissions = rolePermissions[userRole] || []
  return permissions.includes("all") || permissions.includes(requiredPermission)
}
