import React from "react";
import BannerImg from "../assets/Friend - Follower.png";
import Follower from "../components/FriendFollower/Follower";

export default function FriendFollower() {
  return (
    <div>
      <header>
        <img
          src={BannerImg}
          alt="Banner"
          style={{ width: "100%", height: "400px" }}
        />
      </header>
      <Follower />
    </div>
  );
}
