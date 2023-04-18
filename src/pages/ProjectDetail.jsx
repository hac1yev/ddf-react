import React from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/css/ProjectDetail.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { minesSliceAction } from "../store/mines-slice";

const ProjectDetail = () => {
  // Context api-dəki qlobal state-lər
  // const { projectData,projectDetailIndex,setProjectDetailIndex , lang } = useContext(GlobalContext);

  const lang = useSelector(state => state.langReducer.lang);
  const projectData = useSelector(state => state.minesReducer.descriptions);
  const projectDetailData = useSelector(state => state.minesReducer.mineDetailItems);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  
  console.log(projectDetailData);

  // Yataqlar description

  // Yataqlardan birinə kliklənən zaman uyğun itemin indexsini contex APİ-ə göndərir
  const handleClick = (index) => {
    // window.scroll(0,0);
    // window.localStorage.setItem('indexOfProject', index);
    // setProjectDetailIndex(index);
  };

  useEffect(() => {
    fetchData(`${lang}/projects`)
    .then((data) => dispatch(minesSliceAction.getAllMinesDetail({
      data: data.data.desciriptions,
      id: projectId,
    })));
  }, [lang,dispatch,projectId]);

  // Karusel konfiqurizasiyası
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }, 
    ]
  };

  return (
    <>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Yataqlar' : 'Mines'} />
        </div>
      </div>
      <div className="project-detail">
        <div className="container project-detail-container">
          <div className="row project-detail-heading">
            <div className="col-lg-6 pe-0">
              <nav>
                <ul className="project-detail-heading-link">
                  <Link to={"/"}>{lang === 'az' ? 'Ana Səhifə' : 'Main Page'}</Link>
                  <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#8725;</span>
                  <Link to={"/mines"}>{lang === 'az' ? 'Yataqlar' : 'Mines'}</Link>
                  <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#8725;</span>
                  <li dangerouslySetInnerHTML={{ __html: projectDetailData.title }}></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-6 px-0">
              <h2 
                style={{ fontSize: "32px", textAlign: 'end' }}
                data-aos="flip-left"
                data-aos-duration="1000"
                dangerouslySetInnerHTML={{ __html: projectDetailData.title }}
              >
              </h2>
            </div>
            <div className="col-lg-12 project-detail-description">
              <div
                data-aos="fade-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                dangerouslySetInnerHTML={{ __html: projectDetailData.description }}
              > 
              </div>
            </div>
          </div>
          <h2 
            style={{ 
              color: '#fff',
              fontSize: '36px',
              width: '50%',
              margin: '0',
              marginTop: '28px',
              marginBottom: '47px'
             }}
          >
            {lang === 'az' ? 'Digər Yataqlar' : 'Other Mines'}
          </h2>
          <Slider 
            className="layihe-slider" 
            {...settings}
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
          >
             {projectData.map((items,index) => 
                <Link 
                  to={`/mines/${items.id}`}
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="500"  
                  onClick={handleClick.bind(null,index)}
                >
                  <div style={{ width: '100%' }}>
                    <p className="slider-description">{items.title}</p>
                    <div className="slick-slider-image">
                      <img className="slider-img-2" src={items.img} alt="dd" />
                    </div>
                  </div>
                </Link>
             )}  
          </Slider>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
