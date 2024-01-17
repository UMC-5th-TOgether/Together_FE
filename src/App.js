import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Chatting from "./pages/Chatting";
import NotFound from "./pages/NotFound";
import Posting from "./pages/Posting";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import FriendProfile from "./pages/FriendProfile";
import FriendList from "./pages/FriendList";

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
          <Route path="/posting" element={<Posting />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/FriendProfile" element={<FriendProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
