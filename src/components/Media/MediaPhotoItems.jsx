import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import close from "../../img/close.png";
import { useContext } from "react";
import { GlobalContext } from "../../pages/GlobalState";

const MediaPhotoItems = ({ vector, vector2, id, image, description, date }) => {
  // State-lər
  const [isGaleryModal,setIsGaleryModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Context API-dəki qlobal state 
  const {photoGaleryItem} = useContext(GlobalContext)

  const imgs = [];

  // Foto qalereya səhifəsindəki pop-up-a şəkillərin əlavə edilməsi
  photoGaleryItem.forEach(element => {
    let imgA = element.img;
    let imgD = element.title;
    imgs.push({
      original: imgA,
      thumbnail: imgA,
      description: imgD
    })
  });

  // Ekran genişliyinə görə foto qalereya itemlərinin görüntüsü 
  useEffect(() => {
      if (window.innerWidth <= 968) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth <= 968) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    }, [isMobile]);

    const handleClick = () => {
        setIsGaleryModal(true);
      };
    
      const handleClose = () => {
        setIsGaleryModal(false);
      };
    

  return (
    <>
      <div
        onClick={() => window.scrollTo(0, 0)}
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="col-lg-4 col-md-6 media-item-column"
      >
        {vector || vector2 ? (
          <div
            className="media-item"
            onClick={handleClick}
          >
            <div className="media-image">
              <img src={image} alt="media item" />
              {(vector || vector2) && (
                <div className="media-galery-icon">
                  <img
                    className="img-fluid"
                    src={vector}
                    alt="media gallery"
                  />
                </div>
              )}
              <div className="media-image-text">{date}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        ) : (
          <Link to={`/media/news/${id}`} className="news-item-link">
            <div
              className="media-item"
              onClick={handleClick}
            >
              <div className="media-image">
                <img
                  src={image}
                  alt="media item"
                />
                {(vector || vector2) && (
                  <div className="media-galery-icon">
                    <img
                      className="img-fluid"
                      src={vector}
                      alt="media item"
                    />
                  </div>
                )}
                <div className="media-image-text">{date}</div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </Link>
        )}
      </div>
      {isGaleryModal && (
        <div className="fancybox">
          <div className="image-gallery-close" onClick={handleClose}>
            <img src={close} alt="close" />
          </div>
          <ImageGallery
            items={imgs}
            thumbnailPosition={!isMobile ? "left" : "bottom"}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
          />
        </div>
      )}
    </>
  );
};

export default MediaPhotoItems;
