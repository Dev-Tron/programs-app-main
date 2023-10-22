"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'



export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
      e.preventDefault()

      console.log(handleSubmit)
  
      // Reset error messages
      setEmailError('')
      setPasswordError('')
      setRepeatPasswordError('')
  
      // Perform form validation
      let isValid = true;
  
      if (!email) {
        setEmailError("Can't be empty")
        isValid = false
      }
  
      if (!password) {
        setPasswordError("Can't be empty")
        isValid = false
      }
  
      if (!repeatPassword) {
        setRepeatPasswordError("Can't be empty")
        isValid = false
      }
  
      if (password !== repeatPassword) {
        setPasswordError("Passwords don't match")
        setRepeatPasswordError("Passwords don't match")
        isValid = false
      }
  
      if (isValid) {
        // Prepare the form data as an object
        const formData = {
          email: email,
          password: password,
          repeatpassword: repeatPassword,
        }
  
        // Make a POST request to the API route
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
  
          if (response.ok) {
            // Registration was successful
            // You can handle the success case here, e.g., redirect the user
            router.push('/') // Redirect to the home route
          } else {
            // Registration failed
            const data = await response.json()
            if (data.error) {
              // Handle the error, e.g., display an error message
              console.error(data.error)
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

  return <div>
    <div className='container flex flex-col items-center'>
        <div className='mt-12 md:mt-20 lg:mt-48'>
            <Image className='md:w-8 md:h-6' src='/images/logo.svg' alt='logo-icon' width={25} height={20}/>
        </div>
        <div className='bg-light-blue mt-12 w-11/12 lg:w-4/12 p-5 lg:mt-20 md:p-9 md:w-3/5 rounded-3xl'>
            <h1 className='text-2.5xl'>
                Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex relative">
                    <input onChange={e => setEmail(e.target.value)}  
                        name="email"   
                        className='mt-8 bg-transparent w-9/12 md:text-2xl border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red pl-3' 
                        type='text' 
                        placeholder='Email address'>
                    </input>
                    {emailError && <span className='absolute top-8 left-44 text-dark-red'>{emailError}</span>}
                </div>
                <div className="flex relative">
                    <input
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        className='mt-8 bg-transparent w-9/12 md:text-2xl border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red pl-3'
                        type='text'
                        placeholder='Password'>
                    </input>
                    {passwordError && <span className='absolute top-8 left-44 text-dark-red'>{passwordError}</span>}
                </div>
                <div className="flex relative">
                    <input
                        onChange={e => setRepeatPassword(e.target.value)}
                        name="repeatPassword"
                        className='mt-8 bg-transparent w-9/12 md:text-2xl border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red pl-3' 
                        type='text' 
                        placeholder='Repeat Password'>
                    </input>
                    {repeatPasswordError && <span className='absolute top-8 left-44 text-dark-red'>{repeatPasswordError}</span>}
                </div>
                <button type='submit' name='button' title='button' className='mt-8 bg-dark-red w-full p-3 rounded-md'>Create an account</button>
                <p className='mt-6 text-center'>
                    Already have an account?
                    <Link className='ml-2 text-dark-red' href='/'>Log in</Link>
                </p>
            </form>
        </div>
    </div>
</div>
}