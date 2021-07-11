import React, { useState } from "react";
import Home from "./Views/Home";

import { Container } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import Signup from "./Views/Signup";
import SignIn from "./Views/Signin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewTaskModal from "./Components/ViewTaskModal";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Router>
        <Navbar />

        <Container maxW="7xl">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute
              path="/task/:id"
              component={() => (
                <ViewTaskModal
                  isOpen={open}
                  onClose={() => {
                    setOpen(!open);
                    window.location = "/";
                  }}
                />
              )}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
