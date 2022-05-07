import React from "react";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";

const Layout = ({ children }: { children?: any }) => {
  return (
    <div>
      <div>
        <Header />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
