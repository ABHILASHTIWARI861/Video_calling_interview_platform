import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton,useUser } from '@clerk/clerk-react'
import { Routes,Route } from 'react-router';
import Home_page from './pages/Home_page.jsx';
import ProblemsPage from './pages/problemsPage.jsx';
import Dashboard from './pages/Dashboard_page.jsx';
import { Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';

function App() {
  const {isSignedIn}=useUser();
  return (
    <>
    <Routes>
     <Route path="/" element={!isSignedIn?<Home_page />:<Navigate to={'/Dashboard'}/>} />
     <Route path="/Dashboard" element={isSignedIn?<Dashboard />: <Navigate to={'/'}/>} />
     <Route path="/problems" element={<ProblemsPage />} />
    </Routes>
    <Toaster toasterOptions={{duration:3000}}/>
    </>
  )
}

export default App
