import connectDB from '@/lib/db'
import { getSession } from '@/lib/getSession'
import { User } from '@/models/User'
import { redirect } from 'next/navigation'
import NewBookForm from './NewBookForm'

const Page = async () => {

  const session = await getSession();
  const user = session?.user;

  await connectDB();
  const userData = await User.findOne({ _id: user?.id });
  if (userData.role !== 'admin') {
    redirect('/profile');

  } else {
    return <NewBookForm />
  }
}

export default Page