import React from "react";
import Reviews from "./Reviews";
import Tools from "./Tools";
import Map from "./Map";
import Contact from "./Contact";
import contactBackground from "../../assets/images/contact-background-.png";

const ContactBackground = {
  background: `url(${contactBackground})`,
  minHeight: "90vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "auto",
};

const Home = () => {
  return (
    <div>
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
