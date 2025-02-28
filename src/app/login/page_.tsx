'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError('Login gagal. Periksa email dan password.');
      return;
    }

    router.push('/dashboard'); // Redirect setelah login
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-xl font-bold text-center mb-4'>Login</h2>
      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          className='border p-2 rounded'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-2 rounded'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Login
        </button>
      </form>
    </div>
  );
}
