'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (!res.ok) {
      const { error } = await res.json();
      setError(error);
      return;
    }

    router.push('/login');
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#002147] p-6'>
      <div className='w-full max-w-lg bg-white p-10 rounded-lg shadow-2xl border-t-4 border-[#fcba03]'>
        <div className='flex justify-center mb-6'>
          <img
            src='/img/Logo_Universitas_Adzkia.png'
            alt='Universitas Adzkia Logo'
            className='h-24'
          />
        </div>

        <h2 className='text-2xl font-bold text-[#002147] text-center'>
          Universitas Adzkia
        </h2>
        <p className='text-center text-gray-600 mb-4'>
          Register now for exclusive access
        </p>

        {error && (
          <p className='text-red-600 bg-red-100 p-2 rounded mt-2'>{error}</p>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter full name'
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcba03]'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcba03]'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter new password'
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcba03]'
            />
          </div>

          <button
            type='submit'
            className='w-full flex items-center justify-center bg-[#b22222] text-white font-bold py-3 rounded-lg hover:bg-[#a01c1c] transition-all'
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className='animate-spin mr-2' />
            ) : (
              'Register Now'
            )}
          </button>
        </form>

        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{' '}
          <a href='/login' className='text-[#fcba03] hover:underline'>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
