import ListItem from "@mui/material/ListItem";
import * as React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useGetLastMessageQuery } from "../../store/apis/apiSlice";
import type { ConversedUser } from "../../types/Chat";

interface ConversationItemProps {
  conversedUser: ConversedUser;
  selectedUser: ConversedUser;
  setSelectedUser: (arg: ConversedUser) => void;
  // lastMessage: string
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversedUser, setSelectedUser, selectedUser }) => {
  // console.log(JSON.stringify(conversedUser))
  const handleClick = (clickedUser: ConversedUser) => {
    // console.log(clickedUser)
    setSelectedUser(clickedUser)
  }

  const style = {
    '@media (max-width: 600px)': {
      display: "none"
    }
  }


  const
    { data: lastMessage,
      refetch: refetchLastMessage
    } = useGetLastMessageQuery(conversedUser.conversationId);
  // console.log(lastMessage)
  return (
    <div className={"listItemContainer" + (selectedUser.userId == conversedUser.userId ? " selectedUser" : "")} onClick={() => handleClick(conversedUser)}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`https://picsum.photos/id/${conversedUser.userId}/200/300`} />
        </ListItemAvatar>
        <ListItemText
          sx={style}
          primary={conversedUser.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {/* Ali Connors */}
              </Typography>
              {lastMessage?.length > 0 ? lastMessage[0].content : ""}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default ConversationItem
