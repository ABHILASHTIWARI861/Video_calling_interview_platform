import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home_page.jsx';
import DashboardPage from './pages/Dashboard_page.jsx';
import ProblemsPage from './pages/problemsPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
// import SessionPage from './pages/SessionPage.jsx';

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        {/* <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} /> */}
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;