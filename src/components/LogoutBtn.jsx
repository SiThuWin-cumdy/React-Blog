import { useState } from "react";
import authService from "../appwrite/auth";
import { logout as logoutAction } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./index";
function LogoutBtn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    try {
      authService.logout().then(() => {
        dispatch(logoutAction());
      });
    } catch (error) {
      setError(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button type="button" className="w-[100px]" onClick={ () => logoutHandler()}>
      Logout
    </Button>
  );
}

export default LogoutBtn;
