import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Chatting from "./pages/Chatting";
import NotFound from "./pages/NotFound";
import Posting from "./pages/Posting";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import FriendProfile from "./pages/FriendProfile";
import FriendList from "./pages/FriendList";
import FriendFollower from "./pages/FriendFollower";
import FriendFollowing from "./pages/FriendFollowing";
import FriendMatching from "./pages/FriendMatching";

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/friend" element={<FriendList />} />
          <Route path="/follower" element={<FriendFollower />} />
          <Route path="/following" element={<FriendFollowing />} />
          <Route path="/matching" element={<FriendMatching />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/FriendProfile" element={<FriendProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
