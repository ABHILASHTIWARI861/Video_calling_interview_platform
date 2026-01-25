import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton,useUser } from '@clerk/clerk-react'
import { Routes,Route } from 'react-router';
import Home_page from './pages/Home_page.jsx';
import Problem_page from './pages/problem_page.jsx';
import { Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';

function App() {
  const {isSignedIn}=useUser();
  return (
    <>
    <Routes>
     <Route path="/" element={<Home_page />} />
     <Route path="/problem" element={isSignedIn?<Problem_page />: <Navigate to={'/'}/>} />
    </Routes>
    <Toaster toasterOptions={{duration:3000}}/>
    </>
  )
}

export default App
