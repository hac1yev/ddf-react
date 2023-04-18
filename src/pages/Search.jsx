import React, { useEffect }  from "react";
import SearchItem from "../components/Media/SearchItem";
import '../assets/css/Galery.css';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../assets/api/dataFetching";
import { newsSliceAction } from "../store/news-slice";

const Search = () => {
    // Context api-dəki qlobal state-lər
    // const { searchData } = useContext(GlobalContext);

    const searchData = useSelector(state => state.searchReducer.searchedText);
    const lang = useSelector(state => state.langReducer.lang);
    const newsData = useSelector(state => state.newsReducer.items);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData(!lang ? `az/news` : `en/news`)
        .then(data => dispatch(newsSliceAction.getAllNews(data.data)));
    }, [lang,dispatch]);

        // Axtarış zamanı filterlənmiş məlumatların əldə edilməsi 
        let filteredNews = newsData.filter(item => item.title.toLowerCase().trim().includes(searchData))
        const netice = filteredNews.length

    useEffect(() => {
        window.localStorage.setItem('newsData', JSON.stringify(newsData));
    }, [newsData]);

    return (
        <>
            <div className='heading-all'>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={!lang ? 'Axtarış' : 'Search'} />
                </div>
            </div>
            <div className="galery">
                <div className="container galery-container">
                    <div className="row galery-row">
                        <div className="galery-header">
                            <h3>{filteredNews.length === 0 ? '' : `'${searchData}' sözü üzrə ${netice} nəticə tapılıb`}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {filteredNews.length === 0 ? <p style={{marginTop: '15px' , fontSize: '20px'}}>Nəticə Tapılmadı...</p> : filteredNews.map((item) => (
                            <>
                                <SearchItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                />
                            </>
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
}

export default Search;
