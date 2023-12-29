// import logo from "../assets/images/TechWave.png";

import React from "react";

function Header() {
  return (
    <>
      <div
        style={{ background: "#424d58" }}
        className="rounded p-2 mt-2 d-flex justify-content-center align-items-center"
      >
        {/* <img src={logo} width="200px" height="50" /> */}
        <h1 style={{ fontWeight: "700" }} className="text-white fw-700">
          Techwave IT Solution Pvt Ltd
        </h1>
      </div>
    </>
  );
}
export default React.memo(Header);
