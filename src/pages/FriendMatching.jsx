import React from "react";
import BannerImg from "../assets/Friend - Matching.png";
import Matching from "../components/FriendMatching/Matching";

export default function FriendMatching() {
  return (
    <div>
      <header>
        <img
          src={BannerImg}
          alt="Banner"
          style={{ width: "100%" }}
        />
      </header>
      <Matching />
    </div>
  );
}
