import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import Page from './components/page/Page.js';
// import Content from './components/content/Content.js';

import PageWrapper from './components/page/PageWrapper.js';
import ContentWrapper from './components/content/ContentWrapper.js';

import Navbar from './components/navbar.js';
import PageCreate from './components/page/CRUD/PageCreate.js';
import ContentCreate from './components/content/CRUD/ContentCreate.js';
import ContentEdit from './components/content/CRUD/ContentEdit.js';

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
                <Route path="/content" element={<ContentWrapper />}>
                <Route index element={<ContentCreate />}/>
                <Route path=":id" element={<ContentEdit/> }/>
                  {/* <Route index element={<Content />} />
                  <Route path=":id" element={<Content />} /> */}
                  {/* <Route path="/content/create"element={<ContentCreate/>}></Route>                     */}
                  {/* <Route path="/content/edit"element={<ContentEdit/>}></Route>                     */}

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