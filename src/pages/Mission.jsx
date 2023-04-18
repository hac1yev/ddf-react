import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { GlobalContext } from "./GlobalState";
import '../assets/css/Mission.css';
import { useDispatch, useSelector } from "react-redux";
import { misVisSliceAction } from "../store/misVis-slice";

const Mission = () => {
  // Tabları dəyişmək üçün state , Dil və Datanı saxlamaq üçün istifadə olunan state-lər
  const [isActive,setIsActive] = useState(true);
  const [misVisData,setMisVisData] = useState([]);
  // const {lang} = useContext(GlobalContext) 

  const lang = useSelector(state => state.langReducer.lang);
  const dispatch = useDispatch();
  const mission = useSelector(state => state.misVisReducer.mission);
  const vision = useSelector(state => state.misVisReducer.vision);


  const handleMisActiveButton = () => {
    setIsActive(true);
  };    


  const handleVisActiveButton = () => {
    setIsActive(false);
  };    

  // api-dən datanı əlavə etmək üçün istifadə olunan useEffect
  useEffect(() => {
    fetchData(!lang ? `az/misVis` : `en/misVis`)
    .then((data) => dispatch(misVisSliceAction.getAllMisVis(data.data)));
  },[lang,dispatch])

  return (
    <div className="col-lg-9 col-md-12 col-sm-12 misVis-wrapper">
      <div className="misVis-buttons">
        <button className={`${isActive ? "mis-button accctive" : "mis-button"}`} onClick={handleMisActiveButton}>{lang === 'az' ? 'Missiyamız' : 'Mission'}</button>
        <button className={`${isActive ? "vis-button" : "vis-button accctive"}`} onClick={handleVisActiveButton}>{lang === 'az' ? 'Hədəflərimiz' : 'Vision'}</button>
      </div> 
      {isActive && 
        <div 
          className="mt-4" 
          dangerouslySetInnerHTML={{ __html: mission }}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
        >
        </div>} 
      {!isActive && 
        <div 
          className="mt-4" 
          dangerouslySetInnerHTML={{ __html: vision }}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
        >
        </div>}
    </div> 
  );
};

export default Mission;
