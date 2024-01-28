import { logOut } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function PlainNavbar() {
  const dispatch = useDispatch();

  const handleLogout = (e: any) => {
    e.preventDefault()
    dispatch(logOut())
  };

  return (

    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title" >
          <a href="/">Roomy</a>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        {/* <a href="//github.io/jo_geek" target="_blank">Github</a> */}
        {/* <a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a> */}
        {/* <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a> */}
        {/* <a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a> */}
        <a href="/myposts">My Posts</a>
        <a onClick={(e) => handleLogout(e)}>Logout</a>

      </div>
    </div>
  )
}