import { Toaster } from 'sonner'
import './App.css';
import JobsSearch from './JobsSearch';

import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedCompanies from './SavedCompanies';
import ParticlesBack from './ParticlesBack';

function App() {
  return (
    <>
      <ParticlesBack />
      <Navbar></Navbar>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JobsSearch />} />
          <Route path='/saved' element={<SavedCompanies />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;   
