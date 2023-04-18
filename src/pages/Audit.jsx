import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import audit from '../../src/img/tax.svg'
import { fetchData } from '../assets/api/dataFetching'
import '../assets/css/Audit.css'
import { GlobalContext } from './GlobalState'
import { useSelector } from 'react-redux'

const Audit = () => {
  // const { lang } = useContext(GlobalContext);
  const lang = useSelector(state => state.langReducer.lang);
  const [auditData,setAuditData] = useState([]);

  useEffect(() => {
    fetchData(!lang ? `az/audit` : `en/audit`)
    .then((data) => setAuditData(data.data));
  },[lang])

  return (
    <div className='audit-container'>
      {auditData.map((item) => (
        <div className="audit-inner" key={item.id}>
          <div className="audit-icon">
            <img src={audit} alt="" />
          </div>
          <div className="audit-text">
            <h3>{item.title}</h3>
            {item.pdfUrl === null ? '' : <a href={item.pdfUrl} download >{lang === 'az' ? 'Yüklə' : 'Download'}</a>}
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Audit