import React from "react";

const Footer = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return { exercises: a.exercises + b.exercises };
  });
  return (
    <p>
      <h2>total of {total.exercises} exercises</h2>
    </p>
  );
};

export default Footer;
