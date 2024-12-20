import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CardsDetails from './components/CardsDetails';
import Cards from './components/Cards';
import {Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
  <ToastContainer />
   <Header />
   <Routes>
     <Route path='/' element={<Cards />} />
     <Route path='/cart/:id' element={<CardsDetails />} />
     <Route path="*" element={<div>Page Not Found</div>} />

   </Routes>
  </>
  );
}

export default App;
 