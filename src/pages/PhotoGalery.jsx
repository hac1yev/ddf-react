import React from "react";
import vector from '../img/Vector.svg';
import "../assets/css/Galery.css";
import MediaPhotoItems from "../components/Media/MediaPhotoItems";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";

const Galery = () => {
  // Context api-dəki qlobal state
  // const {photoGaleryItem} = useContext(GlobalContext);

  const photoGaleryItem = useSelector(state => state.galeryReducer.photoGaleryItems);

  // Satate
  const [currentPage , setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  // Foto Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = photoGaleryItem.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(photoGaleryItem.length / recordsPerPage);

  return (
    <>
      <div className="row galery-row w-100">
        {currentRecords.map((item) => (
          <MediaPhotoItems
            currentRecords={currentRecords}
            key={item.id}
            id={item.id}
            description={item.title}
            image={item.img}
            vector={vector}
            date={item.created_at}
          />
        ))}
        <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage } />
      </div>
    </>
  );
};

export default Galery;