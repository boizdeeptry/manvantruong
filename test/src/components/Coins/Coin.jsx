import React from "react";
import { CoinSVG } from "../../assets/svg/svg.js";
const Coin = (props) => {
  const items = props.data;
  return (
    <div className="fundedproject-avg__item">
      <div className="fundedproject-avg__item-head">
        <CoinSVG />

        <span className="fundedproject-avg__item-text" style={{color : items.color}}>
          {items.title}
        </span>
      </div>
      <p className="fundedproject-avg__item-number">{items.number}</p>
    </div>
  );
};

export default Coin;
