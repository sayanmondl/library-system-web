"use server";

import { cache } from "react";
import connectDB from "./db";
import { User } from "@/models/User";

export const getUserData = cache(async (userId: string) => {
  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return;
    }

    const userDTO = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return userDTO;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
});

export const getUserIssues = cache(async (userId: string) => {
  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return;
    }

    const issues = user.issues;

    return issues;
  } catch (error) {
    console.error("Failed to fetch issues:", error);
  }
});

export const getUserCurrentIssues = cache(async (userId: string) => {
  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return;
    }

    const issues = user.currentlyIssued;

    return issues;
  } catch (error) {
    console.error("Failed to fetch issues:", error);
  }
});
