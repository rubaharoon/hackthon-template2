import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define types
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type EmailRequestBody = {
  email: string;
  name: string;
  cartItems: CartItem[];
  totalPrice: number;
};

// Helper function to generate email content
const generateEmailContent = (name: string, itemsList: string, totalPrice: number) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #4CAF50;">Hello ${name},</h1>
    <p>Thank you for shopping with <strong>Avion</strong>! 🛍️</p>
    <p>We're excited to let you know that your order has been successfully placed. 🎊</p>
    
    <h2 style="color: #4CAF50;">📦 Your Order Details:</h2>
    <ul style="list-style-type: none; padding: 0;">
      ${itemsList}
    </ul>
    <p><strong>💵 Total: $${totalPrice.toFixed(2)}</strong></p>

    <p>🚚 Your parcel will be delivered to you soon! We hope you love your new items. 😊</p>
    <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:rubaharoon80@gmail.com" style="color: #4CAF50; text-decoration: none;">rubaharoon80@gmail.com</a> or call us at <strong>+92-3323577700</strong>.</p>

    <p>Thank you again for choosing <strong>Avion</strong>! We appreciate your trust in us. ❤️</p>
    <p>Have a great day! 🌟</p>

    <p style="font-size: 12px; color: #777;">
      This is an automated email. Please do not reply directly to this message.
    </p>
  </div>
`;

export async function POST(request: Request) {
  // Parse and validate request body
  const { email, name, cartItems, totalPrice }: EmailRequestBody =
    await request.json();

  if (
    !email ||
    !name ||
    !cartItems ||
    !Array.isArray(cartItems) ||
    cartItems.length === 0 ||
    typeof totalPrice !== "number" ||
    totalPrice <= 0
  ) {
    return NextResponse.json(
      { success: false, message: "Invalid input data" },
      { status: 400 }
    );
  }

  // Validate email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email credentials are missing.");
    return NextResponse.json(
      { success: false, message: "Internal Server Error: Email configuration issue" },
      { status: 500 }
    );
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Format the cart items for the email
  const itemsList = cartItems
    .map(
      (item) =>
        `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>`
    )
    .join("");

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Thank you for your purchase! 🎉",
    html: generateEmailContent(name, itemsList, totalPrice),
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Nodemailer Error:", error.message);
      return NextResponse.json(
        { success: false, message: `Nodemailer Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}