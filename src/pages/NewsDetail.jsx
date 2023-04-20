import React, { useEffect, useState } from 'react'
import '../assets/css/News-Detail.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../assets/api/dataFetching';
import { useDispatch, useSelector } from 'react-redux';
import { newsSliceAction } from '../store/news-slice';

const NewsDetail = () => {
  // Uyğun vakansiyanın İD-si 
  const {newsId} = useParams();
  const newsDetailData = useSelector(state => state.newsReducer.newsDetailItems);

  const dispatch = useDispatch();

  console.log(newsDetailData)

  // State
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [otherNews,setOtherNews] = useState([]);

  // Context api-dəki qlobal state-lər
  const lang = useSelector(state => state.langReducer.lang);

  // Ümumi Xəbərlər içində seçilmiş xəbərin İD-sinə görə tapılması

  const slidesData = [];

  // Slider şəkillərinin slidesData boş array-nə yığılması
  for(let i=0; i<newsDetailData.imgs.length; i++) {
    if(newsDetailData.imgs[i] !== null){
      slidesData.push({
        id: i+1,
        image: newsDetailData.imgs[i]
      })
    }
  }

  console.log(slidesData);

  useEffect(() => {
    fetchData(!lang ? `az/news` : `en/news`)
    .then(data => dispatch(newsSliceAction.getNewsDetailItems({
      data: data.data,
      id: newsId,
    })))
  }, [newsId,lang,dispatch]);
  console.log(newsDetailData.imgs.length)

  // Son 3 xəbərin get request zamanı əldə edilməsi 
  useEffect(() => {
    fetchData(!lang ? `az/news/lastThree` : `en/news/lastThree`)
    .then(data => setOtherNews(data.data))

    setNav1(slider1);
    setNav2(slider2);
  },[slider1,slider2,lang]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: newsDetailData.imgs.length > 4 ? 4 : newsDetailData.imgs.length - 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: newsDetailData.imgs.length > 3 ? 3 : newsDetailData.imgs.length - 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: newsDetailData.imgs.length > 2 ? 2 : newsDetailData.imgs.length - 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 3
          }
        }
      ]
  };

  
  return (
    <div className='newss'>
      <div className='heading-all'>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Xəbərlər' : 'News'} />
        </div>
      </div>
      <div className='container newss-container'>
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className='news-h1'>{newsDetailData.title}</h1>
            <span className='news-time'>{newsDetailData.date}</span>
            <div className='news-details'>
              <div className='news-detail' dangerouslySetInnerHTML={{__html: newsDetailData.description}}></div>
            </div>
          </div>
          <div className='col-lg-12'>
            {/* <!-- Carousel Start --> */}
            <div className="slider-wrapper">

              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={slider => (setSlider1(slider))}
              >

                {slidesData.map((slide) =>
                  <div className="slick-slide" key={slide.id}>
                    <img className="slick-slide-image main-image" src={slide.image} alt="news detail" />
                  </div>
                )}

              </Slider>
              <div className="thumbnail-slider-wrap">
                <Slider
                  {...settingsThumbs}
                  asNavFor={nav1}
                  ref={slider => (setSlider2(slider))}
                  className='news-detail-slick-wrapper'
                  >
                  {slidesData.map((slide) =>
                    <div className="slick-slide" key={slide.id}>
                      <img className="slick-slide-image thumnail-image" src={slide.image} alt="news detail" />
                    </div>
                  )}

                </Slider>
              </div>
            </div>
            {/* <!-- Carousel Close --> */}
          </div>
          <div className='other-news'>
            <h1>{lang === 'az' ? 'Digər xəbərlər' : 'Other News'}</h1>
            <div className='row news-row'>
              {otherNews.map((item) => (
                <Link to={`/media/news/${item.id}`} onClick={() => window.scrollTo(0,0)} className="col-lg-4 col-md-6 news-item-column" key={item.id}>
                  <div className="media-item" >
                    <div className="media-image">
                      <img src={item.img} alt="news detail"/>
                      <div className="media-image-text">{item.date}</div>
                    </div>
                    <p className='news-detail'>
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default NewsDetail