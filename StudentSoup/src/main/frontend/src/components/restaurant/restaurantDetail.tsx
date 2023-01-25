/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import RestaurantNavbar from '../common/restaurantNavbar';
import { ReactComponent as Star } from '../../img/Star.svg';
import { ReactComponent as Share } from '../../img/Share.svg';
import { ReactComponent as Review } from '../../img/Review.svg';
import { ReactComponent as Location } from '../../img/location.svg';
import { ReactComponent as Phone } from '../../img/Phone.svg';
import { ReactComponent as Clock } from '../../img/Clock.svg';
import { ReactComponent as PlusCircle } from '../../img/pluscircle.svg';
import { ReactComponent as InfoHeart } from '../../img/InfoHeart.svg';
import MenuInfopage from './menuInfo';
import Reviewpage from './reviewInfo';
import Sharepage from './pictureInfo';
import cn from 'clsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ReactComponent as MoreInfo } from '../../img/moreicon.svg';
const kakao = (window as any).kakao;

const restaurant = () => {
  const saveMemberId = sessionStorage.getItem('memberId');
  const [menu, setMenu] = useState<any>([]);
  const [set, isSet] = useState<any>([]);
  const state = useLocation<any>();
  const [click, setClick] = useState<any>(1);
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [heart, isHeart] = useState<boolean>();
  const [clickHeart, isClickHeart] = useState<boolean>();
  const [size, setSize] = useState<number>(4);
  const [likedCount, setlikedCount] = useState<number>();

  const restaurantNumber = state.state[0];
  const schoolName = state.state[1];

  const clickPage = (e: any) => {
    setClick(e);
  };
  const url = `/restaurant/${restaurantNumber}`;
  useEffect(() => {
    axios
      .post(
        url,
        {
          schoolName,
          restaurantId: restaurantNumber,
          memberId: saveMemberId,
        },
        {
          params: {
            size,
          },
        },
      )
      .then(res => {
        setMenu(res.data.restaurantMenu);
        isSet(res.data.restaurant);
        setLatitude(Number(res.data.restaurant.latitude));
        setLongitude(Number(res.data.restaurant.longitude));
        isHeart(res.data.restaurant.like);
      })
      .catch(err => {
        console.error(err);
      });
  }, [size]);

  const MapLocation = [longitude, latitude];
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(...MapLocation),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
  });
  const handleHeartCount = async () => {
    if (!saveMemberId) {
      alert('로그인후 이용 가능한 기능입니다.');
    } else {
      await axios
        .post(`/restaurant/${saveMemberId}/like`, {
          restaurantId: restaurantNumber,
          memberId: saveMemberId,
        })
        .then(res => {
          setlikedCount(res.data.data.likedCount);
          isClickHeart(res.data.data.like);
        });
      isHeart(!heart);
      isClickHeart(!clickHeart);
    }
  };

  const infoClickButton = async () => {
    setSize(size + 4);
  };
  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && size > 5) {
      infoClickButton();
    }
  };
  /* 공유 버튼 보류 */
  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);

  //     alert('url 주소를 복사하였습니다.');
  //   } catch (error) {
  //     alert('url 주소가 생성되지 않았습니다.');
  //   }
  // };
  return (
    <>
      <RestaurantNavbar />
      <div className="w-[full] h-[535px] flex m-[49px] justify-center">
        <div className="w-[281px] h-[532px]  bg-[#FFFFFF] shadow-[0px_2px_10px_rgba(0,0,0,0.1)] rounded-[5px] mr-[14px]">
          <div id="map" className="w-[238px] h-[239px] m-[21px]"></div>
          <div className="ml-[22px] whitespace-normal h-[50px] font-bold text-[25px] leading-[40px] flex items-center">
            {set.name}
          </div>
          <div className="ml-[22px] h-[16px] font-[400] leading-[21px] text-[16px] flex items-center text-[#717171]">
            {set.tag}
          </div>
          <div className="flex flex-row">
            <Star className="ml-[22px] mt-[10px]" />
            <div className="ml-[5.92px] mt-[10px] h-[16px] font-bold text-[16px] leading-[23px] flex items-center text-[#515151]">
              {set.starLiked}
            </div>
            <div className="ml-[10px] mt-[10px] h-[16px] font-[400] text-[13px] leading-[17px] flex items-center text-[#9C9C9C]">
              {set.reviewCount}개의 리뷰
            </div>
          </div>
          <div className="ml-[22px] mr-[21px] mt-[23px] border-[1px] border-[#DEDEDE] bg-[#DEDEDE]"></div>
          <div className="flex flex-row w-[238px]">
            <div className="flex flex-col">
              {heart ? (
                <svg
                  className="ml-[47px] mt-[17px] mb-[12.26px]"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="#FF611D"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4222 2.0379C13.0933 1.70886 12.7028 1.44783 12.273 1.26975C11.8432 1.09166 11.3826 1 10.9173 1C10.4521 1 9.99142 1.09166 9.56163 1.26975C9.13183 1.44783 8.74134 1.70886 8.41245 2.0379L7.72988 2.72046L7.04732 2.0379C6.38298 1.37356 5.48195 1.00034 4.54244 1.00034C3.60292 1.00034 2.70189 1.37356 2.03756 2.0379C1.37322 2.70224 1 3.60327 1 4.54278C1 5.48229 1.37322 6.38333 2.03756 7.04766L2.72012 7.73023L7.72988 12.74L12.7396 7.73023L13.4222 7.04766C13.7513 6.71877 14.0123 6.32827 14.1904 5.89848C14.3684 5.46868 14.4601 5.00801 14.4601 4.54278C14.4601 4.07755 14.3684 3.61688 14.1904 3.18708C14.0123 2.75729 13.7513 2.36679 13.4222 2.0379Z"
                    stroke="#FF611D"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="ml-[47px] mt-[17px] mb-[12.26px]"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4222 2.0379C13.0933 1.70886 12.7028 1.44783 12.273 1.26975C11.8432 1.09166 11.3826 1 10.9173 1C10.4521 1 9.99142 1.09166 9.56163 1.26975C9.13183 1.44783 8.74134 1.70886 8.41245 2.0379L7.72988 2.72046L7.04732 2.0379C6.38298 1.37356 5.48195 1.00034 4.54244 1.00034C3.60292 1.00034 2.70189 1.37356 2.03756 2.0379C1.37322 2.70224 1 3.60327 1 4.54278C1 5.48229 1.37322 6.38333 2.03756 7.04766L2.72012 7.73023L7.72988 12.74L12.7396 7.73023L13.4222 7.04766C13.7513 6.71877 14.0123 6.32827 14.1904 5.89848C14.3684 5.46868 14.4601 5.00801 14.4601 4.54278C14.4601 4.07755 14.3684 3.61688 14.1904 3.18708C14.0123 2.75729 13.7513 2.36679 13.4222 2.0379Z"
                    stroke="#515151"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <div
                onClick={handleHeartCount}
                className="ml-[35px] w-[39px] h-[11px] font-[400] text-[13px] leading-[17px] flex items-center text-[#515151] cursor-pointer"
              >
                좋아요
              </div>
            </div>
            <div className="ml-[24px] mt-[17px] border-[1px] border-[#DEDEDE] rotate-[90] bg-[#DEDEDE]"></div>
            <div className="flex flex-col">
              <Share className="ml-[35px] mt-[18.24px]" />
              <div
                /* 공유 버튼 보류
                 // onClick={async () => {
                //   await handleCopyClipBoard(`http://localhost:3000${state.pathname}`);
                // }} */

                className="ml-[30px] w-[26px] mt-[9px] h-[11px] font-[400] text-[13px] leading-[17px] flex items-center"
              >
                공유
              </div>
            </div>
            <div className="ml-[32px] mt-[16px] border-[1px] border-[#DEDEDE] rotate-[90] bg-[#DEDEDE]"></div>
            <div className="flex flex-col">
              <Review className="ml-[30px] mt-[17px]" />
              <div className="ml-[25px] w-[26px] mt-[11px] h-[11px] font-[400] text-[13px] leading-[17px] flex items-center">
                리뷰
              </div>
            </div>
          </div>
          <div className="mt-[23px] ml-[22px] w-[238px] h-[38px] border-[0.7px] rounded-[5px] border-[#FF611D]">
            <div className="ml-[83px] mt-[13px] mb-[15px] w-[82px] h-[11px] font-[400] text-[13px] leading-[18px] flex items-center text-[#FF611D]">
              배달가능 업체
            </div>
          </div>
        </div>
        <div className="w-[744px] h-[563px] bg-[#FFFFFF] shadow-[0px_2px_10px_rgba(0,0,0,0.1)] rounded-[5px]">
          <div className="grid grid-row-2 grid-cols-[268px_minmax(214px,_0fr)_1px] gap-1 ml-[20px] mt-[20px]">
            <div className="row-span-2 w-[268px] h-[290px] bg-[#29088A]"></div>
            <div className="w-[214px] h-[143px] bg-[#31B404]"></div>
            <div className="w-[214px] h-[143px] bg-[#F8E0E0]"></div>
            <div className="w-[214px] h-[143px] bg-[#F5A9D0]"></div>
            <div className="w-[214px] h-[143px] bg-[rgba(23,23,23,0.55)]">
              <div className="ml-[55px] mt-[5.75px] font-[400] leading-[21px] flex items-center text-[#FEFEFE]"></div>
            </div>
          </div>
          <div className="ml-[21px] mt-[32px] font-[400] text-[24px] flex items-center">
            매장정보
          </div>
          <div className="flex flex-row">
            <Location className="ml-[21px] mt-[20.15px]" />
            <div className="ml-[10.33px] mt-[18px] h-[16px] font-[400] text-[16px] leading-[21px] flex items-center text-[#515151]">
              {set.address}
            </div>

            <div className="ml-[5px] mt-[17px] flex flex-row ">
              <div className=" h-[16px] font-[400] leading-[21px] flex items-center text-[#515151]">
                {set.schoolName}
              </div>
              <div className="ml-[5px] h-[16px] font-[400] leading-[21px] flex items-center text-[#7B7B7B]">
                에서
              </div>
              <div className="ml-[5px] h-[16px] font-[400] leading-[21px] flex items-center text-[#FF611D]">
                {set.distance}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <Phone className="ml-[21px] mt-[19px]" />
            <div className="ml-[9.61px] mt-[17px] h-[16px] font-[400] text-[16px] leading-[21px] flex items-center text-[#515151]">
              {set.tel}
            </div>
          </div>
          <div className="flex flex-row">
            <Clock className="ml-[21px] mt-[21px]" />
            <div className="ml-[8px] mt-[18px] h-[16px] font-[400] text-[16px] leading-[21px] flex items-center text-[#515151]">
              영업시간 AM {set.startTime}- PM {set.endTime}
            </div>
          </div>
          <div className="flex flex-row">
            <PlusCircle className="ml-[21px] mt-[20px]" />
            <div className="ml-[9px] mt-[17px] h-[16px] font-[400] text-[16px] leading-[21px] flex items-center text-[#515151]">
              {set.detail}
            </div>
          </div>
          <div className="flex flex-row">
            <InfoHeart className="ml-[21px] mt-[19px]" />
            <div className="ml-[8px] mt-[16px] h-[16px] font-[400] leading-[21px] flex items-center text-[#515151]">
              이 식당에 {clickHeart ? likedCount : set.likedCount}명의 좋아요한 사용자가 있습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[full] h-full flex justify-center">
        <div className="ml-[298px] w-[744px] h-full bg-[#FFFFFF] shadow-[0px_2px_10px_rgba(0,0,0,0.1)] rounded-[5px]">
          <div className="flex flex-row">
            <div
              onClick={() => {
                clickPage(1);
              }}
              className={cn(
                'ml-[86px] mt-[43px] h-[16px] text-[24px] leading-[34px] flex items-center cursor-pointer',
                {
                  'font-bold text-[#FF611D]': click === 1,
                  'font-[400] text-[#515151]': click !== 1,
                },
              )}
            >
              메뉴정보
            </div>
            <div
              onClick={() => {
                clickPage(2);
              }}
              className={cn(
                'ml-[160px] mt-[43px] h-[16px] text-[24px] leading-[34px] flex items-center cursor-pointer',
                {
                  'font-bold text-[#FF611D]': click === 2,
                  'font-[400] text-[#515151]': click !== 2,
                },
              )}
            >
              리뷰
            </div>
            <div
              onClick={() => {
                clickPage(3);
              }}
              className={cn(
                'ml-[181px] mt-[43px] h-[16px]  text-[24px] leading-[34px] flex items-center cursor-pointer',
                {
                  'font-bold text-[#FF611D]': click === 3,
                  'font-[400] text-[#515151]': click !== 3,
                },
              )}
            >
              사진
            </div>
          </div>
          <div className="flex flex-row">
            <div className="ml-[25px] mt-[25px] w-[687px] h-[2px] bg-[#BCBCBC] border-[1px] border-[#BCBCBC]">
              <div
                className={cn(
                  'm-[-1px] w-[229px] h-[2px] bg-[#FF611D] border-[1px] border-[#FF611D]',
                  { '': click === 1, 'ml-[229px]': click === 2, 'ml-[458px]': click === 3 },
                )}
              ></div>
            </div>
          </div>
          {click === 1 && <MenuInfopage {...menu} />}
          {click === 2 && <Reviewpage />}
          {click === 3 && <Sharepage />}
          {click === 1 && size <= menu.totalElements && menu.totalElements > 4 ? (
            <div
              onClick={infoClickButton}
              className="mt-[10px] mb-[50px] ml-[649px] font-[400] text-[16px] leading-[22px] flex items-center cursor-pointer"
            >
              더보기
              <div className="ml-[5px] w-[14px] h-[14px] rounded-full border border-[#FF611D] bg-[#FF611D]">
                <MoreInfo className="ml-[2.22px] mt-[3.5px]" />
              </div>
            </div>
          ) : (
            ''
          )}
          {click === 2 && (
            <div className="mt-[10px] mb-[50px] ml-[649px] font-[400] text-[16px] leading-[22px] flex items-center cursor-pointer">
              더보기
              <div className="ml-[5px] w-[14px] h-[14px] rounded-full border border-[#FF611D] bg-[#FF611D]">
                <MoreInfo className="ml-[2.22px] mt-[3.5px]" />
              </div>
            </div>
          )}
          {click === 3 && (
            <div className="mt-[10px] mb-[50px] ml-[649px] font-[400] text-[16px] leading-[22px] flex items-center cursor-pointer">
              더보기
              <div className="ml-[5px] w-[14px] h-[14px] rounded-full border border-[#FF611D] bg-[#FF611D]">
                <MoreInfo className="ml-[2.22px] mt-[3.5px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default restaurant;
