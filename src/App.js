import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import Page from './components/page/Page.js';
import PageWrapper from './components/page/PageWrapper.js';
import Navbar from './components/navbar.js';
import PageCreate from './components/page/CRUD/PageCreate.js';

const App = () => {
  return (
    <div className='container-fluid mx-auto bg-stone-900 py-10'>
      <Router>
        {/* <div className="flex"> */}
          {/* <div className="w-1/16 bg-gray-400 text-white p-4">
            <p>Sidebar</p>
          </div> */}
          <div className="">
            <Navbar />
            <div className='min-h-screen'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page" element={<PageWrapper />}>
                  <Route index element={<Page />} />
                  <Route path=":id" element={<Page />} />
                  <Route path="/page/create"element={<PageCreate/>}></Route>                    
                  {/* <Route path="/page/edit"element={<PageEdit/>}></Route>                     */}

                </Route>
              </Routes>
            </div>
          </div>
        {/* </div> */}
      </Router>
    </div>
  );
};

export default App;