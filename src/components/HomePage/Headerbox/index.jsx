import { Link } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../../../assets/api/dataFetching";
import { useSelector } from "react-redux";

function Headerbox() {
  // const { lang } = useContext(GlobalContext);
  const lang = useSelector(state => state.langReducer.lang);

  const [latestNews, setLatestNews] = useState({
    id: "",
    title: "",
    description: "",
  });

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth)
  };

  let result = latestNews.description

  if(width <= 768){
    const trimmed = latestNews.description;
    result = trimmed.slice(0, 150);
  }
  else if(width <= 425){
    const trimmed = latestNews.description;
    result = trimmed.slice(0, 10);
  }

  useEffect(() => {
    fetchData(!lang ? `az/news` : `en/news`).then((data) =>
      setLatestNews({
        id: data.data[0].id,
        title: data.data[0].title,
        description: data.data[0].description,
      })
    );

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);

  }, [lang]);



  return (
    <>
      <div className="nav-box" data-aos="fade-down" data-aos-duration="1000">
        <p>{latestNews.title}</p>
        <div
          className="header-box-description"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div>
        {/* <p>{}</p> */}
        <button>
          <Link to={`media/news/${latestNews.id}`}>
            {lang === "az" ? "ƏTRAFLI" : "MORE"}
          </Link>
        </button>
      </div>
    </>
  );
}

export default Headerbox;
