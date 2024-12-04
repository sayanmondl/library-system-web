import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Issue } from "@/models/Issue";
import { getSession } from "@/lib/getSession";

export async function DELETE(request: Request) {
  const session = await getSession();
  const user = session?.user;

  const userId = user?.id as string;
  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    if (user.currentlyIssued.length !== 0) {
      return NextResponse.json({
        success: false,
        message: "Return all books before deleting account",
      });
    }

    await User.deleteOne({ _id: userId });
    await Issue.deleteMany({ userEmail: user.email });
    return NextResponse.json({
      success: true,
      message: "Account deleted successfully, redirecting...",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting your account. Please try again later.",
      },
      { status: 500 },
    );
  }
}
