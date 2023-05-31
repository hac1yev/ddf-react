import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../assets/css/Purchase.css";
import { Link } from "react-router-dom";
import subtractDown from '../img/Purchase/subtractDown.svg';
import subtractUp from '../img/Purchase/subtractUp.svg';
import { useEffect } from "react";
import kenar from '../img/rehberlik-sag.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../assets/api/dataFetching";
import { purchSliceAction } from "../store/purch-slice";

const Purchase = () => {
  // Context api-dəki qlobal state-lər
  // const { setPurchaseTitle , setPurchaseDesc , setPurchaseStartDate, setPurchaseEndDate, purchaseData , lang } = useContext(GlobalContext);
  const lang = useSelector(state => state.langReducer.lang);
  const descriptions = useSelector(state => state.purchReducer.descriptions);
  const main_title = useSelector(state => state.purchReducer.main_title);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(!lang ? `az/purchase` : `en/purchase`)
    .then(data => dispatch(purchSliceAction.getAllPurchs(data.data)));
  }, [lang,dispatch]);

  // State
  const [isPurchHistoryOpen,setIsPurchHistoryOpen] = useState(false);

  let purchaseAnnounceData = [];
  let purchaseHistoryData = [];

  // Request zamanı gələn dataları Satınalma Elanları və Satınalma Arxivi şəklində iki Array-e ayırır
  for(const key in descriptions) {
      if(descriptions[key].is_archiv === 0){
      purchaseAnnounceData.push({...descriptions[key]});
    }else{
      purchaseHistoryData.push({...descriptions[key]});
    }
  }

  useEffect(() => {
    window.localStorage.setItem('purchaseData', JSON.stringify(descriptions));
  }, [descriptions]);

  // Satınalma səhifəsindəki məlumatların limitli şəkildə göstərilməsi
  const n = 8;
  const purchDat = purchaseAnnounceData.slice(-n);
  const purchHisDat = purchaseHistoryData.slice(-n);

  // Satınalma itemlərinə kliklənən zaman uyğun itemin Satınalma Detal səhifəsinə yönləndirilməsi
    // const handlePurchHistory = (title,desc,start_date,end_date) => {
    //     setPurchaseTitle(title);
    //     setPurchaseDesc(desc);
    //     setPurchaseStartDate(start_date);
    //     setPurchaseEndDate(end_date);
    //     window.localStorage.setItem('purchDescription', desc);
    //     window.localStorage.setItem('purchTitle', title);
    //     window.localStorage.setItem('purchStartDate', start_date);
    //     window.localStorage.setItem('purchEndDate', end_date);
    //     window.scroll(0,0);
    // };

   const handleClose = () => {
     setIsPurchHistoryOpen(false);
   };

   const handleOpen = () => {
     setIsPurchHistoryOpen(true);
   };

  //  const handlePurchAnnounce = (title, desc, start_date, end_date) => {
  //      setPurchaseTitle(title);
  //      setPurchaseDesc(desc);
  //      setPurchaseStartDate(start_date);
  //      setPurchaseEndDate(end_date);
  //      window.localStorage.setItem('purchDescription', desc);
  //      window.localStorage.setItem('purchTitle', title);
  //      window.localStorage.setItem('purchStartDate', start_date);
  //      window.localStorage.setItem('purchEndDate', end_date);
  //      window.scroll(0,0);
  //  };


 return (
   <>
     <div className="heading-all">
       <div className="container heading-all-container header-bg-respon">
         <Navbar title={!lang ? 'Satınalma' : 'Procurement'} />
       </div>
     </div>
      <section className="purchase-section">
      <img className="purchase-right-img" src={kenar} alt="" />
        <div className="container purchase-container mb-5 pt-5">
        <div className="row purchase-row gy-4">
          <div className="col-md-4">
            <div
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="purchase-description"
                dangerouslySetInnerHTML={{ __html: main_title.title }}
              >
              
            </div>
          </div>
          <div className="col-md-8 px-1">
            <div className="purchase-announce-wrapper">
                <div
                    data-aos="zoom-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-duration="1000"
                    className="purchase-announce-header"
                >
                    <p>{!lang ? 'Satınalma elanları' : 'Procurement Announcements'}</p>
                </div>
                {purchDat.length === 0 ? <p style={{textAlign: 'center'}}>{!lang ? 'Hal-hazırda aktiv satınalma elanı mövcud deyildir.' : 'There is currently no active purchase ad.'}<br/>
                        {!lang ? 'Satınalma elanlarının arxivi ilə' : 'With an archive of purchase announcements'} <Link className="empty-purch-link" to='/satinalma/satinalma-arxivi'>{!lang ? 'buradan' : 'from here  '}</Link>{!lang ? 'tanış ola bilərsiniz.' : 'you can meet.'}</p> : purchDat.map((item,index) => (
                    <Link
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-duration="1000"
                        to={`/purchase/${item.id}`}
                        key={item.id}
                        className="purchase-announce-main-item mt-2"
                        // onClick={handlePurchAnnounce.bind(null,item.title , item.description, item.start_date, item.end_date)}
                      >
                        <div className="purch-1">
                          <span className="purchase-announce-main-number">{index + 1}.</span>
                          <span className="purchase-announce-title">{item.title}</span>
                        </div>
                        <div className="purch-2">
                            <span>{item.start_date}</span>
                            <span>{item.end_date}</span>
                        </div>
                    </Link>
                ))}
                <Link
                  onClick={() => window.scrollTo(0,0)}
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="1000"
                  className="text-left d-flex justify-content-end mt-2 purchase-announce-button"
                  to="/purchase/purchase-announce"
                >
                  {purchDat.length === 0 ? '' : <span>{!lang ? 'Daha çox...' : 'More...'}</span>}
                </Link>
                <div className="purchase-history-wrapper">
                  <div
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="1000"
                      className="purchase-history-header"
                  >
                      {isPurchHistoryOpen ? (
                      <div onClick={handleClose} className="purchase-history-header-button">
                        <p>{!lang ? 'Satınalma arxivi' : 'Procurement Archive'}</p>
                        <img src={subtractUp} alt="subUp" />
                      </div>
                      ) : (
                      <div onClick={handleOpen} className="purchase-history-header-button">
                        <p>{!lang ? 'Satınalma arxivi' : 'Procurement Archive'}</p>
                        <img src={subtractDown} alt="subDown" />
                      </div>
                      )}
                  </div>
                  {isPurchHistoryOpen && (
                    <>
                    {purchHisDat.map((item,index) => (
                        <Link
                            data-aos="zoom-in"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="1000"
                            to={`/purchase/${item.id}`}
                            className="purchase-history-item mt-2"
                            // onClick={handlePurchHistory.bind(null,item.title,item.description,item.start_date,item.end_date)}
                        >
                            <div className="purch-1">
                              <span className="purchase-history-number">{index + 1}.</span>
                              <span className="purchase-history-title">{item.title}</span>
                            </div>
                            <div className="purch-2">
                              <span>{item.start_date}</span>
                              <span>{item.end_date}</span>
                            </div>
                        </Link>
                    ))}
                    <Link
                      onClick={() => window.scrollTo(0,0)}
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="1000"
                      to="/purchase/purchase-archive"
                      className="text-left d-flex justify-content-end mt-2 purchase-history-button"
                    >
                      <span>{!lang ? 'Daha çox...' : 'More...'}</span>
                    </Link>
                  </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
     <div className="section-footer-bg pd-b">
       <div className="container custom-container">
         <Footer />
       </div>
     </div>
   </>
 );
};

export default Purchase;