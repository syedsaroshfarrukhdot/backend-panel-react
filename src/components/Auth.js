import React from "react";
import userService from "../services/userService";
import { useHistory } from "react-router-dom";

const Auth = ({ children }) => {
  const history = useHistory();
  return (
    <div>
      {userService.isLoggedIn() ? (
        children
      ) : (
        <>
          {history.push("/signin")}
          {window.location.reload()}
        </>
      )}
    </div>
  );
};

export default Auth;
