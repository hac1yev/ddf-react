import React, { useEffect } from "react";
import group45 from "../../img/group45.svg";
import vector2 from "../../img/Vector2.svg";
import { Link } from "react-router-dom";
import MediaVideoGaleryİtem from "./MediaVideoGaleryİtem";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../assets/api/dataFetching";
import { galerySliceAction } from "../../store/galery-slice";

const MediaGaleryVideo = () => {
  const dispatch = useDispatch();
  const videoGalleryItems = useSelector(state => state.galeryReducer.mediaVideoGaleryItems);
  const lang = useSelector(state => state.langReducer.lang);
   
  // Qalereya itemlərinə kliklənən zaman uyğun item-in innerText-nin Context Api-ə göndərilməsi
  const handleClick = () => {
    // window.scrollTo(0,0);
    // setGaleryText('Video Qalereya');
  };

  useEffect(() => {
    fetchData(!lang ? `az/videoGallery` : `en/videoGallery`)
    .then(data => dispatch(galerySliceAction.getMediaVideoGalery(data.data.slice(-6))))
  }, [dispatch,lang]);

  return (
    <>
      <div className="media-header">
        <h3>Video Qalereya</h3>
        <Link onClick={handleClick} to="/media/gallery/videos" className="media-header-more">
          <img src={group45} alt="group45" />
          Daha çox
        </Link>
      </div>
      {videoGalleryItems.map((item) => (
        <MediaVideoGaleryİtem
          key={item.id}
          id={item.id}
          image={item.img}
          vector2={vector2}
          date={item.created_at}
          description={item.title}
          url={item.url}
        />
      ))}
      
    </>
  );
};

export default MediaGaleryVideo;