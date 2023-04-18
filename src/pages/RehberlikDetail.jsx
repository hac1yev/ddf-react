import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../assets/css/RehberlikModal.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../assets/api/dataFetching";
import { rehberlikSliceAction } from "../store/rehberlik-slice";

const RehberlikDetail = () => {
    // const { lang, rehberlikData } = useContext(GlobalContext);
    // Hər rəhbərə uyğun datanı İD-vasitəsi ilə almaq üçün useParams-dan istifadə edirik
    const { rehberlikId } = useParams();
    const dispatch = useDispatch();

    const lang = useSelector(state => state.langReducer.lang);
    const rehberlikDetailData = useSelector(state => state.rehberlikReducer.detailItems);

    useEffect(() => {
        fetchData(!lang ? `az/management` : `en/management`)
        .then(data => dispatch(rehberlikSliceAction.getRehberlikDetail({
            id: rehberlikId,
            data: data.data
        })))
    }, [lang,dispatch,rehberlikId]);

    return (
        <>
        <div className="heading-all">
            <div className="container heading-all-container header-bg-respon">
            <Navbar title={lang === "az" ? "Rəhbərlik" : "Manegement"} />
            </div>
        </div>

        <div style={{ margin: "50px auto", top: "0", position: "relative" }}>
            <div>
            <div style={{ padding: "10px 0" }}>
                <div
                className="container"
                style={{ maxWidth: "940px", width: "100%", height: "100%" }}
                >
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-lg-4 pt-3" style={{ height: "100%" }}>
                    <div
                        style={{ width: "100%", height: "100%" }}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <div style={{ width: "300px", height: "394px" }}>
                        <img
                            src={rehberlikDetailData.img}
                            alt={rehberlikDetailData.full_name}
                            style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            }}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-8 pt-3" style={{ height: "100%" }}>
                    <p className="rehberlik-modal-name text-lg-start">{rehberlikDetailData.full_name}</p>
                    <p className="rehberlik-modal-title text-start">{rehberlikDetailData.position}</p>
                    <div className="rehberlik-modal-description text-start"
                        dangerouslySetInnerHTML={{ __html: rehberlikDetailData.descripton }}
                    >
                    </div>
                    </div>
                </div>
                </div>
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

export default RehberlikDetail;
