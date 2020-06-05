import React, { PropTypes, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { MediaContext } from "../contexts/MediaContext";
import { checkToken } from "../hooks/Apihooks";
import PostScream from "./PostScream";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Notifications from "./Notifications";

const Navbar = () => {
  const [user, setUser] = useContext(MediaContext);

  let authenticated;
  const token = localStorage.FBIdToken;

  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkToken(localStorage.getItem("FBIdToken"));
      await setUser(userData);
    };
    checkUser();
  }, [setUser]);
  let notifi = [];
  if (token && user !== null) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      authenticated = false;
    } else {
      authenticated = true;
      notifi.push(user.notifications);
    }
  } else {
    authenticated = false;
  }

  return (
    <>
      <AppBar>
        <ToolBar className="nav-container">
          <>
            {authenticated ? (
              <>
                <PostScream />
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                {user.notifications !== undefined && (
                  <Notifications file={user.notifications} />
                )}
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </>
        </ToolBar>
      </AppBar>
    </>
  );
};

export default Navbar;
