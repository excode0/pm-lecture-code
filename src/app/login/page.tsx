'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);
    if (res?.error) {
      setError('Login failed. Check email and password.');
      return;
    }

    router.push('/'); // Redirect after login
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#002147] p-6'>
      <div className='w-full max-w-lg bg-white p-10 rounded-lg shadow-2xl border-t-4 border-[#fcba03]'>
        <div className='flex justify-center mb-6'>
          <img
            src='/img/Logo_Universitas_Adzkia.png'
            alt='your company'
            className='h-24'
          />
        </div>

        <h2 className='text-2xl font-bold text-[#002147] text-center'>
          Universitas Adzkia
        </h2>
        <p className='text-center text-gray-600 mb-4'>Log in to continue</p>

        {error && (
          <p className='text-red-600 bg-red-100 p-2 rounded mt-2'>{error}</p>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Masukkan email'
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
              placeholder='Masukkan password'
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
            {loading ? <FaSpinner className='animate-spin mr-2' /> : 'Login'}
          </button>
        </form>

        <p className='mt-4 text-center text-gray-600'>
          Don't have an account yet?{' '}
          <a href='/signup' className='text-[#fcba03] hover:underline'>
            Register here
          </a>
        </p>
      </div>

      {/* <LanguageSwitcher /> */}
    </div>
  );
}
