import React from "react";
import { formatEuroPrice } from "../../utils/CurrencyFormatter";
import "./SummaryCellTitle.scss";
import { Feed } from "../../interface/feeds.interface";

const SummaryCellTitle: React.FC<Feed> = ({ title_es, price_amount }) => {
  return (
    <div className="product-detail">
      <div className="product-title">{title_es}</div>
      <div className="product-price">
        {formatEuroPrice(price_amount )}
      </div>
    </div>
  );
};

export default SummaryCellTitle;
