import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";

import { handleAccessToken } from "../redux/reducers/user.reducer";

const ProtectedRoute = ({ children }: any) => {

  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const res = await dispatchAsync(handleAccessToken()).unwrap();

      if (res.status === "200") {
        console.log("Auth successfully");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    handleAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default ProtectedRoute;
