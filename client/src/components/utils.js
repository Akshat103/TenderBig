import { useNavigate } from "react-router-dom";

export const navigateToContactPage = (selectedService) => {
  const navigate = useNavigate();
  navigate(`/contact?service=${selectedService}`);
};
