import type { ConversedUser, Message } from "../../types/Chat"
import { useGetUserQuery, useCreateMessageMutation } from "../../store/apis/apiSlice";
import io from 'socket.io-client';
import React, { useState, useMemo, useRef, useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { RefObject, MutableRefObject } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { List, ListItem } from "@mui/material";

interface MessagePaneProps {
  selectUser: ConversedUser;
  messages: Message[];
  socket: MutableRefObject<Socket> | null;
  // socket: Socket;
}

const MessagePane: React.FC<MessagePaneProps> = ({ selectUser, messages, socket }) => {
  // console.log(messages)
  const [messageInput, setMessageInput] = useState('');
  const [createMessage, results] = useCreateMessageMutation();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const sendMessage = async () => {
    const room = selectUser.conversationId;
    const message = messageInput;
    setMessageInput('')

    if (message.trim() !== '') {
      console.log("Message send")
      // socket?.current?.emit("send_message", { room, message });
      socket?.current.emit("send_message", { room, message });
      let body = {
        "conversationId": selectUser.conversationId,
        "message": message
      }
      let res = await createMessage(body);
      if ('data' in res) {
        console.log(res?.data[0]);
        // messages.push(res?.data[0])

      }
    }
    setMessageInput('')
  };

  // let curUserMessages=[{}], otherUserMessages=[{}];
  const {
    data: loggedInUser,
    isLoading: isUserLoading,
    isError,
  } = useGetUserQuery({});

  let content;
  let curDate: string;

  if (messages == null || messages.length == 0 || isUserLoading)
    content = <div></div>
  else {
    content = messages.map((message) => {
      let messageDate = new Date(message.sent_at ? message.sent_at : "").toLocaleDateString();
      let showDate = false;
      if (messageDate !== curDate) {
        showDate = true;
        curDate = messageDate;
      }

      if (message.senderId === loggedInUser.userId) {
        return (
          <div key={message.messageId}>
            {showDate && <div className="time">{messageDate}</div>}
            <div className="message parker">
              {message.content}
            </div>
          </div>
        );
      } else {
        return (
          <div key={message.messageId}>
            {showDate && <div className="time">{messageDate}</div>}
            <div className="message stark">
              {message.content}
            </div>
          </div>

        );
      }
    });
    // socket?.current.on("receive_message", (data) => {
    //   // console.log(`Received message for user ${conversation.userId}:`, data);
    //   // Handle the received message in your React component
    //   console.log(data)
    // });


  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className="messagesPane">
      <div className="chat">
        <div className="contact bar">
          <div className="pic">
            <img src={`https://picsum.photos/id/${selectUser.userId}/75`} />
            {/* <ListItemAvatar
              sx={{
                width: "4rem",
                height: "4rem"
              }}
            >
              <Avatar alt="Remy Sharp" src={`https://picsum.photos/id/${selectUser.userId}/400`} />
            </ListItemAvatar> */}
          </div>
          <div className="name">{selectUser.name}</div>
        </div>
        <div className="messages" id="chat">
          {/* <div className="message parker">
            Hey, man! What's up, Mr Stark? 👋
          </div>
          <div className="message stark">Kid, where'd you come from?</div>
          <div className="message parker">Field trip! 🤣</div> */}
          {content}
          <div ref={messagesEndRef} />

        </div>
        <div className="input">
          <i className="fas fa-camera"></i>
          <i className="far fa-laugh-beam"></i>
          <input
            placeholder="Type your message here!"
            type="text"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyDown={(e) => { if (e.key == 'Enter') sendMessage() }}
          />
          <i className="fas fa-microphone"></i>
        </div>
      </div>
    </div>
  )
}

export default MessagePane;