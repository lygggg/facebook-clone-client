import advertising1 from "../advertising.png";
import advertising2 from "../advertising2.png";
import React from "react";

function Advertisement() {
  return (
    <div className="advertising">
      <div className="advertising-sponsored">Sponsored</div>
      <a className="advertising-1" href="https://woogod.netlify.com/">
        <img className="advertising1-image" src={advertising1} />
        <div className="advertising-url">
          programmer.co.kr
        </div>
        <div className="advertising-statement">
          리액트 핵 선배들이 알려주는 실무 꿀팁 가득한 스터디!
        </div>
      </a>
      <a className="advertising-2" href="https://woogod.netlify.com/">
        <img className="advertising2-image" src={advertising2} />
        <div className="advertising-url">
          programmer.co.kr
        </div>
        <div className="advertising-statement">
          2020 Dev Match
        </div>
      </a>
    </div>
  );
}

export default Advertisement;
