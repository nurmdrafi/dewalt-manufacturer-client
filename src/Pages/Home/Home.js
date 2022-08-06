import React, { Suspense } from "react";
import Banner from "./Banner";
import Footer from "../../Pages/Shared/Footer";
const Tools = React.lazy(() => import("./Tools"));
const Contact = React.lazy(() => import("./Contact"));
const Reviews = React.lazy(() => import("./Reviews"));
const BusinessSummary = React.lazy(() => import("./BusinessSummary"));
const Blogs = React.lazy(() => import("./Blogs"));
const CreateAccount = React.lazy(() => import("./CreateAccount"));
/* 

// const OtherComponent = React.lazy(() => import('./OtherComponent'));
/* 
<Suspense fallback={<></>}>
        
      </Suspense>
*/

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<></>}>
        <Tools />
      </Suspense>
      <Suspense fallback={<></>}>
        <Reviews />
      </Suspense>
      <Suspense fallback={<></>}>
        <Blogs />
      </Suspense>
      <Suspense fallback={<></>}>
        <BusinessSummary />
      </Suspense>
      <Suspense fallback={<></>}>
        <CreateAccount />
      </Suspense>
      <Suspense fallback={<></>}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
