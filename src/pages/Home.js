import React, { useState } from "react";
import Modal from "../components/Modal";

const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show} setShow={setShow} />
    </>
  );
};

export default Home;
