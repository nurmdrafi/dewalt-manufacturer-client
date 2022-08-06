import React from "react";
import Footer from "../Shared/Footer";

const Blogs = () => {
  const items = [1, 2, 3, 4, 5, 6];
  return (
    <section>
      <div className="mx-auto max-w-7xl p-10">
        <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div className="min-w-sm animate-pulse rounded-lg bg-base-100 p-5 shadow-xl ">
              {/* image */}
              <figure className="mb-3 rounded-lg">
                <div className="h-56 w-full rounded-lg bg-stone-200"></div>
              </figure>
              {/* body */}

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-stone-200">
                    <span className="hidden">{item}</span>
                  </div>
                  <div className="col-span-1 h-2 rounded bg-stone-200"></div>
                </div>
                <div className="h-2 rounded bg-stone-200"></div>
                <div className="h-2 rounded bg-stone-200"></div>
                <div className="h-2 rounded bg-stone-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Blogs;
