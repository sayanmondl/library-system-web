"use server";

import { signIn } from "@/auth";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { User } from "@/models/User";
import { generateOTPEmail } from "@/utils/generateEmail";
import { generateOTP } from "@/utils/OTPUtils";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return { success: false, message: "Invalid email or password" };
    }
    return { success: true, message: "Successfully Logged In" };
  } catch (error) {
    return { success: false, message: "Invalid email or password" };
  }
}

const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const otpRequestStore = new Map<string, number>();

async function sendEmail(email: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

export async function sendOTP(formData: FormData) {
  await connectDB();
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  const lastRequestTime = otpRequestStore.get(email) || 0;
  const currentTime = Date.now();
  if (currentTime - lastRequestTime < 60000) {
    return {
      success: false,
      message: "Please wait before requesting another OTP",
    };
  }
  otpRequestStore.set(email, currentTime);

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000;
  otpStore.set(email, { otp, expiresAt });

  const emailContent = generateOTPEmail(otp);

  try {
    await sendEmail(email, "Your Verification Code", emailContent);
    return { success: true, message: "OTP has been sent to your email" };
  } catch (error) {
    console.error("Error in sendOTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}

export async function verifyOTP(formData: FormData) {
  await connectDB();
  const email = formData.get("email") as string;
  const userOTP = formData.get("otp") as string;

  if (!email || !userOTP) {
    return { success: false, message: "Email and OTP are required" };
  }

  const storedOTPData = otpStore.get(email);

  if (!storedOTPData) {
    return { success: false, message: "No OTP found for this email" };
  }

  if (Date.now() > storedOTPData.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP has expired" };
  }

  if (userOTP === storedOTPData.otp) {
    otpStore.delete(email);
    return { success: true, message: "Email verified successfully" };
  } else {
    return { success: false, message: "Invalid OTP" };
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordRepeat = formData.get("password_repeat") as string;

  if (password !== passwordRepeat) {
    return { success: false, message: "Passwords did not match" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    return { success: true, message: "Successfully changed the password" };
  } catch (error) {
    console.error("Error while creating new Password:", error);
    return { success: false, message: "Failed to create new Password" };
  }
}

export async function changeEmail(formData: FormData) {
  await connectDB();
  const oldEmail = formData.get("old-email") as string;
  const newEmail = formData.get("new-email") as string;

  try {
    const session = await getSession();
    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to change your email.",
      };
    }

    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return { success: false, message: "This email is already in use." };
    }

    await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail });
    session.user.email = newEmail;
    revalidatePath("/profile");
    return { success: true, message: "Email changed successfully" };
  } catch (error) {
    console.error("Email update error: ", error);
    return {
      success: false,
      message: "An error occurred while updating the email.",
    };
  }
}

export async function changeName(formData: FormData) {
  await connectDB();
  const newName = formData.get("new-name") as string;
  try {
    const session = await getSession();
    const user = session?.user;
    const userEmail = user?.email as string;

    await User.findOneAndUpdate({ email: userEmail }, { name: newName });
    return { success: true, message: "Name changed successfully" };
  } catch (error) {
    console.error("E-mail update error: ", error);
    return { success: false, message: "An error occured updating your Name" };
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "Please fill all fields!" };
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toString(),
      issues: [],
      currentlyIssued: [],
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An error occurred during registration" };
  }
}
