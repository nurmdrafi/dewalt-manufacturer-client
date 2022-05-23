import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useQuery } from "react-query";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const {
    isLoading,
    error,
    data: reviews,
    refetch,
  } = useQuery("reviews", () =>
    fetch("http://localhost:5000/reviews").then((res) => res.json())
  );
  if (isLoading) {
    return <p className="text-center font-bold text-4xl">Loading...</p>;
  }
  refetch();
  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-16">
        Reviews {reviews.length}
      </h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
            dynamicBullets: true,
          }}
        modules={[Pagination]}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
