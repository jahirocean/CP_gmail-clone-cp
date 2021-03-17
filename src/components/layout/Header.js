import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsIcon from "@material-ui/icons/Apps";

function Header({ user }) {
  return (
    <Wrapper>
      <LogoWrapper>
        <IconButton>
          <MenuIcon />
        </IconButton>

        <img
          src="https://cdn.vox-cdn.com/thumbor/8fWz6qpiMYMsZhY4vrc9Vhl5yL8=/0x110:1320x770/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg"
          alt=""
        />
      </LogoWrapper>
      <SearchWrapper>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="Search mail" />
        <IconButton>
          <ArrowDropDownIcon />
        </IconButton>
      </SearchWrapper>
      <SettingsWrapper>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton size="small">
          <Avatar src={user?.userPhoto} />
        </IconButton>
      </SettingsWrapper>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 256px auto min-content;
  align-items: center;
  height: 8vh;
  border-bottom: 1px solid lightgray;
  overflow: hidden;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  .MuiIconButton-root {
    padding: 8px;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
  }
  img {
    height: 45px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border-radius: 4px;
  max-width: 620px;
  border: 0.1px solid #f1f3f4;
  :hover {
    border: 0.1px solid lightgray;
  }

  input {
    background: transparent;
    border: none;
    padding: 10px;
    color: #5f6368;
    width: 100%;

    :focus {
      outline: none;
    }
  }
  .MuiSvgIcon-root {
    font-size: 18px;
    color: #5f6368;
  }
`;

const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  .MuiIconButton-root {
    padding: 8px;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
  }
  .MuiAvatar-root {
    height: 35px;
    width: 35px;
  }
`;
