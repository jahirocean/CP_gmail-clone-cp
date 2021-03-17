import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { sendButtonIcon } from "../data/sendButtonIcon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "firebase";
import { db } from "../../firebase";

function SendMessageModal({
  setOpenModal,
  userId,
  userName,
  userEmail,
  userPhoto,
}) {
  const [values, setValues] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newMail = {
      authorId: userId,
      to: values.email,
      from: userEmail,
      userName: userName,
      subject: values.subject,
      message: values.message,
      read: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      fromStarred: false,
      fromImportant: false,
      toStarred: false,
      toImportant: false,
      photo: userPhoto,
    };
    db.collection("mails").add(newMail);
    setValues({
      email: "",
      subject: "",
      message: "",
    });
    setOpenModal(false);
  };

  return (
    <Wrapper>
      <Header>
        <p>New Message</p>
        <IconButton onClick={() => setOpenModal(false)} size="small">
          <CloseIcon htmlColor="gray" />
        </IconButton>
      </Header>
      <Container>
        <To>
          <input
            name="email"
            values={values.email}
            onChange={handleChange}
            type="email"
            placeholder="To"
          />
          <div>
            <span>Cc</span>
            <span> Bcc</span>
          </div>
        </To>
        <Subject>
          <input
            name="subject"
            value={values.subject}
            onChange={handleChange}
            type="text"
            placeholder="Subject"
          />
        </Subject>
        <Message>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Write your message"
          />
        </Message>

        <BottomHeader>
          <ButtonGroup size="small">
            <Button onClick={onSubmit} variant="contained" color="primary">
              Send
            </Button>
            <Button
              style={{ paddingLeft: "0", paddingRight: "0" }}
              variant="contained"
              color="primary"
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <MiddleButton>
            {sendButtonIcon.map(({ icon, title }) => (
              <IconButton size="small">{icon}</IconButton>
            ))}
          </MiddleButton>
          <RightButton>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </RightButton>
        </BottomHeader>
      </Container>
    </Wrapper>
  );
}

export default SendMessageModal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 50px;
  width: 40vw;
  height: 60vh;
  z-index: 1;
  display: grid;
  grid-template-rows: 35px auto;
  background: #fff;
  overflow: hidden;
  -webkit-border-radius: 8px 8px 0 0;
  border-radius: 8px 8px 0 0;
  -webkit-box-shadow: 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%), 0 5px 5px -3px rgb(0 0 0 / 20%);
  box-shadow: 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%),
    0 5px 5px -3px rgb(0 0 0 / 20%);
`;
const Header = styled.div`
  background: #202124;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
  color: #fff;
  align-items: center;
`;
const To = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid lightgray;
  border-radius: 4px;
  padding-right: 10px;
  padding-left: 10px;

  input {
    border: none;
    width: 80%;
    height: 100%;
    background: transparent;
    font-size: 13px;
    color: gray;
    :focus {
      outline: none;
    }
  }
  :hover {
    background: whitesmoke;
  }
`;

const Container = styled.div`
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-rows: repeat(2, 35px) auto 35px;
`;

const Subject = styled.div`
  background: white;
  border-bottom: 1px solid lightgray;
  overflow: hidden;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 4px;
  input {
    border: none;
    width: 80%;
    height: 100%;
    font-size: 13px;
    color: gray;
    background: transparent;
    :focus {
      outline: none;
    }
  }
  :hover {
    background: whitesmoke;
  }
`;

const Message = styled.div`
  background: white;
  overflow: hidden;
  padding: 10px;
  width: 96%;
  height: 100%;
  margin-top: 10px;
  background: whitesmoke;
  textarea {
    width: 95%;
    height: 70%;
    border: none;
    background: transparent;
    resize: none;
    :focus {
      outline: none;
    }
  }
`;
const BottomHeader = styled.div`
  display: grid;
  grid-template-columns: min-content auto min-content;
  align-items: center;
  background: #fff;
`;
const MiddleButton = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  padding-left: 5px;
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const RightButton = styled.div`
  display: flex;
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const RightBtn = styled.div``;
