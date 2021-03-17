import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Login from "./components/layout/Login";
import { auth, provider } from "./firebase";

function App() {
  let defaultUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(defaultUser);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        let newUser = {
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhoto: user.photoURL,
        };

        setUser(newUser);

        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Wrapper>
      {!user ? (
        <Login signIn={signIn} />
      ) : (
        <Router>
          <Header user={user} />
          <Main user={user} />
        </Router>
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div``;
