import React, { useEffect, useState }  from "react";
import MediaItem from "../components/Media/MediaItem";
import '../assets/css/Galery.css';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../assets/api/dataFetching";
import { newsSliceAction } from "../store/news-slice";

const News = () => {
    const newsData = useSelector(state => state.newsReducer.items);
    const lang = useSelector(state => state.langReducer.lang);

    const dispatch = useDispatch();


  // State-lər
  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  // Video Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = newsData.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(newsData.length / recordsPerPage)

    useEffect(() => {
        // window.localStorage.setItem('newsData', JSON.stringify(newsData));
        fetchData(!lang ? `az/news` : `en/news`)
        .then(data => dispatch(newsSliceAction.getAllNews(data.data)));
    }, [lang,dispatch]);

    return (
        <>
            <div className='heading-all'>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={!lang  ? 'Xəbərlər' : 'News'} />
                </div>
            </div>
            <div className="galery">
                <div className="container galery-container">
                    <div className="row galery-row">
                        <div className="galery-header">
                            <h3>{!lang ? 'Xəbərlər' : 'News'}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {currentRecords.map((item) => (
                            <MediaItem
                                key={item.id}
                                id={item.id}
                                image={item.img}
                                description={item.description}
                                date={item.date}
                                title={item.title}
                            />
                        ))}
                    </div>
                    <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }  />
                </div>
            </div>
            <div className="section-footer-bg pd-b">
                <div className="container custom-container">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default News;
