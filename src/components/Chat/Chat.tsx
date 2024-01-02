import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import "../../css/chat.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useGetConversationListQuery } from "../../store/apis/apiSlice";
import ConversationItem from "./ConversationItem";
import type { ConversedUser } from "../../types/Chat";
import MessagePane from "./MessagePane";
// import

export default function Chat() {
  const {
    data: conversationList,
    isLoading: isConversationListLoading,
    isError,
  } = useGetConversationListQuery({});
  const [selectedUser, setSelectedUser] = useState<ConversedUser>({
    userId: null,
    name: null
  })
  let content;
  if (isConversationListLoading)
    content = "Loading"
  else {
    console.log(conversationList[0])
    content = conversationList.map((conversedUser: ConversedUser) => {
      return <ConversationItem {...conversedUser} key={conversedUser.userId} />
    })
  }

  useEffect(() => {
    if (!isConversationListLoading && conversationList.length > 0) {
      setSelectedUser(conversationList[0]);
      // console.log(conversationList[0]);
    }
  }, [isConversationListLoading]);

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
          <MessagePane {...selectedUser} />
        </div>
      </Container>
    </>
  );
}
