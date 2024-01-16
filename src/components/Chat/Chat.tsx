import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import "../../css/chat.scss";
import List from "@mui/material/List";
import {
  useGetConversationListQuery,
  useGetMessagesQuery,
  useGetUserQuery,
  useCreateConversationMutation
} from "../../store/apis/apiSlice";
import ConversationItem from "./ConversationItem";
import type { ConversedUser, Message } from "../../types/Chat";
import MessagePane from "./MessagePane";
import io from 'socket.io-client';
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

export default function Chat() {

  const socket = useRef() as React.MutableRefObject<Socket>;
  const params = useParams();
  console.log("CONVERSATION ID PARAM = " + JSON.stringify(params))
  useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket?.current.on("receive_message", (data) => {
      refetch();
    });

    // return () => {
    //   socket.current.disconnect();
    // };
  }, []);

  const {
    data: conversationList,
    isLoading: isConversationListLoading,
    isError,
  } = useGetConversationListQuery({});
  const {
    data: loggedInUser,
    isLoading: isUserLoading,
  } = useGetUserQuery({});
  const [selectedUser, setSelectedUser] = useState<ConversedUser>({
    userId: -1,
    name: null,
    conversationId: null
  })
  const [createConversation, { isLoading }] = useCreateConversationMutation();
  const
    { data: messages,
      isLoading: isMessagesLoading,
      isFetching: isMessagesFetching,
      isError: isMessagesError,
      refetch
    } = useGetMessagesQuery(selectedUser.conversationId);



  useEffect(() => {
    if (!isConversationListLoading && conversationList != null && conversationList.length > 0) {
      setSelectedUser(conversationList[0]);
    }
    if (conversationList != null) {
      conversationList.forEach((conversation: ConversedUser) => {
        if (conversation.userId != null) {
          console.log("Joining")
          socket.current.emit("join_room", conversation.conversationId);
        }
      });
    }
    if (params?.conversationId != null) {

    }


  }, [conversationList]);

  let conversationItems;
  if (isConversationListLoading)
    conversationItems = "Loading"
  else if (conversationList != null) {
    conversationItems = conversationList.map((conversedUser: ConversedUser) => {
      return <ConversationItem
        selectedUser={selectedUser}
        conversedUser={conversedUser}
        key={conversedUser.userId}
        setSelectedUser={setSelectedUser}
      />
    })
  }

  return (
    <>
      <Container
        sx={{ bgcolor: styleConstants.bg_color, minHeight: "100vh", pt: "2em" }}
        maxWidth={false}
        disableGutters
      >
        <div className="chatPane">
          <div className="contactNames">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {conversationItems}
            </List>
          </div>
          <MessagePane selectUser={selectedUser} messages={messages} socket={socket} />
        </div>
      </Container>
    </>
  );
}


