/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import profile from '../../profile.jpeg';

function Scrap({
  postState,
  currentUserState,
}) {
  const { scrap } = postState;
  const { id } = currentUserState;

  return (
    <>
      <br />
      <div>
        {scrap.filter((v) => v.id === id).map((p, index) =>
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
                      <img className="image" src={profile} alt="" width="7%" />
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
          </div>)}
      </div>
    </>
  );
}

export default Scrap;
