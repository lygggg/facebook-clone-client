import advertising2 from "../files/blackmetal.jpeg";
import advertising1 from "../files/newyorktimes.jpeg";
import React from "react";

function Advertisement() {
  return (
    <div className="advertising">
      <div className="advertising-sponsored">Sponsored</div>
      <a className="advertising-1" href="https://woogod.netlify.app/">
        <img className="advertising1-image" src={advertising1} alt="광고"/>
        <div className="advertising-url">newyorktimes.com</div>
        <div className="advertising-statement">The New York Times - Breaking News, World News, Carrying News</div>
      </a>
      <a className="advertising-2" href="https://woogod.netlify.app/">
        <img className="advertising2-image" src={advertising2} alt="광고"/>
        <div className="advertising-url">archbootique.com</div>
        <div className="advertising-statement">2020 Job Seminar</div>
      </a>
    </div>
  );
}

export default Advertisement;
