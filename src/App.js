import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import Home from './pages/home.js';



// import components
import Navbar from './components/navbar.js';


const App = () => {
  return (

    <div className='container-fluid mx-auto bg-stone-900'>
    <Router>
      <div className=''>
      <Navbar/>

      <div className='min-h-screen'>
        <Routes>
          <Route path="/" element={<Home/>} />

      </Routes>
      </div>
      </div>
    </Router>
    
    </div>

  );
}

export default App;