import { Route, Routes } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import About from "./components/pages/About";
import Partners from "./components/pages/Partners";
import Services from "./components/pages/Services";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/partners' element={<Partners />} />
        {/* Добавьте другие маршруты по мере необходимости */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
