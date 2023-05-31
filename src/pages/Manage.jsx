import React, { useEffect } from "react";
import "../assets/css/Manage.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import rehberlikSag from "../img/rehberlik-sag.png";
import { useSelector } from "react-redux";
import { useState } from "react";

const Manage = () => {
  // Context api-dəki qlobal state-lər

  const lang = useSelector(state => state.langReducer.lang);
  const { pathname } = useLocation();
  const [navTitle,setNavTitle] = useState("");

  const a = document.querySelector('.links-div.active');

  // Tablara kliklənən zaman uyğun linkin innerText-nin Context APİ-ə göndərilməsi 
  const handleCclick = (e) => {
    // setContextData(e.target.innerText);
  };

  useEffect(() => {
    const active = document.getElementById('active');
    setNavTitle(active.innerText);
  }, [pathname]);


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
          <Navbar title={navTitle} />
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
            onClick={handleCclick}
            >
              <Link to="history" id={pathname === '/about/history' ? "active" : ""} className={pathname === '/about/history' ? 'my-link-class active' :'my-link-class'} type="button">
                {!lang ? 'Tariximiz' : 'History'}
              </Link>
            </div>
            <div 
              onClick={handleCclick}
              >
              <Link
                to="mission-vision"
                className={pathname === '/about/mission-vision' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/mission-vision' ? "active" : ""}
              >
                {!lang ? 'Dəyər və Hədəflərimiz' : 'Values and Vision'}
              </Link>
            </div>
            <div 
              onClick={handleCclick}
            >
              <Link
                to="management"
                className={pathname === '/about/management' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/management' ? "active" : ""}
              >
                {!lang ? 'Rəhbərlik ' : 'Management'}
              </Link>
            </div>
            <div 
              onClick={handleCclick}
            >
              <Link
                to="supervisory"
                className={pathname === '/about/supervisory' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/supervisory' ? "active" : ""}
              >
                {!lang ? 'Müşahidə Şurası' : 'Supervisory Board'}
              </Link>
            </div>

            <div 
              onClick={handleCclick}
            >
              <Link
                to="audit"
                className={pathname === '/about/audit' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/audit' ? "active" : ""}
              >
                {!lang ? 'Maliyyə və Audit' : 'Finance and Audit'}
              </Link>
            </div>
            <div 
            onClick={handleCclick}
            >
              <Link
                to="structure"
                className={pathname === '/about/structure' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/structure' ? "active" : ""}
              >
                {!lang ? 'Struktur ' : 'Structure'}
              </Link>
            </div>
            <div 
              onClick={handleCclick}
            >
              <Link
                to="legislation"
                className={pathname === '/about/legislation' ? 'my-link-class active' :'my-link-class'}
                type="button"
                id={pathname === '/about/legislation' ? "active" : ""}
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