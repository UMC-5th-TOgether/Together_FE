import React from "react";
import Friend from "../components/FriendList/Friend";
import BannerImage from "../assets/Friend List.png";

const FriendList = () => {
  return (
    <div>
      <header>
        <img
          src={BannerImage}
          alt="Banner"
          style={{ width: "100%" }}
        />
      </header>
      <Friend />
    </div>
  );
};

export default FriendList;
