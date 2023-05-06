import React, { useState, useRef, useEffect } from "react";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value !== "") {
        if (index === otp.length - 1) {
          inputRefs.current[index].blur();
        } else {
          inputRefs.current[index + 1].focus();
        }
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    const pastedOTP = pasteData.replace(/\D/g, "").slice(0, otp.length);
    const newOTP = [...otp];
    for (let i = 0; i < pastedOTP.length; i++) {
      newOTP[i] = pastedOTP[i];
    }
    setOTP(newOTP);
  };

  const handleKeyDown = (index, event) => {
    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        const newOTP = [...otp];
        newOTP[index] = "";
        setOTP(newOTP);
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (index < otp.length - 1) {
          inputRefs.current[index + 1].focus();
        }
        break;
      default:
        break;
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup ? (
        <div className="popup-outer">
          <button onClick={handleClosePopup} className="close-btn">
            X
          </button>
          <div className="popup">
            <h3>Phone Verification</h3>
            <div className="otp-inputs">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength="1"
                />
              ))}
            </div>
            <button onClick={() => console.log(otp)} className="verify-btn">
              Verify
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowPopup(true)}>Show Popup</button>
      )}
    </div>
  );
};

export default Popup;
