import { Toaster } from 'sonner'
import './App.css';
import JobsSearch from './JobsSearch';
// import Navbar from './Navbar';


function App() {
  return (
    <>
    {/* <Navbar></Navbar> */}
     <Toaster position="top-center" richColors   />
      <JobsSearch />
      
    </>
  );
}

export default App;   
