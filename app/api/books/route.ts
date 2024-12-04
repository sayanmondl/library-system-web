import { NextResponse } from 'next/server';
import { Book } from '@/models/Book';
import connectDB from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 4;

  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const books = await Book.find({})
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBooks = await Book.countDocuments();
    const hasMore = totalBooks > skip + books.length;

    return NextResponse.json({
      books,
      hasMore,
      nextPage: hasMore ? page + 1 : null
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}