// Router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// Components
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import ChemicalReport from './pages/chemicalReport'

// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import CleaningThingReport from './pages/cleaningThingReport'

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBBSHZhminlNQHXqTL6LgSt1MMDF3rwd8o',
    authDomain: 'stock-management-4a83b.firebaseapp.com',
    databaseURL: 'https://stock-management-4a83b-default-rtdb.firebaseio.com',
    projectId: 'stock-management-4a83b',
    storageBucket: 'stock-management-4a83b.firebasestorage.app',
    messagingSenderId: '132248718535',
    appId: '1:132248718535:web:a8c116c9f15146cdf642e2',
    measurementId: 'G-D2MMN26Q9T',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  getAuth(app)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chemicalReport" element={<ChemicalReport />} />
        <Route path="/cleaningThingReport" element={<CleaningThingReport />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
