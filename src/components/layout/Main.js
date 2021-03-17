import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import EmailsInboxView from "./EmailsInboxView";

import EmailsView from "./EmailsView";
import MailView from "./MailView";
import SendMessageModal from "./SendMessageModal";
import Sidebar from "./Sidebar";
import SideIcons from "./SideIcons";

function Main({ user: { userId, userName, userEmail, userPhoto } }) {
  const [openModal, setOpenModal] = useState(false);

  const openSendMessage = () => {
    setOpenModal(true);
  };

  return (
    <Wrapper>
      <Sidebar userPhoto={userPhoto} openSendMessage={openSendMessage} />
      <Switch>
        <Route path="/" exact>
          <EmailsInboxView userId={userId} userEmail={userEmail} />
        </Route>
        <Route path="/:sidebarTitle">
          <EmailsView userId={userId} userEmail={userEmail} />
        </Route>
        <Route path="/mail/:mailId">
          <MailView userId={userId} userEmail={userEmail} />
        </Route>
      </Switch>

      <SideIcons />
      {openModal && (
        <SendMessageModal
          userId={userId}
          userName={userName}
          userEmail={userEmail}
          userPhoto={userPhoto}
          setOpenModal={setOpenModal}
        />
      )}
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 256px auto 50px;
`;
