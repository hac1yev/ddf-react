import React from "react";
import group45 from "../../img/group45.svg";
import vector from "../../img/Vector.svg";
import vector2 from "../../img/Vector2.svg";
import { Link } from "react-router-dom";
import MediaPhotoItems from "./MediaPhotoItems";
import { useEffect } from "react";
import { fetchData } from "../../assets/api/dataFetching";
import { useDispatch, useSelector } from "react-redux";
import { galerySliceAction } from "../../store/galery-slice";

const MediaGalery = () => {
  // Context API-dəki qlobal state-lər
  // const { setGaleryText , photoGaleryItem } = useContext(GlobalContext);

  const lang = useSelector(state => state.langReducer.lang);
  const photoGaleryItem = useSelector(state => state.galeryReducer.photoGaleryItems);
  const dispatch = useDispatch();

  // Foto Qalereya səhifəsindəki qalereya itemlərin limitli şəkildə göstərilməsi

  // Qalereya itemlərinə kliklənən zaman uyğun item-in innerText-nin Context Api-ə göndərilməsi
  // const handleClick = () => {
  //   window.scrollTo(0,0);
  //   setGaleryText('Foto Qalereya');
  // };

  useEffect(() => {
    fetchData(!lang ? `az/gallery` : `en/gallery`)
    .then(data => dispatch(galerySliceAction.getMediaGalery(data.data.slice(-6))))
  }, [lang,dispatch]);


  return (
    <>
      <div className="media-header">
        <h3>Foto Qalereya</h3>
        <Link 
          // onClick={handleClick} 
          to="/media/gallery/photos" 
          className="media-header-more"
        >
          <img src={group45} alt="group45" />
          Daha çox
        </Link>
      </div>
      {photoGaleryItem.map((item) => (
        <MediaPhotoItems
          key={item.id}
          id={item.id}
          image={item.img}
          vector={vector}
          vector2={vector2}
          date={item.created_at}
        />
      ))}
    </>
  );
};

export default MediaGalery;
