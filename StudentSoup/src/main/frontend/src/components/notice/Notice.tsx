import React, { useEffect, useState } from 'react';
import Background from '../common/Background';
import MainNavbar from '../common/MainNavbar';
import Pagination from 'react-js-pagination';
import './notice.scss';
import axios from 'axios';
import Paginate from '../common/Paginate';
import PostSearch from '../common/PostSearch';
import Table from '../common/Table';

export interface NoticePostsDataType {
  authentication: string;
  boardCategory: string;
  boardId: number;
  likedCount: number;
  nickname: string;
  reviewCount: string;
  tag: string;
  title: string;
  view: number;
  writeDate: string;
}

export const Notice = () => {
  const [items, setItems] = useState<NoticePostsDataType[]>([]);
  const [count, setCount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(0);

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<NoticePostsDataType[]>([]);

  const handlePageChange = (e: any) => {
    setCurrentpage(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('/boards?category=ANNOUNCEMENT', {
        schoolId: '1',
        memberId: '3',
        category: 'ANNOUNCEMENT',
        sorted: 0,
      });
      setItems(response.data.boards.content);
      setPostPerPage(response.data.boards.pageable.pageSize);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, items, indexOfFirstPost, indexOfLastPost, postPerPage]);

  return (
    <>
      <MainNavbar />
      <Background>
        <div className="notice-container">
          <h1>공지사항</h1>
          <div className="notice-table-wrap">
            <Table headings={['title', 'writeDate']} data={currentPosts} />
          </div>
          <Paginate
            page={currentpage}
            count={count}
            setPage={handlePageChange}
            postPerPage={postPerPage}
          />
          <PostSearch />
        </div>
      </Background>
    </>
  );
};

export default Notice;
