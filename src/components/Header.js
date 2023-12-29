import React from "react";
function Header() {
  return (
    <>
      <div className="bg-warning p-2 mt-2 d-flex justify-content-center align-items-center">
        <h1 className="text-black">Techwave IT Solution Pvt. Ltd.</h1>
      </div>
    </>
  );
}
export default React.memo(Header);
