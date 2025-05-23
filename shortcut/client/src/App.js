import { Route, Routes } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import About from "./components/pages/About";
import Partners from "./components/pages/Partners";
import Services from "./components/pages/Services";
import Login from "./components/pages/Login";
import ClientProfile from "./components/pages/ClientProfile";
import BankProfile from "./components/pages/BankProfile";
import CreateClientProfile from "./components/pages/CreateClientProfile";
import CreateBankProfile from "./components/pages/CreateBankProfile";
import ProfileTypeSelection from "./components/pages/ProfileTypeSelection";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/client/:id' element={<ClientProfile />} />
        <Route path='/profile/bank/:id' element={<BankProfile />} />
        <Route path='/create-client-profile' element={<CreateClientProfile />} />
        <Route path='/create-bank-profile' element={<CreateBankProfile />} />
        <Route path='/select-profile-type' element={<ProfileTypeSelection />} />
        {/* Добавьте другие маршруты по мере необходимости */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
