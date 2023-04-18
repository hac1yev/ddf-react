import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import VacancyHistory from '../components/Vacancy/VacancyHistory';
import { GlobalContext } from './GlobalState';
import '../assets/css/Vacancy.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from '../assets/api/dataFetching';
import { vacancySliceAction } from '../store/vacancy-slice';

const VacancyArchive = () => {
    // Context api-dəki qlobal state-lər
    // const { lang,vacancyData } = useContext(GlobalContext);

    const lang = useSelector(state => state.langReducer.lang);
    const vacancyData = useSelector(state => state.vacancyReducer.vacancyItems);
    const dispatch = useDispatch();

    let vacancyHistoryData = [];

    // Request zamanı gələn dataları Vakansiya Arxivi Array-nə ayırır
    for (const key in vacancyData) {
        if (vacancyData[key].archive === 1) {
            vacancyHistoryData.push({ ...vacancyData[key] });
        } 
    }

    useEffect(() => {
        fetchData(!lang ? `az/vacancies` : `en/vacancies`)
        .then(data => dispatch(vacancySliceAction.getAllVacancy(data.data)))
    }, [lang,dispatch]);

    return (
        <>
            <div className="heading-all">
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={lang === "az" ? "Vakansiya Arxivi" : "Vacancy Archive"} />
                </div>
            </div>
            <div className="container vacancy-archive-container">
            <div className="row vacancy-row gy-4">
                {vacancyHistoryData.map((vacancyItem) => (
                  <div className="col-lg-4 col-md-6" key={vacancyItem.id}>
                    <VacancyHistory
                      id={vacancyItem.id}
                      title={vacancyItem.name}
                      description={vacancyItem.description}
                      startDate={vacancyItem.start_date}
                      endDate={vacancyItem.end_date}
                      sections={vacancyItem.sections}
                      work_qraf={vacancyItem.work_qraf}
                      salary={vacancyItem.salary}
                    />
                  </div>
                ))}
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

export default VacancyArchive;