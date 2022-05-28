import React from "react";
import Reviews from "./Reviews";
import Tools from "./Tools";
import Map from "./Map";
import Contact from "./Contact";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";

const Home = () => {
  return (
    <div>
      <Banner />
      <Tools />
      <Reviews />
      <BusinessSummary/>
      <Map />
      <Contact />
    </div>
  );
};

export default Home;
