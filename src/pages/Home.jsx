import React from "react";
import "../index.css";
import Footer from "../components/ListFooter/Footer";
import Review from "../components/ListReview/Review";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="home-container">
      Home
      <Banner />
      <Review />
      <Footer />
    </div>
  );
};

export default Home;
