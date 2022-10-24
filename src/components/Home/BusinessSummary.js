import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { BsPeople } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { FaTools } from "react-icons/fa";

const BusinessSummary = () => {
  return (
    <section className="mx-auto w-full">
      <h2 className="--heading">Business Summary</h2>
      <div className="grid grid-cols-1 gap-8 bg-primary md:grid-cols-3">
        {/* Customers */}
        <div className="card mx-auto max-w-sm">
          <div className="card-body">
            <div className="text-center text-4xl font-bold">
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
              <h2 className="text-3xl font-bold">Customers</h2>
            </div>
          </div>
        </div>
        {/* Annual Revenue */}
        <div className="card mx-auto max-w-sm">
          <div className="card-body">
            <div className="text-center text-4xl font-bold">
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
              <h2 className="text-3xl font-bold">Annual Revenue</h2>
            </div>
          </div>
        </div>
        {/* Tools */}
        <div className="card mx-auto max-w-sm">
          <div className="card-body">
            <div className="text-center text-4xl font-bold">
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
              <h2 className="text-3xl font-bold">Tools</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSummary;
