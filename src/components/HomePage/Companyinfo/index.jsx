import "./style.css";
import intersect from "../../../img/Intersect.webp";
import { useEffect,useState } from "react";
import { fetchData } from "../../../assets/api/dataFetching.js";
import { useSelector } from "react-redux";

function Companyinfo() {
    const [homeAboutData,setHomeAboutData] = useState({
        main_title: {
            title: ''
        },
        desciriptions: []
    });
    // const {lang} = useContext(GlobalContext);
    const lang = useSelector(state => state.langReducer.lang);

    useEffect(() => {
        fetchData(!lang ? `az/mainAbouts` : `en/mainAbouts`)
        .then((data) => setHomeAboutData(data.data));
    }, [lang]);

    return (
        <div className="company-info">
            <div className="main-info">
                <div className="main-info-header">
                    <h2
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                    >
                        “Daşkəsən Dəmir Filiz” MMC
                    </h2>
                    <p
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        className="main-info-description"
                        dangerouslySetInnerHTML={{ __html: homeAboutData.main_title.title }}
                    >
                    </p>
                </div>
                <div className="main-info-content">
                    {homeAboutData.desciriptions.map((item) => (
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            key={item.id}
                        >
                            <img src={item.img} alt=""/>
                            <div className="main-info-content-rigth">
                                <h3>
                                    {item.title}
                                </h3>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                >
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <img 
                src={intersect}
                className="section-img" 
                alt="" 
            />
        </div>
    );
}

export default Companyinfo;
