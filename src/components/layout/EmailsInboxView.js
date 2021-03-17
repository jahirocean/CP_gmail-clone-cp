import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { CircularProgress } from "@material-ui/core";

import EmailItem from "../EmailItem/EmailItem";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import EmailsTopView from "./EmailsTopView";

function EmailsInboxView({ userId, userEmail }) {
  const { sidebarTitle } = useParams();
  const [mails, setMails] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [iserror, setisError] = useState(false);

  const ref = db.collection("mails");

  const getEmails = () => {
    if (userId) {
      ref
        .where("to", "==", userEmail)
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
          let newMail = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setMails(newMail);

          setIsLoading(false);
        })
        .catch((error) => {
          setisError(true);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getEmails();
  }, [sidebarTitle]);

  return (
    <Wrapper>
      <EmailsTopView />
      {isLoding ? (
        <Loading>
          <CircularProgress color="secondary" />
        </Loading>
      ) : (
        <EmailWrapper>
          {mails.map((mail, index) => (
            <EmailItem
              key={index.id}
              id={mail.id}
              toStarred={mail.data.toStarred}
              toImportant={mail.data.toImportant}
              userName={mail.data.userName}
              subject={mail.data.subject}
              message={mail.data.message}
              recieved={new Date(
                mail.data.timestamp?.seconds * 1000
              ).toLocaleTimeString()}
              read={mail.data.read}
              sidebarTitle={sidebarTitle}
            />
          ))}
        </EmailWrapper>
      )}
    </Wrapper>
  );
}

export default EmailsInboxView;

const Wrapper = styled.div``;

const EmailWrapper = styled.div`
  overflow-y: scroll;
  height: 83.5vh;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 83vh;
  width: 100%;
`;
