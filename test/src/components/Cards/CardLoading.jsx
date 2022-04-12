import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardLoading = () => {
  return (
    <div className="fundedproject-card">
      <div className="fundedproject-card__images">
        <img src={<Skeleton />} alt="" className="fundedproject-card__image" />
        <span className="fundedproject-card__status">
          <Skeleton />
        </span>
        <img
          src={<Skeleton />}
          alt=""
          className="fundedproject-card__image-poster"
        />
      </div>
      <div className="fundedproject-card__header">
        <h2 className="fundedproject-card__heading">
          <Skeleton />
        </h2>
        <span className="fundedproject-card__svg">
          <Skeleton />
        </span>
      </div>

      <span className="fundedproject-card-bcmd">
        <Skeleton />
      </span>
      <div className="fundedproject-card-total">
        <span className="fundedproject-card__total-text">
          <Skeleton />
        </span>
        <span className="fundedproject-card__total-number">
          <Skeleton />
        </span>
      </div>
      <div className="fundedproject-card-allocation">
        <span className="fundedproject-card__allocation-text">
          <Skeleton />
        </span>
        <span className="fundedproject-card__allocation-number">
          <Skeleton />
        </span>
      </div>

      <div className="fundedproject-card__footer">
        <span className="fundedproject-card-status">
          <Skeleton />
        </span>
        <span className="fundedproject-card-startOn">
          <Skeleton />
        </span>
      </div>
    </div>
  );
};

export default CardLoading;
