import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Products } from './routes/Product';
import { ProductsCreate } from './routes/ProductCreate';
import { Order } from './routes/Order';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/create' element={<ProductsCreate />} />
        <Route path='/order' element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
