import "./style.css";
import { Link } from "react-router-dom";
import {  useContext} from "react";
import { GlobalContext } from "../../../pages/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../../assets/api/dataFetching";
import { minesSliceAction } from "../../../store/mines-slice";


function Mine() {
  // const {setProjectDetailIndex} = useContext(GlobalContext);
  const lang = useSelector(state => state.langReducer.lang);
  const descriptions = useSelector(state => state.minesReducer.descriptions);
  const main_title = useSelector(state => state.minesReducer.main_title);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchData(!lang ? `az/projects` : `en/projects`)
    .then(data => dispatch(minesSliceAction.getAllMines(data.data)));
  }, [lang,dispatch])

  const handleClick = (index) => {
    window.scroll(0,0);
    window.localStorage.setItem('indexOfProject', index);
    // setProjectDetailIndex(index);
  };

  return (
    <>
      <div className="projects">
        <div className="container projects-container py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="projects-home-title">{lang === 'az' ? 'Yataqlar' : 'Mines'}</h3>
            </div>
            <div className="col-12">
              <p className="projects-description" dangerouslySetInnerHTML={{ __html: main_title.title }}>
              </p>
            </div> 
            {descriptions.map((item,index) => (
              <div key={item.id} className="col-md-6 d-flex align-item-center justify-content-center my-2">
                <Link onClick={handleClick.bind(null, index)} to={`/mines/${item.id}`} className="project-item">
                  <div className="project-image">
                    <img src={item.img} alt="image2" />
                  </div>
                  <div
                    style={{
                      height: "47%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="project-text" dangerouslySetInnerHTML={{ __html: item.title }}>
                      
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mine;
