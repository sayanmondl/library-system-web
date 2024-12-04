import { getSession } from '@/lib/getSession';
import LoginForm from './LoginForm';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return <LoginForm />;
};

export default Page;
