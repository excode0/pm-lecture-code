'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setError(error);
      return;
    }

    router.push('/login');
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-xl font-bold text-center mb-4'>Daftar Akun</h2>
      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Nama'
          className='border p-2 rounded'
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          Daftar
        </button>
      </form>
    </div>
  );
}
