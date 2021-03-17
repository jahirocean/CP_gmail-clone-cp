import React from "react";
import styled from "styled-components";
import Compose from "../buttons/Compose";
import { SidebarButtonItems } from "../data/SidebarButtonItems";
import { SidebarMeetItems } from "../data/SidebarMeet";
import AddIcon from "@material-ui/icons/Add";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Avatar, IconButton } from "@material-ui/core";
import { SidebarBottomIcons } from "../data/SidebarBottomIcons";
import { useHistory } from "react-router-dom";
import { InboxItemData } from "../data/InboxItemData";

function Sidebar({ openSendMessage, userPhoto }) {
  const history = useHistory();

  return (
    <Wrapper>
      <TopSection>
        <ComposeWrapper>
          <Compose openSendMessage={openSendMessage} />
        </ComposeWrapper>
        <SideButtonWrapper>
          {SidebarButtonItems.map((item, index) => (
            <SidebatButtonItems
              key={index.id}
              onClick={() => history.push(`/${item.title}`)}
            >
              {item.icon}
              {item.title}
            </SidebatButtonItems>
          ))}
        </SideButtonWrapper>
      </TopSection>
      <BottomeSection>
        <MeetWrapper>
          <span></span>
          <Title>Meet</Title>
          {SidebarMeetItems.map((item, index) => (
            <SidebatButtonItems key={index.id}>
              {item.icon}
              {item.title}
            </SidebatButtonItems>
          ))}
        </MeetWrapper>
        <HangoutsWrapper>
          <Title>Hangouts</Title>
          <HangoutsItem>
            <Avatar src={userPhoto ? userPhoto : " "} />
            <div>
              Jahir <ArrowDropDownIcon style={{ fontSize: "14" }} />
            </div>
            <IconButton size="small">
              <AddIcon />
            </IconButton>
          </HangoutsItem>
        </HangoutsWrapper>
        <BottomIconWrapper>
          {SidebarBottomIcons.map((item) => (
            <IconButton size="small">{item.icon}</IconButton>
          ))}
        </BottomIconWrapper>
      </BottomeSection>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  position: relative;
  height: 91.9vh;
  border-right: 0.5px solid whitesmoke;
  display: grid;
  grid-template-rows: auto min-content;
`;
const ComposeWrapper = styled.div`
  display: grid;
  place-items: start;
  padding: 10px 6px;
`;
const SideButtonWrapper = styled.div``;
const Title = styled.h6`
  padding: 5px 20px;
  font-size: 13px;
  color: #202124;
  font-weight: 500;
`;
const MeetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  span {
    width: 30px;
    margin: 4px auto;
    align-self: center;
    height: 5px;
    background-color: white;
    border-radius: 50px;
  }
  :hover span {
    background-color: lightgray;
  }
`;
const HangoutsWrapper = styled.div`
  border-top: 1px solid lightgray;
  margin-top: 20px;
`;
const BottomIconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 30px;
  .MuiSvgIcon-root {
    font-size: 18px;
  }
`;
const SidebatButtonItems = styled.div`
  display: grid;
  grid-template-columns: 18% auto;
  align-items: center;
  color: gray;
  font-size: 0.875rem;
  padding: 5px 20px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  border-radius: 0 100px 100px 0;
  cursor: pointer;
  margin-right: 4px;
  letter-spacing: 0.2px;
  transition: border-radius 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  .MuiSvgIcon-root {
    font-size: 18px;
  }
  :hover {
    background-color: #f5f7f7;
  }
`;

const HangoutsItem = styled.div`
  display: grid;
  grid-template-columns: 18% auto min-content;
  padding-left: 20px;
  align-items: center;
  .MuiAvatar-root {
    height: 25px;
    width: 25px;
  }
`;
const TopSection = styled.div``;
const BottomeSection = styled.div``;
