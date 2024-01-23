import React from "react";
import "../index.css";
import Footer from "../components/ListFooter/Footer";
import Review from "../components/ListReview/Review";
import Banner from "../components/Banner";
import HomeCategory from "../components/HomeCategory";

const Home = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <HomeCategory />
      <Review />
      <Footer />
    </div>
  );
};

export default Home;
