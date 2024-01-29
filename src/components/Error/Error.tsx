import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "../../css/error.scss"
import { constants } from "../../constants/constants";

interface ErrorProps {
  status: number;

}

function Error({ status }: ErrorProps) {

  let message = (status && status in constants.errorMessages) ? constants.errorMessages[status][1] : "Something went wrong."

  return (
    <section className="page_404">
      <div className="error-container">
        <div className='error-image'>
          {/* {status && <p>{status}</p>} */}
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
        </div>
        {/* <div className="col-sm-10 col-sm-offset-1  text-center">
          {status && <div className="four_zero_four_bg">
            <h1 className="text-center ">{status}</h1>
          </div>}
          <div className="contant_box_404">
            <h3 className="h2">
              {constants.errorMessages[status][0]}
            </h3> */}

        <p>{message}</p>

        <a href="/" className="link_404">Go to Home</a>
      </div>
      {/* </div> */}
      {/* </div > */}
    </section >
  )
}

export default Error