import { Checkbox, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { useHistory } from "react-router";
import { db } from "../../firebase";

function EmailItem({
  toStarred,
  toImportant,
  fromStarred,
  fromImportant,
  subject,
  message,
  recieved,
  read,
  userName,
  id,
  sidebarTitle,
}) {
  const [toStar, setToStar] = useState(toStarred);
  const [fromStar, setFromStar] = useState(fromStarred);

  const [toImpor, setToImpor] = useState(toImportant);
  const [fromImpor, setFromImpor] = useState(fromImportant);

  const [readMessage, setReadMessage] = useState(read);

  const history = useHistory();
  const ref = db.collection("mails").doc(id);

  const handleStar = () => {
    if (sidebarTitle === "Inbox") {
      if (!toStar) {
        ref.set({ toStarred: true }, { merge: true });
        setToStar(true);
      } else {
        ref.set({ toStarred: false }, { merge: true });
        setToStar(false);
      }
    } else if (sidebarTitle === "Sent") {
      if (!fromStar) {
        ref.set({ fromStarred: true }, { merge: true });
        setFromStar(true);
      } else {
        ref.set({ fromStarred: false }, { merge: true });
        setFromStar(false);
      }
    } else if (sidebarTitle === "Starred") {
      if (!toStar) {
        ref.set({ toStarred: true }, { merge: true });
        setToStar(true);
      } else {
        ref.set({ toStarred: false }, { merge: true });
        setToStar(false);
      }
    } else if (sidebarTitle === "Importent") {
      if (!toStar) {
        ref.set({ toStarred: true }, { merge: true });
        setToStar(true);
      } else if (toStar) {
        ref.set({ toStarred: false }, { merge: true });
        setToStar(false);
      }
      if (!fromStar) {
        ref.set({ fromStarred: true }, { merge: true });
        setFromStar(true);
      } else {
        ref.set({ fromStarred: false }, { merge: true });
        setFromStar(false);
      }
    }
  };

  const handleImportant = () => {
    if (sidebarTitle === "Inbox") {
      if (!toImpor) {
        ref.set({ toImportant: true }, { merge: true });
        setToImpor(true);
      } else {
        ref.set({ toImportant: false }, { merge: true });
        setToImpor(false);
      }
    } else if (sidebarTitle === "Sent") {
      if (!fromImpor) {
        ref.set({ fromImportant: true }, { merge: true });
        setFromImpor(true);
      } else {
        ref.set({ fromImportant: false }, { merge: true });
        setFromImpor(false);
      }
    } else if (sidebarTitle === "Starred") {
      if (!toImpor) {
        ref.set({ toImportant: true }, { merge: true });
        setToImpor(true);
      } else if (toImpor) {
        ref.set({ toImportant: false }, { merge: true });
        setToImpor(false);
      } else if (!fromImpor) {
        ref.set({ fromImportant: true }, { merge: true });
        setFromImpor(true);
      } else {
        ref.set({ fromImportant: false }, { merge: true });
        setFromImpor(false);
      }
    } else if (sidebarTitle === "Important") {
      if (!toImpor) {
        ref.set({ toImportant: true }, { merge: true });
        setToImpor(true);
      } else if (toImpor) {
        ref.set({ toImportant: false }, { merge: true });
        setToImpor(false);
      } else if (!fromImpor) {
        ref.set({ fromImportant: true }, { merge: true });
        setFromImpor(true);
      } else {
        ref.set({ fromImportant: false }, { merge: true });
        setFromImpor(false);
      }
    }
  };

  const handleRead = () => {
    if (!readMessage) {
      ref.set(
        {
          read: true,
        },
        { merge: true }
      );
      setReadMessage(true);
    }
    history.push(`/mail/${id}`);
  };
  return (
    <Wrapper>
      <ItemLeft>
        <Checkbox size="small" />
        <IconButton size="small" onClick={handleStar}>
          {(sidebarTitle === "Inbox" && toStar) ||
          (sidebarTitle === "Starred" && toStar) ||
          (sidebarTitle === "Sent" && fromStar) ? (
            <StarIcon htmlColor="#f7cb69" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
        <IconButton onClick={handleImportant} size="small">
          {(sidebarTitle === "Inbox" && toImpor) ||
          (sidebarTitle === "Starred" && toImpor && fromImpor) ||
          (sidebarTitle === "Sent" && fromImpor) ? (
            <LabelImportantIcon htmlColor="#f7cb69" />
          ) : (
            <LabelImportantIcon />
          )}{" "}
        </IconButton>
      </ItemLeft>
      <ItemRight onClick={handleRead}>
        <p className={!readMessage && "unread"}>{userName}</p>

        <div className={!readMessage && "unread"}>
          <p>
            {subject}-<span>{message}</span>
          </p>
        </div>

        <p className={!readMessage && "unread"}>{recieved}</p>
      </ItemRight>
    </Wrapper>
  );
}

export default EmailItem;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  padding-right: 10px;
  padding-left: 4px;
  gap: 5px;
  border-top: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid white;

  box-shadow: inset 0 -1px 0 0 rgb(100 121 143 / 12%);

  :hover {
    -webkit-box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
      0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
      0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
    z-index: 1;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
`;
const ItemRight = styled.div`
  display: grid;
  grid-template-columns: 200px auto 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  p {
    font-size: 13px;
  }
  div {
    display: flex;

    p {
      width: 45vw;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        font-size: 12px;
        letter-spacing: 1.5;
        color: gray;
      }
    }
  }
  .unread {
    font-weight: 650;
    color: black;
    span {
      font-weight: 500;
    }
  }
`;
