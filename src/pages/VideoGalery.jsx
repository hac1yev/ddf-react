import React, { useEffect } from "react";
import vector2 from '../img/Vector2.svg';
import '../assets/css/Galery.css';
import MediaVideoGaleryİtem from "../components/Media/MediaVideoGaleryİtem";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../assets/api/dataFetching";
import { galerySliceAction } from "../store/galery-slice";

const VideoGalery = () => {
  // Context api-dəki qlobal state
  // const {} = useContext(GlobalContext)

  const videoGalleryItems = useSelector(state => state.galeryReducer.videoGaleryItems);
  const lang = useSelector(state => state.langReducer.lang);
  const dispatch = useDispatch();

  // State-lər
  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  // Video Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = videoGalleryItems.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(videoGalleryItems.length / recordsPerPage)

  useEffect(() => {
    fetchData(!lang ? `az/videoGallery` : `en/videoGallery`)
    .then((data) => dispatch(galerySliceAction.getAllVideoGalery(data.data)));
  }, [lang,dispatch]);

  return (
    <>
          <div className="row galery-row w-100">
            {currentRecords.map((item) => (
              <MediaVideoGaleryİtem
                key={item.id}
                image={item.img}
                vector2={vector2}
                description={item.title}
                date={item.created_at}
                url={item.url}
              />
            ))}
            <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }  />
          </div>
          
    </>
  );
};

export default VideoGalery;
