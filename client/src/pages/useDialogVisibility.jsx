import { useState } from "react";

const useDialogVisibility = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const hasDialogShownBefore = localStorage.getItem("dialogShown");
    return !hasDialogShownBefore;
  });

  const closeDialog = () => {
    setIsVisible(false);
    localStorage.setItem("dialogShown", "true");
  };

  return [isVisible, closeDialog];
};

export default useDialogVisibility;
