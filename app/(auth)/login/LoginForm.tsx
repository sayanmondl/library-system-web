'use client'

import { login } from '@/action/user';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/app/components/Toast';

export default function LoginForm() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await login(formData);
        if (result.success) {
          setToastMessage(result.message);
          router.push('/');
        } else {
          setToastMessage(result.message);
        }
      } catch (error) {
        setToastMessage("An unexpected error occurred during login");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='border p-4'>
          <label htmlFor="email" className='text-center block'>email</label>
          <input
            id="email"
            className='outline-none border p-2 font-old italic my-2 w-full'
            type='email'
            name='email'
            required
            aria-required="true"
          />

          <label htmlFor="password" className='text-center mt-4 block'>password</label>
          <input
            id="password"
            className='outline-none border p-2 font-old italic my-2 w-full'
            type='password'
            name='password'
            required
            aria-required="true"
          />

          <Link href={`/profile/reset_password`}>
            <p className='text-center font-old italic mt-8'>forgot password?</p>
          </Link>
        </div>

        <div className='flex justify-between mt-10'>
          <Link href={`/signup`}>
            <button className='button-white' type='button'>
              sign up
            </button>
          </Link>
          <button type='submit' className='button-black2' disabled={isPending}>
            {isPending ? 'logging in...' : 'log in'}
          </button>
        </div>
      </form>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}