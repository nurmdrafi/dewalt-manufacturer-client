import React from "react";
import { useStars } from "stars-rating-react-hooks";

const ReviewCard = ({ review }) => {
  // Star Ratings Config
  const config = {
    totalStars: 5,
    initialSelectedValue: `${review.ratings}`,
    renderFull: "★",
    renderEmpty: "☆",
  };
  const { stars, getStarProps } = useStars(config);
  return (
    <div className="card mx-auto max-w-sm bg-slate-50 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl capitalize">{review.name}</h2>
        <h2 className="card-title uppercase text-primary">{review.location}</h2>
        <div className="item-center flex">
          <h2 className="card-title">Ratings: {review.ratings}/5 </h2>

          {stars?.map((star, i) => (
            <span
              key={i}
              {...getStarProps(i, {
                style: {
                  fontSize: "30px",
                  color: "gold",
                  pointerEvents: "none",
                },
              })}
            >
              {star}
            </span>
          ))}
        </div>
        <p>{review.description}</p>
      </div>
    </div>
  );
};

export default React.memo(ReviewCard);
