import React from "react";
import "./card.css";
import { CoinSVG } from "../../assets/svg/svg";
const Cards = (props) => {
  const items = props.data;
  const date = new Date(items.startOn).toLocaleDateString("vi-VI");
  return (
    <div className="fundedproject-card">
      <div className="fundedproject-card__images">
        <img
          src={items.coverPhoto}
          alt=""
          className="fundedproject-card__image"
        />
        <span className="fundedproject-card__status">{items.status}</span>
        <img src={items.photo} alt="" className="fundedproject-card__image-poster"/>
      </div>

      <div className="fundedproject-card__header">
        <h2 className="fundedproject-card__heading">{items.name}</h2>
        <span className="fundedproject-card__svg">
          <CoinSVG />
        </span>
      </div>

      <span className="fundedproject-card-bcmd">${items.symbol}</span>
      <div className="fundedproject-card-total">
        <span className="fundedproject-card__total-text">Total Raise</span>
        <span className="fundedproject-card__total-number">
          ${items.totalRaise} Max
        </span>
      </div>
      <div className="fundedproject-card-allocation">
        <span className="fundedproject-card__allocation-text">
          Personal Allocation
        </span>
        <span className="fundedproject-card__allocation-number">
          ${items.personalAllocation}
        </span>
      </div>

      <div className="fundedproject-card__footer">
        <span className="fundedproject-card-status">IDO starts on </span>
        <span className="fundedproject-card-startOn">{`${date}`}</span>
      </div>
    </div>
  );
};

export default Cards;
