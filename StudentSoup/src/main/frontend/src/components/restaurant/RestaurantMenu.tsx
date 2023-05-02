import { useEffect, useState } from 'react';
import './restaurantMenu.scss';
import under_arrow from '../../img/under_arrow.svg';
import up_arrow from '../../img/up_arrow.svg';
import Circle_human from '../../img/circle_human.png';
import { DesktopHeader, Mobile, MobileHeader } from '../../mediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantHeartInfo from './RestaurantHeartInfo';

interface Props {
  memberId: number | undefined;
}

const RestaurantMenu = ({ memberId }: Props) => {
  const [clickMenu1, setClickMenu1] = useState<boolean>(true);
  const [clickMenu2, setClickMenu2] = useState<boolean>(false);
  const [clickMenu3, setClickMenu3] = useState<boolean>(false);

  const state = useLocation();
  const restaurantId = state.state.value1;
  const [size, setSize] = useState<number>(4);
  const [menuList, setMenuList] = useState<any>();
  const url = `/restaurant/${restaurantId}/menus`;

  useEffect(() => {
    axios
      .post(
        url,
        {
          restaurantId,
          memberId,
        },
        {
          params: {
            size,
          },
        },
      )
      .then(res => {
        setMenuList(res.data.content);
        setSize(res.data.totalElements);
      })
      .catch(err => {
        console.error(err);
      });
  }, [size]);

  const handleImgError = (e: any) => {
    e.target.src = Circle_human;
  };

  const restaurantHeart = {
    memberId,
    restaurantId,
  };

  return (
    <>
      <DesktopHeader>
        <div className="restaurant-detail-bottom-dropdown-menus">
          <div
            className="restaurant-detail-bottom-dropdown"
            onClick={() => {
              setClickMenu1(!clickMenu1);
            }}
          >
            <span>주 메뉴</span>
            {clickMenu1 ? (
              <img src={under_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu1 && (
            <div className="restaurant-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '주메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-detail-bottom-menu"
                    >
                      <div
                        className="restaurant-detail-bottom-menu-img-div"
                        id={menu.restaurantMenuId}
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu2(!clickMenu2);
            }}
          >
            <span>사이드 메뉴</span>
            {clickMenu2 ? (
              <img src={under_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu2 && (
            <div className="restaurant-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '사이드메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu3(!clickMenu3);
            }}
          >
            <span>음료 및 주류</span>
            {clickMenu3 ? (
              <img src={under_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu3 && (
            <div className="restaurant-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '음료 및 주류' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </DesktopHeader>
      <MobileHeader>
        <div className="restaurant-tablet-detail-bottom-dropdown-menus">
          <div
            className="restaurant-tablet-detail-bottom-dropdown"
            onClick={() => {
              setClickMenu1(!clickMenu1);
            }}
          >
            <span>주 메뉴</span>
            {clickMenu1 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-tablet-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-tablet-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu1 && (
            <div className="restaurant-tablet-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '주메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-tablet-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-tablet-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-tablet-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-tablet-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-tablet-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-tablet-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-tablet-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu2(!clickMenu2);
            }}
          >
            <span>사이드 메뉴</span>
            {clickMenu2 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-tablet-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-tablet-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu2 && (
            <div className="restaurant-tablet-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '사이드메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-tablet-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-tablet-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-tablet-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-tablet-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-tablet-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-tablet-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-tablet-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu3(!clickMenu3);
            }}
          >
            <span>음료 및 주류</span>
            {clickMenu3 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-tablet-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-tablet-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu3 && (
            <div className="restaurant-tablet-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '음료 및 주류' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-tablet-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-tablet-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-tablet-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-tablet-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-tablet-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-tablet-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </MobileHeader>
      <Mobile>
        <div className="restaurant-mobile-detail-bottom-dropdown-menus">
          <div
            className="restaurant-mobile-detail-bottom-dropdown"
            onClick={() => {
              setClickMenu1(!clickMenu1);
            }}
          >
            <span>주 메뉴</span>
            {clickMenu1 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-mobile-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-mobile-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu1 && (
            <div className="restaurant-mobile-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '주메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-mobile-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-mobile-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-mobile-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-mobile-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-mobile-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-mobile-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-mobile-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu2(!clickMenu2);
            }}
          >
            <span>사이드 메뉴</span>
            {clickMenu2 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-mobile-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-mobile-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu2 && (
            <div className="restaurant-mobile-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '사이드메뉴' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-mobile-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-mobile-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-mobile-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-mobile-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-mobile-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-mobile-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          <div
            className="restaurant-mobile-detail-bottom-next-dropdown"
            onClick={() => {
              setClickMenu3(!clickMenu3);
            }}
          >
            <span>음료 및 주류</span>
            {clickMenu3 ? (
              <img
                src={under_arrow}
                alt=""
                className="restaurant-mobile-detail-bottom-dropdown-svg"
              />
            ) : (
              <img src={up_arrow} alt="" className="restaurant-mobile-detail-bottom-dropdown-svg" />
            )}
          </div>
          {clickMenu3 && (
            <div className="restaurant-mobile-detail-bottom-menu-list">
              {menuList?.map((menu: any) => (
                <>
                  {menu.restaurantMenuCategory === '음료 및 주류' && (
                    <div
                      key={menu.restaurantMenuId}
                      id={menu.restaurantMenuId}
                      className="restaurant-mobile-detail-bottom-menu"
                    >
                      <div
                        id={menu.restaurantMenuId}
                        className="restaurant-mobile-detail-bottom-menu-img-div"
                      >
                        <img
                          src={`/image/${menu.fileName}`}
                          key={menu.fileName}
                          onError={handleImgError}
                          alt=""
                          className="restaurant-mobile-detail-bottom-menu-img"
                        />
                        <RestaurantHeartInfo {...restaurantHeart} menu={menu} />
                      </div>
                      <div className="restaurant-mobile-detail-bottom-menu-text-div">
                        <div>
                          <p className="restaurant-mobile-menu-name">{menu.restaurantMenuName}</p>
                        </div>
                        <p className="restaurant-mobile-menu-price">{menu.cost}원</p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </Mobile>
    </>
  );
};

export default RestaurantMenu;
