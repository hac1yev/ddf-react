import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../assets/api/dataFetching';
import '../assets/css/Musahide.css';
import { GlobalContext } from "./GlobalState";
import { useSelector } from 'react-redux';

const Müşahidə = () => {
  // Dil və Data-nı saxlamaq üçün state-lər
  const [musahideData , setMusahideData] = useState([])
  // const {lang} = useContext(GlobalContext);

  const lang = useSelector(state => state.langReducer.lang);

  // APİ-yə request atmaq üçün istifadə olunan useEffect
  useEffect(() => {
    fetchData(!lang ? `az/observation` : `en/observation`)
    .then((data) => setMusahideData(data.data));
  },[lang])


  return (
    <div className='musahide'>
        <div className="text1" dangerouslySetInnerHTML={{ __html : musahideData.musahide}}></div>
    </div>
  );
};

export default Müşahidə;