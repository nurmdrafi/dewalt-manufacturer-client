import React from "react";
import { useQuery } from "react-query";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { isLoading, data: reviews } = useQuery("reviews", () =>
    fetch("https://delware-manufacturer.herokuapp.com/reviews").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <></>;
  }

  return (
    <section id="reviews" className="container lg:px-10">
      <h2 className="--heading">Reviews</h2>
      <div className="columns-xs space-y-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
