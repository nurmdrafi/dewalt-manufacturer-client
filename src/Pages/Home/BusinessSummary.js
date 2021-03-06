import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { BsPeople } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { FaTools } from "react-icons/fa";

const BusinessSummary = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-3xl my-16">Business Summary</h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
        {/* Customers */}
        <div className="card w-[300px] bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <div className="text-4xl font-bold text-center">
              <VisibilitySensor partialVisibility offset={{ bottom: 0 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? <CountUp end={1000} /> : null}+
                  </div>
                )}
              </VisibilitySensor>
              <div className="flex justify-center">
                <BsPeople className="w-[50px]" />
              </div>
              <h2 className="text-3xl font-bold text-green-500">Customers</h2>
            </div>
          </div>
        </div>
        {/* Annual Revenue */}
        <div className="card w-[300px] bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <div className="text-4xl font-bold text-center">
              <VisibilitySensor partialVisibility offset={{ bottom: 0 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? <CountUp end={120} /> : null}M+
                  </div>
                )}
              </VisibilitySensor>

              <div className="flex justify-center">
                <GiReceiveMoney className="w-[50px]" />
              </div>
              <h2 className="text-3xl font-bold text-green-500">
                Annual Revenue
              </h2>
            </div>
          </div>
        </div>
        {/* Tools */}
        <div className="card w-[300px] bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <div className="text-4xl font-bold text-center">
              <VisibilitySensor partialVisibility offset={{ bottom: 0 }}>
                {({ isVisible }) => (
                  <div style={{ height: 50 }}>
                    {isVisible ? <CountUp start={0} end={50} /> : null}+
                  </div>
                )}
              </VisibilitySensor>
              <div className="flex justify-center">
                <FaTools className="w-[50px]" />
              </div>
              <h2 className="text-3xl font-bold text-green-500">Tools</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSummary;
