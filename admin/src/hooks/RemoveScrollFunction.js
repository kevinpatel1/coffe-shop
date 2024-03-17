import React from "react";

const RemoveScrollFunction = () => {
  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current
    // function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  return {
    numberInputOnWheelPreventChange,
  };
};

export default RemoveScrollFunction;
