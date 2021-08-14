import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import Footer from "../components/layout/Footer";

const LayoutAdmin = ({ children }) => (
  <>
    <AdminHeader navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">{children}</main>
    <Footer style={{ backgroundColor: "white" }} />
  </>
);

export default LayoutAdmin;
