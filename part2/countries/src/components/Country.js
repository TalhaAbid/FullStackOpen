import React from "react";

const Country = (props) => {
  return (
    <div>
      <li>
        {props.country.name} <button>{props.show ? "show" : "hide"}</button>
      </li>
    </div>
  );
};

export default Country;
