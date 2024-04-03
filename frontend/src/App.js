import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/functions/Login';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import PostForm from './components/PostForm';
import EditPost from './components/EditPost';
import Detail from './components/Detail';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home user={user} />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/about' element={<About user={user} />}></Route>
        <Route exact path='/contact' element={<Contact user={user} />}></Route>
        <Route exact path='/profile' element={<Profile user={user} />}></Route>
        <Route exact path='/create' element={<PostForm />}></Route>
        <Route exact path={`/post/:postId`} element={<Detail user={user} />}></Route>
        <Route exact path={`/post/:postId/edit`} element={<EditPost />}></Route>
      </Routes>
    </>
  )
}

export default App;
