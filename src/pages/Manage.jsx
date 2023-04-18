import React, { useEffect } from "react";
import "../assets/css/Manage.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import rehberlikSag from "../img/rehberlik-sag.png";
import { useSelector } from "react-redux";

const Manage = () => {
  // Context api-dəki qlobal state-lər
  // const {contextData , setContextData , lang} = useContext(GlobalContext);

  const lang = useSelector(state => state.langReducer.lang);
  const { pathname } = useLocation();
  

  const a = document.querySelector('.links-div.active');

  // Tablara kliklənən zaman uyğun linkin innerText-nin Context APİ-ə göndərilməsi 
  const handleCclick = (e) => {
    // setContextData(e.target.innerText);
    window.localStorage.setItem('aboutText', e.target.innerText);
  };

  // Tablara kliklənən zaman uyğun linkin aktivliyinin təmin edilməsi 
  useEffect(() => {
    const linksButton = document.querySelectorAll(".links-div");
    linksButton.forEach((item) => {
      item.addEventListener("click", function () {
        linksButton.forEach((rItem) => {
          rItem.classList.remove("active");
        });
        item.classList.add("active");
      });
    });
  }, []);

  return (
    <>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={a?.innerText} />
        </div>
      </div>
      <img
        className="rehberlik-sag"
        style={{ position: "absolute", right: "0" }}
        src={rehberlikSag}
        alt="manage"
      />
      <div className="container pt-5 manages-container">
        <nav>
          <ul className="interior-nav">
            <Link to={"/"}>{!lang ? 'Ana Səhifə' : 'Main Page'}</Link>
            <span>&#8725;</span>
            <p>{a?.innerText}</p>
          </ul>
        </nav>
        <div className="d-flex align-items-start flex-wrap aside-menu">
          <div
            className=" col-lg-3 col-md-12 col-sm-12 nav-pills-my"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div 
            // className={`links-div ${(contextData === 'Tariximiz' || contextData === 'History') ? 'active' : ''}`} 
            onClick={handleCclick}
            >
              <Link to="history" className={pathname === '/about/history' ? 'my-link-class active' :'my-link-class'} type="button">
                {!lang ? 'Tariximiz' : 'History'}
              </Link>
            </div>
            <div 
              // className={`links-div ${(contextData === 'Missiya və Hədəflərimiz' || contextData === 'Mission and Vision') ? 'active' : ''}`} 
              onClick={handleCclick}
              >
              <Link
                to="mission-vision"
                className={pathname === '/about/mission-vision' ? 'my-link-class active' :'my-link-class'}
                type="button"
                
              >
                {!lang ? 'Missiya və Hədəflərimiz' : 'Mission and Vision'}
              </Link>
            </div>
            <div 
              // className={`links-div  ${(contextData === 'Rəhbərlik' || contextData === 'Management') ? 'active' : ''}`} 
              onClick={handleCclick}
            >
              <Link
                to="management"
                className={pathname === '/about/management' ? 'my-link-class active' :'my-link-class'}
                type="button"
              >
                {!lang ? 'Rəhbərlik ' : 'Management'}
              </Link>
            </div>
            <div 
              // className={`links-div  ${(contextData === 'Müşahidə Şurası' || contextData === 'Supervisory Board') ? 'active' : ''}`} 
              onClick={handleCclick}
            >
              <Link
                to="supervisory"
                className={pathname === '/about/supervisory' ? 'my-link-class active' :'my-link-class'}
                type="button"
              >
                {!lang ? 'Müşahidə Şurası' : 'Supervisory Board'}
              </Link>
            </div>

            <div 
              // className={`links-div  ${(contextData === 'Maliyyə və Audit' || contextData === 'Finance and Audit') ? 'active' : ''}`} 
              onClick={handleCclick}
            >
              <Link
                to="audit"
                className={pathname === '/about/audit' ? 'my-link-class active' :'my-link-class'}
                type="button"
              >
                {!lang ? 'Maliyyə və Audit' : 'Finance and Audit'}
              </Link>
            </div>
            <div 
            // className={`links-div ${(contextData === 'Struktur' || contextData === 'Structure') ? 'active' : ''}`} 
            onClick={handleCclick}
            >
              <Link
                to="structure"
                className={pathname === '/about/structure' ? 'my-link-class active' :'my-link-class'}
                type="button"
                
              >
                {!lang ? 'Struktur ' : 'Structure'}
              </Link>
            </div>
            <div 
              // className={`links-div ${(contextData === 'Qanunvericilik' || contextData === 'Legislation') ? 'active' : ''}`} 
              onClick={handleCclick}
            >
              <Link
                to="legislation"
                className={pathname === '/about/legislation' ? 'my-link-class active' :'my-link-class'}
                type="button"
                
              >
                {!lang ? 'Qanunvericilik ' : 'Legislation'}
              </Link>
            </div>
          </div>
          <Outlet />
          <div className="tab-content" id="v-pills-tabContent"></div>
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

export default Manage;