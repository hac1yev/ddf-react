import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../assets/css/PurchaseDetail.css';
import kenar from '../img/rehberlik-sag.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { purchSliceAction } from "../store/purch-slice";

const PurchaseDetail = () => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.langReducer.lang);
    const purchDetail = useSelector(state => state.purchReducer.purchDetailItems)
    const { purchaseId } = useParams();

    useEffect(() => {
      fetchData(!lang ? `az/purchase` : `en/purchase`)
      .then(data => dispatch(purchSliceAction.getPurchDetailItems({
        data: data.data.desciriptions,
        id: purchaseId,
      })))
    }, [lang,dispatch,purchaseId]);

  return (
    <>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={!lang ? 'Satınalma' : 'Procurement'} />
        </div>
      </div>
      <section style={{position: 'relative'}}>
      <img className="right-pic" src={kenar} alt="" />
      <div className="container purchase-detail-container mb-5 pt-5">
        <div className="row">
          <div className="col-12">
            <nav>
              <ul className="project-detail-heading-link purchase-detail-header-link">
                <Link to={"/"} style={{ marginRight: '5px' }}>{!lang ? 'Ana Səhifə' : 'Main Page'}</Link>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#x2215;</span>
                <Link to="/purchase" style={{ margin: '0 5px' }}>{!lang ? 'Satınalma' : 'Procurement'}</Link>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#x2215;</span>
                <li></li>
              </ul>
            </nav>
            <p 
                data-aos="fade-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="purchase-detail-title"
            >
                {purchDetail.title}
                
            </p>
            <div className="purch-detail-date my-4">
              <div 
                className="purch-detail-date-left"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
              >
                <h4>{!lang ? 'Başlama tarixi:' : 'Start Date:'}</h4>
                <span>{purchDetail.start_date}</span>
              </div>
              <div 
                className="purch-detail-date-right"
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
              >
                <h4>{!lang ? 'Son Müraciət tarixi:' : 'End Date:'}</h4>
                <span>{purchDetail.end_date}</span>
              </div>
            </div>
            <p 
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="purchase-detail-description"
                dangerouslySetInnerHTML={{ __html : purchDetail.description }}
            >
             
            </p>
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

export default PurchaseDetail;