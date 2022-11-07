import React, { useState } from "react";
import Store from "../component/Store/Store";
import Footer from "../component/Footer/Footer";
import Example from "../component/Navbar/Navbar";

function StorePage() {
  return (
    <>
      <Example />
      <br></br>
      <Store />
      <br></br>
      <Footer />
    </>
  );
}

export default StorePage;
