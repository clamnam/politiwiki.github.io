import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.tsx';
import Login from './components/login.tsx';

import Page from './components/page/Page.tsx';
// import Content from './components/content/Content.tsx';

import ContentConfirmQueue from './components/content/CRUD/ContentConfirmQueue.tsx';
// import ContentConfirmScreen from './components/content/CRUD/ContentConfirmScreen.tsx';


import PageWrapper from './components/page/PageWrapper.tsx';
import ContentWrapper from './components/content/ContentWrapper.tsx';

import Navbar from './components/navbar.tsx';
import PageCreate from './components/page/CRUD/PageCreate.tsx';
// import PageEdit from './components/page/CRUD/PageEdit.tsx';

import ContentCreate from './components/content/CRUD/ContentCreate.tsx';
import Register from './components/register.tsx';
import ContentEdit from './components/content/CRUD/ContentEdit.tsx';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/profile/profile.tsx';

export default function App() {
  return (

    <AuthProvider>
        <Router>
          <Navbar />
          <div className=' flex bg-background text-foreground justify-center min-h-screen min-w-screen  pt-20'>

          <div className=' md:w-3/4 w-7/8 top-0 show-navflex  '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pages" element={<Page />} />
            <Route path="/page/:id/review/" element={<ContentConfirmQueue />} />

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
              <Route path="/content/edit/:id" element={<ContentEdit />}></Route>

              {/* <Route path="/content/confirm" element={<ContentConfirmScreen/>}></Route> */}

              {/* <Route path="/content/edit"element={<ContentEdit/>}></Route> */}
            </Route>
            <Route path="/profile" element={<Profile />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          </div>

          </div>
        </Router>
    </AuthProvider>

  );
};

