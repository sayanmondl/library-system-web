"use server";

import { Issue } from "@/models/Issue";
import connectDB from "./db";
import { User } from "@/models/User";
import { cache } from "react";
import { Book } from "@/models/Book";
import mongoose from "mongoose";

export interface IssueProp {
  bookId: string;
  userEmail: string;
}

export interface ReturnProp {
  bookId: string;
  issueId: any;
  userEmail: string;
}

export async function createIssue(params: IssueProp) {
  await connectDB();

  try {
    const { bookId, userEmail } = params;

    if (!bookId || !userEmail) {
      return { success: false, message: "Invalid input data" };
    }

    const stock = await Book.findOne({ bookId: bookId });
    if (stock.stock === 0) {
      return { success: false, message: "Out of stock" };
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(issueDate.getDate() + 30);

    const newIssue = new Issue({
      bookId,
      userEmail,
      issue: issueDate,
      dueDate,
    });
    const savedIssue = await newIssue.save();

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $push: {
          issues: { $each: [savedIssue._id], $position: 0 },
          currentlyIssued: { $each: [savedIssue._id], $position: 0 },
        },
      },
      { new: true }
    );
    const book = await Book.findOneAndUpdate({ bookId: bookId }, { $inc: { stock: -1 } });

    return { success: true, message: "Book issued successfully" };
  } catch (error) {
    console.error("Error creating issue:", error);
    return { success: false, message: "Could not issue the book" };
  }
}

export async function reIssueBook(issueId: string) {
  await connectDB();
  const issueObjectId = mongoose.Types.ObjectId.createFromHexString(issueId);

  try {
    const issueFound = await User.findOne({ currentlyIssued: { $in: [issueObjectId] } });
    if (!issueFound) {
      return { success: false, message: "Issue not found" };
    }

    const currentDate = new Date();
    const newDueDate = new Date(currentDate);
    newDueDate.setDate(currentDate.getDate() + 30);

    const issue = await Issue.findOneAndUpdate(
      { _id: issueId },
      { dueDate: newDueDate },
      { new: true }
    );

    return {
      success: true,
      message: `Your due-date has been updated to ${newDueDate.toLocaleDateString()}`,
    };
  } catch (error) {
    console.error("Could not re-issue book due to:", error);
    return { success: false, message: "Could not re-issue the book" };
  }
}

export async function returnBook(params: ReturnProp) {
  await connectDB();
  const { bookId, issueId, userEmail } = params;
  const issueObjectId = mongoose.Types.ObjectId.createFromHexString(issueId);

  try {
    const issueFound = await User.findOne({ currentlyIssued: { $in: [issueObjectId] } });
    if (!issueFound) {
      return { success: false, message: "Issue not found" };
    }

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { currentlyIssued: issueObjectId } },
      { new: true }
    );

    const returnDate = new Date();
    const issue = await Issue.findOneAndUpdate(
      { _id: issueId },
      { return: returnDate, dueDate: null },
      { new: true }
    );
    const book = await Book.findOneAndUpdate({ bookId: bookId }, { $inc: { stock: 1 } });

    if (!issue) {
      return { success: false, message: "Issue not found" };
    }

    return { success: true, message: "Book returned succesfully" };
  } catch (error) {
    console.error("Could not return book due to:", error);
    return { success: false, message: "Could not return the book" };
  }
}

export const getIssueData = cache(async (issueId: any) => {
  await connectDB();

  try {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      console.warn(`Issue with ID ${issueId} not found.`);
      return null;
    }

    const issueDTO = {
      bookId: issue.bookId,
      issueDate: issue.issue,
      issueTime: issue.issue.getTime(),
      dueDate: issue.dueDate,
      returnDate: issue.return,
    };

    return issueDTO;
  } catch (error) {
    console.error("Failed to issue data:", error);
  }
});
