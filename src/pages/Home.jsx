import React from "react";
import "../index.css";
import Review from "../components/ListReview/Review";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="home-container">
      Home
      <Banner />
      <Review />
    </div>
  );
};

export default Home;
