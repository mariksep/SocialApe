/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//components
import Navbar from "./components/Navbar";
//PAges
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import UserPage from "./pages/UserPage";
//COntext Provider
import { MediaProvider } from "./contexts/MediaContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <MediaProvider>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/signup" component={SignupForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/" component={Home} />
                <Route exact path="/users/:handle" component={UserPage} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={UserPage}
                />
              </Switch>
            </div>
          </MediaProvider>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
