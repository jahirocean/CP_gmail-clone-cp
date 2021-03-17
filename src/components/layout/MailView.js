import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MailViewSettingsHeader from "./MailViewSettingsHeader";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import SimpleButton from "../buttons/SimpleButton";
import PrintIcon from "@material-ui/icons/Print";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReplyIcon from "@material-ui/icons/Reply";
import ForwardIcon from "@material-ui/icons/Forward";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import StarIcon from "@material-ui/icons/Star";

function MailView({ userEmail, userId }) {
  const { mailId } = useParams();

  const [newID, setNewID] = useState({
    id: "",
  });
  const [mails, setMails] = useState({
    from: "",
    userName: "",
    userPhoto: "",
    subject: "",
    message: "",
    timestamp: "",
    starred: false,
    important: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const ref = db.collection("mails").where("from", "==", userEmail);
  const refference = db.collection("mails").doc(mailId);
  const getMessage = () => {
    // only for practce

    if (userId) {
      ref
        .get()
        .then((querySnapshot) => {
          let newUserID = querySnapshot.docs.map((doc) => ({
            id: doc.id,
          }));

          let ID = newUserID.find((item) => item.id === mailId);
          setNewID({ id: ID.id });
        })
        .catch((error) => {});
    }

    if (newID.id === mailId) {
      refference
        .get()
        .then((doc) => {
          if (doc.exists) {
            let message = doc.data();
            setMails({
              from: message.from,
              userName: message.userName,
              userPhoto: message.photo,
              subject: message.subject,
              message: message.message,
              timestamp: message.timestamp,
              starred: message.fromStarred,
              important: message.fromImportant,
            });
            setIsLoading(false);
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      refference
        .get()
        .then((doc) => {
          if (doc.exists) {
            let message = doc.data();
            setMails({
              from: message.from,
              userName: message.userName,
              userPhoto: message.photo,
              subject: message.subject,
              message: message.message,
              timestamp: message.timestamp,
              starred: message.toStarred,
              important: message.toImportant,
            });
            setIsLoading(false);
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleStar = () => {
    if (newID.id === mailId) {
      if (!mails.starred) {
        refference.set(
          {
            fromStarred: true,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          starred: true,
        });
      } else {
        refference.set(
          {
            fromStarred: false,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          starred: false,
        });
      }
    } else {
      if (!mails.starred) {
        refference.set(
          {
            toStarred: true,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          starred: true,
        });
      } else {
        refference.set(
          {
            toStarred: false,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          starred: false,
        });
      }
    }
  };

  const handleImportant = () => {
    if (newID.id === mailId) {
      if (!mails.important) {
        refference.set(
          {
            fromImportant: true,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          important: true,
        });
      } else {
        refference.set(
          {
            fromImportant: false,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          important: false,
        });
      }
    } else {
      if (!mails.important) {
        refference.set(
          {
            toImportant: true,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          important: true,
        });
      } else {
        refference.set(
          {
            toImportant: false,
          },
          { merge: true }
        );
        setMails({
          ...mails,
          important: false,
        });
      }
    }
  };

  useEffect(() => {
    getMessage();
  }, [mailId]);

  return (
    <>
      {isLoading ? (
        <Wrapper>
          <Loading>
            <CircularProgress color="secondary" />
          </Loading>
        </Wrapper>
      ) : (
        <Wrapper>
          <MailViewSettingsHeader />
          <MailViewSection>
            <MailTitleHeader>
              <LeftButton>
                <Title>{mails.subject}</Title>
                <IconButton onClick={handleImportant} size="small">
                  {mails.important ? (
                    <LabelImportantIcon htmlColor="#f7cb69" />
                  ) : (
                    <LabelImportantIcon />
                  )}
                </IconButton>
                <SimpleButton />
              </LeftButton>

              <RightButton>
                <IconButton>
                  <PrintIcon />
                </IconButton>
                <IconButton>
                  <OpenInNewIcon />
                </IconButton>
              </RightButton>
            </MailTitleHeader>

            <MailUserHeader>
              <MailUserLeft>
                <Avatar src={mails.userPhoto} />
                <div>
                  <h6>
                    {mails.userName} <span>-{`< ${mails.from} >`}</span>
                  </h6>
                  <Span>
                    to me{" "}
                    <button>
                      <ArrowDropDownIcon />
                    </button>
                  </Span>
                </div>
              </MailUserLeft>

              <MailUserRight>
                <p>{new Date(mails.timestamp?.seconds * 1000).toUTCString()}</p>
                <div>
                  <IconButton size="small" onClick={handleStar}>
                    {mails.starred ? (
                      <StarIcon htmlColor="#f7cb69" />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                  <IconButton>
                    <ReplyIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </MailUserRight>
            </MailUserHeader>

            <MailMessage>{mails.message}</MailMessage>

            <MailFooter>
              <Button startIcon={<ReplyIcon />} variant="outlined">
                Reply
              </Button>
              <Button startIcon={<ForwardIcon />} variant="outlined">
                Forword
              </Button>
            </MailFooter>
          </MailViewSection>
        </Wrapper>
      )}
    </>
  );
}

export default MailView;

const Wrapper = styled.div`
  overflow: hidden;
`;
const MailViewSection = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 76.3vw;
  height: 80vh;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MailTitleHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 0 23px;
  height: 48px;
  justify-content: space-between;
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;
const MailUserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin: 10px 15px 10px 10px;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 5px;
  button {
    border: none;
    background: transparent;
    width: 15px;
    height: 20px;
    border-radius: 2px;
    padding: 0;
    margin-left: 5px;
    :hover {
      background: lightgray;
    }
    :focus {
      outline: none;
    }
    .MuiSvgIcon-root {
      font-size: 14px;
      margin: 0;
    }
  }
`;
const MailUserLeft = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    h6 {
      display: flex;
      font-size: 12px;
      span {
        font-weight: 400;
      }
    }
  }
`;
const MailUserRight = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    margin-right: 15px;
  }
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const Title = styled.p`
  font-size: 18px;
`;
const RightButton = styled.div`
  display: flex;
  align-items: center;
`;
const LeftButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MailMessage = styled.div`
  padding: 20px;
  font-size: 14px;
`;

const MailFooter = styled.div`
  padding-left: 30px;
  gap: 20px;
  display: flex;
  margin-top: 10px;
  .MuiButton-root {
    text-transform: capitalize;
    color: gray;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 83vh;
  width: 100%;
`;
