import { Toaster } from 'sonner'
import './App.css';
import JobsSearch from './JobsSearch';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedCompanies from './SavedCompanies';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Toaster position="top-center" richColors />
      {/* <JobsSearch /> */}
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
