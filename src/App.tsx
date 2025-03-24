import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.tsx';
import Login from './components/login.tsx';

import Page from './components/page/Page.tsx';
// import Content from './components/content/Content.tsx';

import PageWrapper from './components/page/PageWrapper.tsx';
import ContentWrapper from './components/content/ContentWrapper.tsx';

import Navbar from './components/navbar.tsx';
import PageCreate from './components/page/CRUD/PageCreate.tsx';
// import PageEdit from './components/page/CRUD/PageEdit.tsx';

import ContentCreate from './components/content/CRUD/ContentCreate.tsx';
import Register from './components/register.tsx';
// import ContentEdit from './components/content/CRUD/ContentEdit.tsx';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className=' bg-zinc-950  min-h-screen min-w-screen  py-10'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pages" element={<Page />} />

            <Route path="/page" element={<PageWrapper />}>
              <Route path=":id" element={<Page />} />
              <Route path="/page/create" element={<PageCreate />}></Route>
              {/* <Route path="/page/edit"element={<PageEdit/>}></Route> */}
            </Route>
            <Route path="/content" element={<ContentWrapper />}>
              <Route index element={<ContentCreate />} />
              {/* <Route path=":id" element={<ContentEdit/> }/>  */}
              {/* <Route index element={<Content />} /> */}
              {/* <Route path=":id" element={<Content />} />  */}
              <Route path="/content/create" element={<ContentCreate />}></Route>
              {/* <Route path="/content/edit"element={<ContentEdit/>}></Route> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

