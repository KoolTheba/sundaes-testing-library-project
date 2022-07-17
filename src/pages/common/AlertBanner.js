import React from "react";

const AlertBanner = ({ message }) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";

  return (
    <div role="alert" className="error__wrapper">
      {alertMessage}
    </div>
  );
};

export default AlertBanner;
