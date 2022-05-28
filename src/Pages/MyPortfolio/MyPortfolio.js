import React from "react";
import Footer from "../../Pages/Shared/Footer";

const MyPortfolio = () => {
  return (
    <div className="flex flex-col justify-between h-[90vh]">
      <div className="max-w-7xl px-5 mx-auto">
        <div className="my-16">
          <div className="flex md:flex-row flex-col my-2">
            <span className="font-bold text-xl w-64">Name:</span>
            <span className="text-xl">Nur Mohamod Rafi</span>
          </div>

          <div className="flex md:flex-row flex-col my-2">
            <span className="font-bold text-xl w-64">Email:</span>
            <span className="text-xl">nurmdrafi2014@gmail.com</span>
          </div>

          <div className="flex md:flex-row flex-col my-2">
            <span className="font-bold text-xl whitespace-nowrap w-64 pr-6">
              Educational Background:
            </span>
            <p className="text-xl">
              I earned my Professional BBA degree in Finance from Mohammadpur
              Central University in 2020. Always I have strong interest about
              learning technology, due to pandemic I have got a new chance to
              invest my idle time for learning programming. Now I can proudly
              say that I am a junior MERN Stack developer.
            </p>
          </div>
          <div>
            <h2 className="text-center font-bold text-xl my-8">
              List of Technologies
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg"
                className="w-16"
                alt="html"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg"
                className="w-16"
                alt="css"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                className="w-16"
                alt="bootstrap"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
                className="w-16"
                alt="tailwind"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg"
                className="w-16"
                alt="git"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                className="w-16"
                alt="github"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                className="w-16"
                alt="javascript"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"
                className="w-16"
                alt="react"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
                className="w-16"
                alt="nodejs"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
                className="w-16"
                alt="mongodb"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                className="w-16"
                alt="express"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
                className="w-16"
                alt="firebase"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original-wordmark.svg"
                className="w-16"
                alt="heroku"
              />
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col my-2">
          <span className="font-bold text-xl w-64">Projects:</span>
          <div>
            <ul>
              <li className="text-xl">
                1. Ebike Warehouse Management System {"  "}
                <a
                  className="link link-hover text-blue-600 font-semibold"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ebike-warehouse.web.app/"
                >
                  https://ebike-warehouse.web.app/
                </a>
              </li>
              <li className="text-xl">
                2. Product Analysis Website {"  "}
                <a
                  className="link link-hover text-blue-600 font-semibold"
                  target="_blank"
                  rel="noreferrer"
                  href="https://product-analysis-nurmdrafi.netlify.app/"
                >
                  https://product-analysis-nurmdrafi.netlify.app/
                </a>
              </li>
              <li className="text-xl">
                3. Travel Agency {"  "}
                <a
                  className="link link-hover text-blue-600 font-semibold"
                  target="_blank"
                  rel="noreferrer"
                  href="https://nurmdrafi.github.io/travel-agency/"
                >
                  https://nurmdrafi.github.io/travel-agency/
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyPortfolio;
