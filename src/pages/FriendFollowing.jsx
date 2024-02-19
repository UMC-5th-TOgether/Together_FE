import React from "react";
import Following from "../components/FriendFollowing/Following";
import BannerImg from "../assets/Friend - Following.png";

export default function FriendFollowing() {
  return (
    <div>
      <header>
        <img
          src={BannerImg}
          alt="Banner"
          style={{ width: "100%" }}
        />
      </header>
      <Following />
    </div>
  );
}
