import React from "react";
import Reviews from "./Reviews";
import Tools from "./Tools";
import Map from "./Map";
import Contact from "./Contact";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Tools />
      <Reviews />
      <Map />
      <section>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
