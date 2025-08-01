import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WebcamCapture from "./components/WebcamCapture";
import Alerts from "./components/Alerts";
import "./App.css";

import {
  setAlertMessage,
  setCapturedImage,
  setIsTestCompleted,
  setIsTestStarted,
  incrementMalpractice,
  setVerificationComplete,
} from "./redux/proctorSlice";

import { RootState } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const {
    capturedImage,
    alertMessage,
    isTestStarted,
    isTestCompleted,
    malpracticeCount,
    verificationComplete,
  } = useSelector((state: RootState) => state.proctor);

  const applicantId = "0d708def-c216-4787-bf21-efb0e2eb91aa";

  const handleVerificationComplete = (): void => {
    dispatch(setVerificationComplete(true));
    dispatch(setIsTestStarted(true));
    dispatch(setAlertMessage("✅ Verification complete - Test started!"));
  };

  const handleMalpracticeDetected = (): void => {
    if (verificationComplete) {
      const newCount = malpracticeCount + 1;
      dispatch(incrementMalpractice());

      if (newCount >= 5) {
        dispatch(
          setAlertMessage("❌ Test terminated due to multiple malpractices.")
        );
        dispatch(setIsTestCompleted(true));

        setTimeout(() => {
          window.location.href = "about:blank"; // or any exit/thank-you page
        }, 10000);
      }
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h2 className="navbar-title">Live Proctoring</h2>
        <div className="navbar-right">
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured Face"
              className="captured-image"
              width={50}
              height={50}
            />
          )}
        </div>
      </nav>
      <div className="main-content">
        {isTestStarted && !isTestCompleted && (
          <div className="violation-count">
            Violations: {malpracticeCount}/5
          </div>
        )}
        <WebcamCapture
          onMalpracticeDetected={handleMalpracticeDetected}
          isTestStarted={isTestStarted}
          isTestCompleted={isTestCompleted}
          onVerificationComplete={handleVerificationComplete}
          applicantId={applicantId}
        />
      </div>
      <Alerts message={alertMessage} />
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from "react";
// import WebcamCapture from "./components/WebcamCapture";
// import Alerts from "./components/Alerts";
// import "./App.css";

// const App: React.FC = () => {
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [alertMessage, setAlertMessage] = useState<string>("");
//   const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
//   const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
//   const [malpracticeCount, setMalpracticeCount] = useState<number>(0);
//   [];
//   const [verificationComplete, setVerificationComplete] =
//     useState<boolean>(false);
//   // const [applicantId, setApplicantId] = useState<string>("");

//   // useEffect(() => {
//   //   setApplicantId(`user_${Math.floor(Math.random() * 1000)}`);
//   // }, []);

//   const applicantId = "0d708def-c216-4787-bf21-efb0e2eb91aa"

//   const handleVerificationComplete = (): void => {
//     setVerificationComplete(true);
//     setIsTestStarted(true);
//     setAlertMessage("✅ Verification complete - Test started!");
//   };

//   const handleMalpracticeDetected = (): void => {
//     if (verificationComplete) {
//       const newCount = malpracticeCount + 1;
//       setMalpracticeCount(newCount);
//       if (newCount >= 5) {
//         setAlertMessage("❌ Test terminated due to multiple malpractices.");
//         setIsTestCompleted(true);
//         setTimeout(() => {
//           window.location.href = "about:blank"; // or any exit/thank-you page
//         }, 10000);
//       }
//     }
//   };

//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <h2 className="navbar-title">Live Proctoring</h2>
//         <div className="navbar-right">
//           {capturedImage && (
//             <img
//               src={capturedImage}
//               alt="Captured Face"
//               className="captured-image"
//               width={50}
//               height={50}
//             />
//           )}
//         </div>
//       </nav>
//       <div className="main-content">
//         {isTestStarted && !isTestCompleted && (
//           <div className="violation-count">
//             Violations: {malpracticeCount}/5
//           </div>
//         )}
//         <WebcamCapture
//           setCapturedImage={setCapturedImage}
//           setAlertMessage={setAlertMessage}
//           onMalpracticeDetected={handleMalpracticeDetected}
//           isTestStarted={isTestStarted}
//           isTestCompleted={isTestCompleted}
//           onVerificationComplete={handleVerificationComplete}
//           applicantId={applicantId}
//         />
//       </div>
//       <Alerts message={alertMessage} />
//     </div>
//   );
// };
// export default App;
