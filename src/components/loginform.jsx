"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      // Make a POST request to the /api/login route
      const response = await fetch('/http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // User is successfully logged in
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        if (result.error) {
          setError('Login failed. Please check your credentials.');
        } else {
          router.push('/home');
        }
      } else {
        // Handle login failure
        setError(data.error || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      setError('Internal server error');
    }
  };

  return (
    <main>
      <div className='container flex flex-col items-center'>
        <div className='mt-12 md:mt-20 lg:mt-48'>
          <Image className='md:w-8 md:h-6' src='/images/logo.svg' alt='logo-icon' width={25} height={20} />
        </div>
        <div className='bg-light-blue mt-12 w-11/12 lg:w-4/12 p-5 lg:mt-20 md:p-9 md:w-3/5 rounded-3xl'>
          <h1 className='text-2.5xl'>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              className='mt-8 bg-transparent w-9/12 md:text-2xl border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red pl-3'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='mt-8 bg-transparent w-9/12 md:text-2xl border-b-2 outline-0 focus-border-light-grey pb-3 w-full caret-dark-red pl-3'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button type='submit' className='mt-8 bg-dark-red w-full p-3 rounded-md'>Login to your account</button>
            <p className='mt-6 text-center'>
              Don't have an account?{' '}
              <Link className='ml-2 text-dark-red' href='/sign-up'>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
