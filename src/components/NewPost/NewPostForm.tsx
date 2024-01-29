import React, { useState, useEffect, useRef } from "react";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import WcIcon from "@mui/icons-material/Wc";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Error from "../Error/Error";
import Container from "@mui/material/Container";
import "../../css/newPost.scss";
import axiosConfig from "../Utils/axiosConfig";
import { constants } from "../../constants/constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNewPostMutation, useUpdatePostMutation } from "../../store/apis/apiSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import { TipTap } from "../Editor/TipTap";
import { useGetPostByIdQuery } from "../../store/apis/apiSlice";
import { useParams } from "react-router-dom";

interface NewPostFormProps {
  error: number,
  postId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<number>>;
}

export default function NewPostForm({ error, postId, setError }: NewPostFormProps) {
  const {
    data: postData,
    isLoading: isPostDataLoading,
    isError,
  } = useGetPostByIdQuery(postId)
  const [gender, setGender] = useState("male");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [noOfRoommates, setNoOfRoommates] = useState(1);
  const [size, setSize] = useState("1bhk");
  const [houseType, setHouseType] = useState("Flat");
  const [rent, setRent] = useState("Flat");
  const [postBody, setPostBody] = useState<string>("");
  const [tipTapKey, setTipTapKey] = useState(0);
  // const [error, setError] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (postId != null && postData && postData.length > 0) {
      const post = postData[0];
      // console.log(post)
      setGender(post.gender);
      setAddress1(post.address1 || "");
      setAddress2(post.address2 || "");
      setCity(post.city || "");
      setState(post.state || "");
      setCountry(post.country || "");
      setPincode(post.pincode || "");
      setNoOfRoommates(post.noOfRoommates || 1);
      setSize(post.size || "1bhk");
      setHouseType(post.houseType || "Flat");
      setRent(post.rent || "");
      setPostBody(post.postBody || "");
      setTipTapKey((prevKey) => prevKey + 1);
    }
    else if (postId != null) {
      setError(400)
    }
  }, [postData, isPostDataLoading]);


  const sizes = constants.sizesList.map((item) => (
    <div
      className={size === item.value ? "newPost_size selected" : "newPost_size"}
      onClick={() => handleInput(setSize, item.value)}
      key={item.value}
    >
      {item.type}
    </div>
  ));

  const houseTypes = constants.houseList.map((item) => (
    <div
      className={houseType === item ? "newPost_size selected" : "newPost_size"}
      onClick={() => handleHouseType(item)}
    >
      {item}
    </div>
  ));

  const handleGender = (gender: string) => {
    setGender(gender);
  };

  const handleSize = (size: string) => {
    setSize(size);
  };

  const handleHouseType = (houseType: string) => {
    setHouseType(houseType);
  };

  const handleNoOfRoommates = (sign: String) => {
    if (sign == "-") {
      if (noOfRoommates > 1)
        setNoOfRoommates((prevNoOfRoommates) => prevNoOfRoommates - 1);
    } else if (noOfRoommates < 5)
      setNoOfRoommates((prevNoOfRoommates) => prevNoOfRoommates + 1);
  };

  const handleInput = (setValue: Function, value: String) => {
    setValue(value);
  };

  const [addPost, { isLoading }] = useNewPostMutation();
  const [updatePost, { isLoading: isUpdatePostLoading }] = useUpdatePostMutation();

  const onSubmit = async () => {
    const postSubmitData = {
      gender,
      noOfRoommates,
      address1,
      address2,
      city,
      state,
      pincode,
      country,
      size,
      rent,
      postBody,
      "noOfFilledRoommates": 0
    };
    console.log(postData);
    try {
      let res;
      if (postId != null && postData && postData.length > 0) {
        console.log(postSubmitData)
        res = await updatePost({ postId, postSubmitData })
      } else {
        res = await addPost(postSubmitData).unwrap();
      }
      console.log(res)
      if (res.error?.data.length > 0) {
        setError(500);
      } else
        navigate("/");
    } catch (error) {
      console.log("ERRROR")
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: constants.bg_color,
          pt: "2em",
          // border: "1px solid red",
          minHeight: "95vh",
          // display: "flex",
        }}
        maxWidth={false}
        disableGutters
      >
        <div className="newPost_header">
          <h1>Find a roomie</h1>
        </div>
        <div className="newPost_form">
          {/* <FormControl sx={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-label">
              Room mate gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="gender"
              onChange={handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Either"}>Either</MenuItem>
            </Select>
          </FormControl> */}
          <div className="newPost_row">
            <div className="newPost_col">
              <div className="newPost_label">
                <p>Select Your Roommate Preference</p>
              </div>
              <div className="newPost_input">
                <div
                  className={
                    gender === "female"
                      ? "gender_icon selected_gender"
                      : "gender_icon"
                  }
                  onClick={() => handleGender("female")}
                >
                  <WomanIcon fontSize="large" />
                </div>
                <div
                  className={
                    gender === "male"
                      ? "gender_icon selected_gender"
                      : "gender_icon"
                  }
                  onClick={() => handleGender("male")}
                >
                  <ManIcon fontSize="large" />
                </div>
                <div
                  className={
                    gender === "any"
                      ? "gender_icon selected_gender"
                      : "gender_icon"
                  }
                  onClick={() => handleGender("any")}
                >
                  <WcIcon fontSize="large" />
                </div>
              </div>
            </div>
            <div className="newPost_col">
              <div className="newPost_label">
                <p>Number of roommates required</p>
              </div>
              <div className="newPost_input">
                <div className="input-number">
                  <button
                    type="button"
                    onClick={() => handleNoOfRoommates("-")}
                  >
                    &minus;
                  </button>
                  <span>{noOfRoommates}</span>
                  <button
                    type="button"
                    onClick={() => handleNoOfRoommates("+")}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="newPost_row">
            <div className="newPost_address">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    value={address1}
                    onChange={(e) => handleInput(setAddress1, e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    value={address2}
                    onChange={(e) => handleInput(setAddress2, e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    value={city}
                    onChange={(e) => handleInput(setCity, e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    value={state}
                    onChange={(e) => handleInput(setState, e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    value={pincode}
                    onChange={(e) => handleInput(setPincode, e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    value={country}
                    onChange={(e) => handleInput(setCountry, e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="newPost_row">
            <div className="newPost_col">
              <div className="newPost_label">
                <p>House Size</p>
              </div>
              <div className="newPost_input">{sizes}</div>
            </div>
            <div className="newPost_col">
              <div className="newPost_label">
                <p>Rent</p>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={12}>
                  <TextField
                    required
                    id="rent"
                    name="rent"
                    label="rent"
                    fullWidth
                    type="number"
                    autoComplete="shipping address-level2"
                    value={rent}
                    onChange={(e) => handleInput(setRent, e.target.value)}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          <div className="newPost_markdown">
            <div className="newPost_label">
              <p>Enter body of post</p>
            </div>
            <div className="newPost_editor">
              {/* <CKEditor
                editor={ClassicEditor}
                data=""
                // onReady={(editor) => {
                //   // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor);
                // }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPostBody(editor.getData());
                }}
              // onBlur={(event, editor) => {
              //   // console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
              /> */}
              <TipTap key={tipTapKey} content={postBody} editable={true} setContent={setPostBody} />
            </div>
          </div>
          <div className="newPost_submit">
            <Button
              variant="contained"
              onClick={() => onSubmit()}
              style={{
                backgroundColor: "#b197fc",
              }}
            >
              {postData?.length > 0 ? "Edit Post" : "Create Post"}
            </Button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
