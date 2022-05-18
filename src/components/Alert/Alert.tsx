import { Alert } from "antd";
import React from "react";

interface Props {
  message?: string;
  description?: string;
  typeAlert?: any;
}

const AlertPopup = ({ message, description, typeAlert = "success" }: Props) => {
  return (
    <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
      <Alert
        message={message}
        description={description}
        type={typeAlert}
        showIcon
        closable
      />
    </div>
  );
};
export default AlertPopup;
