import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { UrlState } from "@/context";

// eslint-disable-next-line react/prop-types
const TrackAuthentication = ({ children }) => {
  const { loading, isUserAuthenticated } = UrlState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated && loading === false) {
      navigate("/authenticate");
    }
  }, [isUserAuthenticated, loading]);

  if (loading) {
    return <BarLoader width={"100%"} color="red" />;
  }

  if (isUserAuthenticated) return children;
};

export default TrackAuthentication;
