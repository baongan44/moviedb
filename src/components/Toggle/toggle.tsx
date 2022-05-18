import React, { useState } from "react";
import "./toggle.scss";

interface Props {
  firstName: string;
  secondName: string;
  handleToggle?: any;
}
const Toggle = ({ firstName, secondName, handleToggle }: Props) => {
  const [activeFirst, setActiveFirst] = useState(true);
  const [activeSecond, setActiveSecond] = useState(false);
  return (
    <div className="toggle">
      <div className="toggle-wrapper">
        <div
          className={`toggle-wrapper__first ${activeFirst ? "active" : ""}`}
          onClick={() => {
            setActiveFirst(true);
            setActiveSecond(false);
            handleToggle(firstName);
          }}
        >
          {firstName}
        </div>
        <div
          className={`toggle-wrapper__second ${activeSecond ? "active" : ""}`}
          onClick={() => {
            setActiveSecond(true);
            setActiveFirst(false);
            handleToggle(secondName);
          }}
        >
          {secondName}
        </div>
      </div>
    </div>
  );
};

export default Toggle;
