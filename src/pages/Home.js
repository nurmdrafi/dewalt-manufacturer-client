import React, { Suspense } from "react";
import Banner from "../components/Home/Banner";
import Footer from "../components/Shared/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop";
const Tools = React.lazy(() => import("../components/Home/Tools"));
const Contact = React.lazy(() => import("../components/Home/Contact"));
const Reviews = React.lazy(() => import("../components/Home/Reviews"));
const BusinessSummary = React.lazy(() =>
  import("../components/Home/BusinessSummary")
);
const Blogs = React.lazy(() => import("../components/Home/Blogs"));
const CreateAccount = React.lazy(() =>
  import("../components/Home/CreateAccount")
);
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
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
