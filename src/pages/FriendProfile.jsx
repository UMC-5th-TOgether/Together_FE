import React from "react";
import Nickname from "../components/FriendProfile/Nickname";
import ReviewTable from "../components/FriendProfile/ReviewTable";
import "../style/FriendProfileStyle.css";
import BannerImage from "../assets/Profile.png";

const FriendProfile = () => {
  return (
    <div className="friend-profile-page">
      <header>
        <img
          src={BannerImage}
          alt="Banner"
          style={{ width: "100%", height: "400px" }}
        />
      </header>
      <Nickname />
      <ReviewTable />
    </div>
  );
};

export default FriendProfile;
