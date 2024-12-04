'use client'

import { newBook } from "@/lib/book";
import Link from "next/link";
import { useState } from "react";

const NewBookForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const result = await newBook(formData);
    setMessage(result.message);
  }

  return (
    <div className='mx-44 flex flex-col my-5'>
      <div className='flex relative h-20 items-center justify-between'>
        <h1 className='absolute w-full text-center -z-10'>Add New Book</h1>
        <Link href="/admin"><button className='button-white'>back to admin</button></Link>
        <Link href="/"><button className='button-white'>back to home</button></Link>
      </div>
      <form
        action={handleSubmit}
        className='flex flex-col space-y-8 items-center mx-40 mt-10 font-old text-2xl text-black-100'
      >
        <div className='w-full'>
          <label htmlFor="title">Title</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="title"
            name="title"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="author">Author</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="author"
            name="author"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="publish">Publish Date</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="publish"
            name="publish"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="pages">Pages/Chapters</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="pages"
            name="pages"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="language">Language</label>
          <input className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="language"
            name="language"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="country">Country</label>
          <input className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="text"
            id="country"
            name="country"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="link">Link</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="url"
            id="link"
            name="link"
            required />
        </div>
        <div className='w-full'>
          <label htmlFor="image">Image</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="file"
            id="image"
            name="image"
            accept="image/*" />
        </div>
        <div className='w-full'>
          <label htmlFor="link">Stock</label>
          <input
            className='outline-none border p-2 font-old italic my-2 w-full text-xl'
            type="number"
            id="stock"
            name="stock" />
        </div>
        <button type="submit" className='button-black'>
          Submit
        </button>
      </form>
      {message && (
        <p className="border mt-4 fixed text-center right-7 bottom-7 bg-green-800 text-white p-8">{message}</p>
      )}
    </div>
  )
}

export default NewBookForm