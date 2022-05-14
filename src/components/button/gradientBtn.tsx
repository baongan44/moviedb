import React from "react";
import "./button.scss";

const GradientBtn = ({ name, onClick }: { name: string; onClick?: any }) => {
  return (
    <div className="grandient-button" onClick={onClick}>
      {name}
      <button></button>
      <button className="hover"></button>
    </div>
  );
};

export default GradientBtn;
