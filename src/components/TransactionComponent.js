import React from "react";

const TransactionComp = ({ item, description, price, datetime}) => {
  return (
    <div className="transaction">

    <div className="left">
      <div className="name">{item}</div>
      <div className="description">{description}</div>
    </div>

    <div className="right">
      <div className={"price " +(price < 0 ? "debit" : "credit")}>{price}</div>
      <div className="datetime">{datetime}</div>
    </div>
  </div>
  );
};

export default TransactionComp;
