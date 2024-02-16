import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/LoginStore';
import Category from './pages/Category';
import Chatting from './pages/Chatting';
import Friend from './pages/Friend';
import NotFound from './pages/NotFound';
import Posting from './pages/Posting';
import Home from './pages/Home';
import Header from './components/Header';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Notification from './pages/Notification';
import PostUser from './pages/PostUser';
import SignUp from './pages/SignUp';
import MatchingSend from './pages/MatchingSend';
import SignUpAuthentication from './pages/SignUpAuthentication';
import SignUpAuthenticationCheck from './pages/SignUpAuthenticationCheck';
import FindEmail from './pages/FindEmail';
import FindPassword from './pages/FindPassword';
import Review from './pages/Review';
import Footer from './components/ListFooter/Footer';

function App() {
  return (
    <div className="root-wrap">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/category" element= {<Category/>} />
        <Route path="/chatting" element= {<Chatting/>} />
        <Route path="/friend" element= {<Friend/>} />
        <Route path="/follower" element={<FriendFollower />} />
          <Route path="/following" element={<FriendFollowing />} />
          <Route path="/matching" element={<FriendMatching />} />
          <Route path="/FriendProfile" element={<FriendProfile />} />
        <Route path="/posting" element= {<Posting/>} />
        <Route path="/mypage" element= {<MyPage/>} />
        <Route path="/notification" element= {<Notification/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/*" element= {<NotFound/>} />
      </Routes>
      <Footer />

    </BrowserRouter>
    </div>
  );
}

export default App;
