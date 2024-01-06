import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import "../../css/chat.scss";
import List from "@mui/material/List";
import { useGetConversationListQuery, useGetMessagesQuery } from "../../store/apis/apiSlice";
import ConversationItem from "./ConversationItem";
import type { ConversedUser, Message } from "../../types/Chat";
import MessagePane from "./MessagePane";
// import

export default function Chat() {
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
    }
  }, [isConversationListLoading, conversationList]);

  let content;
  if (isConversationListLoading)
    content = "Loading"
  else if (conversationList != null) {
    content = conversationList.map((conversedUser: ConversedUser) => {
      return <ConversationItem conversedUser={conversedUser} key={conversedUser.userId} setSelectedUser={setSelectedUser} />
    })
  }

  // console.log(messages)

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
          <MessagePane selectUser={selectedUser} messages={messages} />
        </div>
      </Container>
    </>
  );
}
