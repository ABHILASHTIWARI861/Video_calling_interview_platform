import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton } from '@clerk/clerk-react'


function App() {
  return (
    <>
    <h1>Hello, welcome to the Video Calling Interview Platform!</h1>
      <header>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <SignOutButton />
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App
