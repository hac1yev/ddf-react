import React from "react";
import MediaItem from "./MediaItem";
import group45 from "../../img/group45.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../pages/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../assets/api/dataFetching";
import { newsSliceAction } from "../../store/news-slice";

const MediaNews = () => {  
  // Context API-dəki qlobal state-lər
  // const {newsData , lang} = useContext(GlobalContext)

  const lang = useSelector(state => state.langReducer.lang);
  const newsData = useSelector(state => state.newsReducer.mediaNewsItems);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(!lang ? `az/news` : `en/news`)
    .then(data => dispatch(newsSliceAction.getMediaNews(data.data.slice(-6))))
  }, [lang,dispatch]);


  return (
    <>
      <div className="media-header">
        <h3>{lang === 'az' ? 'Xəbərlər' : 'News'}</h3>
        <Link onClick={() => window.scrollTo(0,0)} to='/media/news'>
          <div className="media-header-more">
            <img src={group45} alt="group45" />
            {lang === 'az' ? 'Daha çox' : 'More'}
          </div>
        </Link>
      </div>
      {newsData.map((item) => (
        <MediaItem title={item.title} key={item.id} id={item.id} image={item.img} date={item.date} />
      ))}
    </>
  );
};

export default MediaNews;
