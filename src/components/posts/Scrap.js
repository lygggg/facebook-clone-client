import React from 'react';
import profile from '../../profile.jpeg';

function Scrap({
  postState,
  currentUserState,
  p,
  index,
}) {
  const { scrap } = postState;
  const { id } = currentUserState;

  return (
    <>
      <br />
      <div>
        <div key={`Scrap${index}`}>
          <div className="scrap-border">
            <div className="scrap-feed">
              {p.whoDid} 님이 공유하였습니다.
            </div>
            <div className="scrap">
              <div className="post-feed">
                {p.name} 님이 게시글을 업로드했습니다.
              </div>
              <div className="post-main">
                <div className="post-writer">
                  <img className="image" src={p.profile} alt="" width="7%" />
                  <span
                    className="post-name"
                    type="button"
                  >
                    {p.name}
                  </span>
                </div>
                <br />
                <div className="post-contents">{p.contents}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scrap;
