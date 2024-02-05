import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import "../../css/chat.scss";
import List from "@mui/material/List";
import Loading from "../Utils/Loading";
import {
  useGetConversationListQuery,
  useGetMessagesQuery,
  useGetUserQuery,
  useCreateConversationMutation,
  apiSlice
} from "../../store/apis/apiSlice";
import ConversationItem from "./ConversationItem";
import type { ConversedUser, Message } from "../../types/Chat";
import MessagePane from "./MessagePane";
import io from 'socket.io-client';
import { Socket } from "socket.io-client";
import CustomContainer from "../Utils/CustomContainer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Chat() {

  const socket = useRef() as React.MutableRefObject<Socket>;
  const params = useParams();
  const dispatch = useDispatch();

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
    window.scrollTo(0, 0);
    socket.current = io('http://3.6.226.148/', {
      path: "/socket"
    });
    console.log('check 1', socket.current.connected);
    socket.current.on('connect', function () {
      console.log('check 2', socket.current.connected);
    });
    socket.current.on("connect_error", (error) => {
      console.log('socket connection error:', error.message) // socket connection error: server error
    });
    socket?.current.on("receive_message", (data) => {
      refetch();
      dispatch(apiSlice.util.invalidateTags(["LastMessage"]))
    });

    // return () => {
    //   socket.current.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (!isConversationListLoading && conversationList != null && conversationList.length > 0) {
      setSelectedUser(conversationList[0]);
    }
    let conversationFound = false
    if (conversationList != null) {
      conversationList.forEach((conversation: ConversedUser) => {
        if (conversation.userId != null) {
          // console.log("Joining")
          socket.current.emit("join_room", conversation.conversationId);
        }
        if (String(conversation.userId) == params?.userId) {
          conversationFound = true;
          setSelectedUser(conversation)
        }
      });
    }
    if (!conversationFound && params.userId != null) {
      createConversation({ "user2_id": params.userId })
    }

  }, [conversationList, isUserLoading]);

  let conversationItems;
  if (isConversationListLoading)
    conversationItems = <Loading />
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
    <CustomContainer>
      <div className="chatPane">
        <div className="contactNames">
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {conversationItems}
          </List>
        </div>
        <MessagePane selectUser={selectedUser} messages={messages} socket={socket} />
      </div>
    </CustomContainer>
  );
}


