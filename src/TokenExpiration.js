// Inside TokenExpirationPopup.js
import React from "react";

const TokenExpirationPopup = ({ onRefresh, onClose }) => {
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    zIndex: "999",
  };

  const contentStyle = {
    textAlign: "center",
  };

  const buttonStyle = {
    margin: "0 10px",
    padding: "10px",
    cursor: "pointer",
  };

  return (
    <div style={popupStyle}>
      <div style={contentStyle}>
        <p>Your session is about to expire. Refresh your token?</p>
        <div>
          <button style={buttonStyle} onClick={onRefresh}>
            Refresh
          </button>
          <button style={buttonStyle} onClick={onClose}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpirationPopup;
