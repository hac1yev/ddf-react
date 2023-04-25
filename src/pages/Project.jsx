import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/css/Yataqlar.css";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { minesSliceAction } from "../store/mines-slice";

const Project = () => {
  const main_title = useSelector(state => state.minesReducer.main_title);
  const descriptions = useSelector(state => state.minesReducer.descriptions);

  // Context api-dəki qlobal state-lər
  // const {projectData,setProjectDetailIndex,lang} = useContext(GlobalContext)
  const lang = useSelector(state => state.langReducer.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    // window.localStorage.setItem('newsData', JSON.stringify(newsData));
    fetchData(!lang ? `az/projects` : `en/projects`)
    .then(data => dispatch(minesSliceAction.getAllMines(data.data)));
}, [lang,dispatch]);


  // Yataqlar description
  // const description = projectData.desciriptions;

  // Yataqlardan birinə kliklənən zaman uyğun itemin indexsini contex APİ-ə göndərir
  // const handleDetailClick = (index) => {
  //   setProjectDetailIndex(index);
  //   window.localStorage.setItem('indexOfProject', index);
  // };

  return (
    <>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={!lang ? 'Yataqlar' : 'Mines'} />
        </div>
      </div>
      <div className="projects">
        <div className="container projects-container py-5">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul className="project-detail-heading-link">
                  <Link to={"/"}>{!lang ? 'Ana Səhifə' : 'Main Page'}</Link>
                  <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                    &#8725;
                  </span>
                  <li>{!lang ? 'Yataqlar' : 'Mines'}</li>
                </ul>
              </nav>
            </div>
            <div className="col-12">
              <p className="projects-description" dangerouslySetInnerHTML={{__html : main_title.title}}>
              </p>
            </div>
            {descriptions.map((item,index) => (
              <div className="col-md-6 d-flex align-item-center justify-content-center my-2">
                <Link 
                  to={`/mines/${item.id}`} 
                  className="project-item" 
                  // onClick={handleDetailClick.bind(null,index)}
                >
                  <div className="project-image">
                    <img src={item.img} alt="image2" />
                  </div>
                  <div style={{ height: '47%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span dangerouslySetInnerHTML={{__html : item.title}} className="project-text"></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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

export default Project;
