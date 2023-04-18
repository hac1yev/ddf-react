import React from "react";
import '../assets/css/Manage.css'
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useDispatch, useSelector } from "react-redux";
import { historySliceAction } from "../store/history-slice";


const Tariximiz = () => {
  // APİ-dən gələn datanın saxlanılması üçün State-dir
  // const [historyData , setHistoryData] = useState([])
  // UseContext-dən gələn dilin saxlanılması və GlobalContextdən gələn datanı çəkmək üçün UseContext-dən istifadə edirik 
  // const {lang} = useContext(GlobalContext);

  const dispatch = useDispatch();
  const lang = useSelector(state => state.historyReducer.lang);
  const historyData = useSelector(state => state.historyReducer.items);

  // Data-nı Api-dən çəkmək üçün UseEffectdən istifadə edirik
  useEffect(() => {
    fetchData(!lang ? `az/history` : `en/history`)
    .then((data) => dispatch(historySliceAction.getAllHistory(data.data)));
  },[lang,dispatch]);

  return (
    <div>
      <div
        class="tab-pane show"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
      {/* Editordan gələn data tag-lərlə qarışıq olduğu üçün dangerouslyİnnerHtml istifadə etmişik */}
        <div dangerouslySetInnerHTML={{__html : historyData.content}} className="history-section">
        </div>
      </div>
    </div>
  );
};

export default Tariximiz;
