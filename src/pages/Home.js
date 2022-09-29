import React, { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";

const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <CreateUserModal show={show} setShow={setShow} />
    </>
  );
};

export default Home;
