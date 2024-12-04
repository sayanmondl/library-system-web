'use client'

import Link from 'next/link';
import { register } from '@/action/user';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/app/components/Toast';

const SignUpForm = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await register(formData);
        if (result.success) {
          setToastMessage(result.message);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setToastMessage(result.message);
        }
      } catch (error) {
        setToastMessage("An unexpected error occurred during registration");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <p className='font-old italic text-center mb-4'>create a new library account</p>
        <div className='border p-4'>
          <label htmlFor="name" className='text-center block'>name</label>
          <input
            id="name"
            className='outline-none border p-2 font-old italic my-2 w-full'
            type='text'
            name='name'
            required
            aria-required="true"
          />

          <label htmlFor="email" className='text-center block mt-4'>e-mail</label>
          <input
            id="email"
            className='outline-none border p-2 font-old italic my-2 w-full'
            type='email'
            name='email'
            required
            aria-required="true"
          />

          <label htmlFor="password" className='text-center block mt-4'>password</label>
          <input
            id="password"
            className='outline-none border p-2 font-old italic my-2 w-full'
            type='password'
            name='password'
            required
            aria-required="true"
          />
        </div>

        <div className='flex justify-between mt-10'>
          <Link href={`/login`}>
            <button type='button' className='button-white'>
              login
            </button>
          </Link>
          <button type='submit' className='button-black2' disabled={isPending}>
            {isPending ? 'Signing up...' : 'sign up'}
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
};

export default SignUpForm;