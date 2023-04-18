import React from "react";
import '../assets/css/Media.css';
import MediaNews from "../components/Media/MediaNews";
import MediaGalery from "../components/Media/MediaGalery";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MediaGaleryVideo from "../components/Media/MediaGaleryVideo";

const Media = () => {
    return (
        <>
            <div className='heading-all'>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title="Media" />
                </div>
            </div>
            <div className="media">
                <div className="container media-container">
                    <div className="row media-row">
                        <MediaNews />
                    </div>
                    <div className="row media-row">
                        <MediaGalery />
                    </div>
                    <div className="row media-row">
                        <MediaGaleryVideo />
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

export default Media;
