'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const page = () => {
  return (
    <div>
      DASHBOARD
      <button
        onClick={() => signOut({ callbackUrl: '/' })} // Redirect ke halaman utama setelah logout
        className='bg-red-500 text-white px-4 py-2 rounded'
      >
        Logout
      </button>
    </div>
  );
};

export default page;
