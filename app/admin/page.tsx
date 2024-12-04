import connectDB from '@/lib/db';
import { getSession } from '@/lib/getSession';
import { User } from '@/models/User';
import Link from 'next/link'
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getSession()
  const user = session?.user;

  await connectDB();
  const userData = await User.findOne({ _id: user?.id });
  if (userData.role !== 'admin') {
    redirect('/profile')
  } else {
    return (
      <div className='mx-44'>
        <div className='flex relative h-20 items-center justify-between my-5'>
          <h1 className='absolute w-full text-center -z-10'>Admin Dashboard</h1>
          <Link href="/profile"><button className='button-white'>back to profile</button></Link>
          <Link href="/"><button className='button-white'>back to home</button></Link>
        </div>
        <div className='mx-40 my-20'>
          <Link href="/admin/add_books">
            <div className='border px-20 py-10 text-center group hover:bg-black-100'>
              <h2 className='group-hover:text-white-100 text-2xl font-old'>Add Books</h2>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default page