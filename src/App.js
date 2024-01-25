import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Chatting from "./pages/Chatting";
import Friend from "./pages/Friend";
import NotFound from "./pages/NotFound";
import Posting from "./pages/Posting";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/ListFooter/Footer";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import FriendMatching from "./pages/FriendMatching/FriendMatching";

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/friendmatching" element={<FriendMatching />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
