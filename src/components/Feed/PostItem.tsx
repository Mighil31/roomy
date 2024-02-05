import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import WcIcon from "@mui/icons-material/Wc";
import { useNavigate } from "react-router-dom";
import { TipTap } from "../Editor/TipTap";
import type { Post, FeedItem } from "../../types/Post";
import { useDeletePostMutation } from "../../store/apis/apiSlice";
import { constants } from "../../constants/constants";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostItem(props: FeedItem) {
  const [expanded, setExpanded] = React.useState(false);
  let navigate = useNavigate();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  // console.log(props.userId)
  // console.log(props.userData.userId)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const routeChange = (type: string) => {
    if (type == "Connect")
      navigate(`/messaging/${props.userId}`);
    else if (type == "Edit")
      navigate(`/post/${props.postId}`)
    else {
      console.log(props.postId)
      deletePost(props.postId);
    }
  }

  const genderIcon = () => {
    // console.log(`GENDER = ${props.gender}`);
    let sx = {
      fontSize: "28px",
    };

    if (props?.gender == null) return <></>;

    if (props.gender == "male") return <ManIcon sx={sx} />;
    else if (props.gender == "female") return <WomanIcon sx={sx} />;
    return <WcIcon sx={sx} />;
  };

  let buttons = (
    <>
      <Button
        variant="contained"
        onClick={() => routeChange(props.userId !== props.userData?.userId ? "Connect" : "Edit")}
        style={{
          backgroundColor: constants.button_color,
        }}
      >
        {props.userId !== props.userData?.userId ? "Connect" : "Edit"}
      </Button>
      {props.type === "myposts" && (
        <Button
          variant="contained"
          onClick={() => routeChange("Delete")}
          style={{
            backgroundColor: constants.button_color,
            marginLeft: "10px"
          }}
        >
          Delete
        </Button>
      )}
    </>
  );

  return (
    <Card
      sx={{
        width: '90%',  // Default width for mobile view
        mb: '20px',
        pb: '15px',
        '@media (min-width: 900px)': {
          // Media query for screens wider than 600px (adjust the value as needed)
          width: '55%',  // Width for screens wider than 600px
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
            {props.name.charAt(0)}
          </Avatar>
        }
        action={buttons
        }
        title={props.name}
        subheader={
          props.postDate &&
          new Date(props?.postDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        }
      />
      <CardContent
        sx={{
          // margin: "0 30px 0px 0px",
          // border: "1px solid black",
          padding: 0,
          paddingLeft: "30px",
        }}
      >
        <TipTap content={props?.postBody ? props?.postBody : ""} setContent={null} editable={false} />
      </CardContent>

      <div className="post-info">
        <div className="post-info__row">
          <div className="post-info__item address_body">
            <div className="post-info__label address_label">Address</div>
            <div className="post-info__body post-info__address_display">
              <p>{props?.address1}</p>
              <p>{props?.address2}</p>
              <p>
                {props?.city + ", " + props.state + ", " + props.country}
              </p>
            </div>
          </div>
        </div>

        <div className="post-info__row">
          <div className="post-info__item">
            <div className="post-info__label">Preferred Gender</div>
            <div className="post-info__body">
              <div className="post-info__gender">{genderIcon()}</div>
            </div>
          </div>
          <div className="post-info__item">
            <div className="post-info__label">Number of roommates needed</div>
            <div className="post-info__body">
              <p className="post-info__roommates">
                {props?.noOfRoommates != null &&
                  props?.noOfFilledRoommates != null
                  ? props?.noOfRoommates - props?.noOfFilledRoommates
                  : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="post-info__row">
          <div className="post-info__item">
            <div className="post-info__label">House Size</div>
            <div className="post-info__body">
              <div className="newPost_size selected">
                {props != null && props.size}
              </div>
            </div>
          </div>
          <div className="post-info__item">
            <div className="post-info__label">Rent</div>
            <div className="post-info__body">
              <p className="post-info__roommates">
                {"₹ " + (props?.rent != null ? props?.rent : 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

    </Card>
  );
}
