import React from 'react';
import './postsearch.scss';

const PostSearch = () => {
  return (
    <>
      <div className="search-container">
        <select>
          <option>전체</option>
        </select>
        <input type="text" placeholder="글 제목, 내용, 해시태그를 적어주세요"></input>
        <button className="search-button">검색</button>
      </div>
    </>
  );
};

export default PostSearch;
