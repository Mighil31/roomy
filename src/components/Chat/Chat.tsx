import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import "../../css/chat.scss";
import List from "@mui/material/List";
import { useGetConversationListQuery, useGetMessagesQuery } from "../../store/apis/apiSlice";
import ConversationItem from "./ConversationItem";
import type { ConversedUser, Message } from "../../types/Chat";
import MessagePane from "./MessagePane";
import io from 'socket.io-client';
import { Socket } from "socket.io-client";

export default function Chat() {

  const [userSockets, setUserSockets] = useState<{ [key: string]: Socket }>({});
  const socket = useRef() as React.MutableRefObject<Socket>;

  const {
    data: conversationList,
    isLoading: isConversationListLoading,
    isError,
  } = useGetConversationListQuery({});
  const [selectedUser, setSelectedUser] = useState<ConversedUser>({
    userId: -1,
    name: null,
    conversationId: null
  })
  const { data: messages, isLoading: isMessagesLoading, isError: isMessagesError, refetch } = useGetMessagesQuery(selectedUser.conversationId);

  useEffect(() => {
    if (!isConversationListLoading && conversationList != null && conversationList.length > 0) {
      setSelectedUser(conversationList[0]);
      socket.current = io("http://localhost:5000");

    }
    if (conversationList != null) {
      conversationList.forEach((conversation: ConversedUser) => {
        if (conversation.userId != null) {
          socket.current.emit("join_room", conversation.conversationId);

        }
      });

    }

    // Cleanup function to disconnect sockets when component unmounts
    return () => {
      socket?.current?.disconnect();
    };
  }, [isConversationListLoading, conversationList]);

  let content;
  if (isConversationListLoading)
    content = "Loading"
  else if (conversationList != null) {
    content = conversationList.map((conversedUser: ConversedUser) => {
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
              {content}
            </List>
          </div>
          <MessagePane selectUser={selectedUser} messages={messages} socket={socket} />
        </div>
      </Container>
    </>
  );
}
