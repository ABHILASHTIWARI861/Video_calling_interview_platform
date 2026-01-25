import React from 'react'
import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton } from '@clerk/clerk-react'
import { toast } from 'react-hot-toast';
const Home_page = () => {
  return (
    <div>
        <button className='btn btn-secondary' onClick={()=>{
            toast.error("This is a nice sucessful toast!");
        }}>Click me</button>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='model' >
        <button>Login</button>
        </SignInButton>
      </SignedOut>
        <UserButton />
    </div>
  )
}

export default Home_page
