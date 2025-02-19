import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import DefaultPages from './pages/default_pages.js';
import Navbar from './components/navbar.js';

const App = () => {
  return (
    <div className='container-fluid mx-auto bg-stone-900'>
      <Router>
        <Navbar />
        <div className='min-h-screen'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/page" element={<DefaultPages/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;