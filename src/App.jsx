import { Route, Routes } from "react-router-dom";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Galery from "./pages/Galery";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Project from "./pages/Project";
import Vacancy from "./pages/Vacancy";
import Manage from "./pages/Manage";
import Media from "./pages/Media";
import ProjectDetail from "./pages/ProjectDetail";
import Tariximiz from "./pages/Tariximiz";
import Rehberlik from "./pages/Rehberlik";
import Mission from "./pages/Mission";
import Struktur from "./pages/Struktur";
import Qanunvericilik from "./pages/Qanunvericilik";
import Muraciet from './pages/Muraicet'
import VideoGalery from "./pages/VideoGalery";
import News from "./pages/News";
import NotFound from "./pages/404";
import VacancyDetail from "./pages/VacancyDetail";
import { AccessibilityWidget } from 'react-accessibility';
import PhotoGalery from './pages/PhotoGalery';
import Purchase from "./pages/Purchase";
import PurchaseDetail from "./pages/PurchaseDetail";
import Müşahidə from "./pages/Müşahidə";
import PurchaseAnnounce from "./pages/PurchaseAnnounce";
import PurchaseHistory from "./pages/PurchaseHistory";
import './assets/css/Accessibility.css';
import { useEffect, useState } from "react";
import RehberlikDetail from "./pages/RehberlikDetail";
import VacancyArchive from "./pages/VacancyArchive";
import Search from "./pages/Search";
import Audit from "./pages/Audit";

function App() {
  const [isAccess,setIsAccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAccess(true);
    },3000);
  }, []);
  return (
    <>
      {isAccess && <AccessibilityWidget className='accessibility-ddf' />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<Manage />}>
          <Route path="history" element={<Tariximiz />} />
          <Route exact path="management" element={<Rehberlik />} />
          <Route path="mission-vision" element={<Mission />} />
          <Route path="structure" element={<Struktur />} />
          <Route path="legislation" element={<Qanunvericilik />} />
          <Route path="supervisory" element={<Müşahidə />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        <Route path="/mines" element={<Project />} />
        <Route path="/about/management/:rehberlikId" element={<RehberlikDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Muraciet />} />
        <Route path="/mines/:projectId" element={<ProjectDetail />} />
        <Route path="/career" element={<Career />} />
        <Route path="/vacancies" element={<Vacancy />} />
        <Route path="/vacancies/vacancy-history" element={<VacancyArchive />} />
        <Route path="/vacancies/:vacancyId" element={<VacancyDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/news" element={<News />} />
        <Route path="/purchase" exact element={<Purchase />} />
        <Route path="/purchase/purchase-announce" element={<PurchaseAnnounce />} />
        <Route path="/purchase/purchase-archive" element={<PurchaseHistory />} />
        <Route path="/purchase/:purchaseId" element={<PurchaseDetail />} />
        <Route path="/media/gallery/" element={<Galery />} >
          <Route path="photos" element={<PhotoGalery />} />
          <Route path="videos" element={<VideoGalery />} />
        </Route>
        <Route path="/media/news/:newsId" element={<NewsDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;