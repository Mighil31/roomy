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
  const { data: messages, isLoading: isMessagesLoading, isFetching: isMessagesFetching, isError: isMessagesError, refetch } = useGetMessagesQuery(selectedUser.conversationId);

  useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket?.current.on("receive_message", (data) => {

      refetch();
      // messages.append(data.data[0])
    });
    console.log("HELLLLLLLLLLLLLLLLLLLL")
    // return () => {
    //   socket.current.disconnect();
    // };
  }, []);

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


