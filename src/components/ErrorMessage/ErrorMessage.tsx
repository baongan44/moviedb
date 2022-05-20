import React from "react";
import styled from "styled-components";

const ErrorMessage = ({ children }: { children?: any }) => {
  return <Error>{children}</Error>;
};

export default ErrorMessage;

const Error = styled.div`
  color: #ce4451;
  font-size: 13px;
  margin-left: 5px;
`
