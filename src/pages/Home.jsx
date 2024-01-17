import React from "react";
import "../index.css";
import Footer from "../components/ListFooter/Footer";
import Review from "../components/ListReview/Review";

export default function Home() {
  return (
    <div className="home-container">
      Home
      <Review />
      <Footer />
    </div>
  );
}
