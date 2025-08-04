import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WebcamCapture from "./WebcamCapture";
import "./ProctorApp.css";

import {
  setAlertMessage,
  setIsTestCompleted,
  setIsTestStarted,
  incrementMalpractice,
  setVerificationComplete,
} from "../../../redux/slices/proctorSlice";

import { type RootState } from "../../../redux/store";
import MalpracticeTerminated from "./MalpracticeTerminated";

type MyComponentProps = {
  handleFinalSubmit: () => Promise<void>;
};

const ProctorApp: React.FC<MyComponentProps> = ({ handleFinalSubmit }) => {
  const dispatch = useDispatch();

  const {
    isTestStarted,
    isTestCompleted,
    malpracticeCount,
    verificationComplete,
  } = useSelector((state: RootState) => state.proctor);

  const applicantId = localStorage.getItem("applicantId") || "";

  const handleVerificationComplete = (): void => {
    dispatch(setVerificationComplete(true));
    dispatch(setIsTestStarted(true));
    dispatch(setAlertMessage("✅ Verification complete - Test started!"));
  };

  const handleMalpracticeDetected = (): void => {
    if (verificationComplete) {
      const newCount = malpracticeCount < 12 ? malpracticeCount + 1 : malpracticeCount;
      dispatch(incrementMalpractice());

      if (newCount >= 10) {
        dispatch(
          setAlertMessage("❌ Test terminated due to multiple malpractices.")
        );
        dispatch(setIsTestCompleted(true));
        handleFinalSubmit();
        setTimeout(() => {
          // window.location.href = "about:blank"; // or any exit/thank-you page
          return <MalpracticeTerminated />;
        }, 5000);
      }
    }
  };

  return (
    <div>
      <div className="main-content">
        {isTestStarted && !isTestCompleted && (
          <div className="violation-count">
            Violations: {malpracticeCount/2}/5
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
    </div>
  );
};

export default ProctorApp;
