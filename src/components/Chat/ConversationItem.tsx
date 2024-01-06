import ListItem from "@mui/material/ListItem";
import * as React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useGetUserQuery } from "../../store/apis/apiSlice";
import type { ConversedUser } from "../../types/Chat";

const ConversationItem: React.FC<{ conversedUser: ConversedUser; setSelectedUser: (user: ConversedUser) => void }> = ({ conversedUser, setSelectedUser }) => {
  // console.log(name)
  const handleClick = (clickedUser: ConversedUser) => {
    // console.log(clickedUser)
    setSelectedUser(clickedUser)
  }
  return (
    <div className="listItemContainer" onClick={() => handleClick(conversedUser)}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={conversedUser.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default ConversationItem
