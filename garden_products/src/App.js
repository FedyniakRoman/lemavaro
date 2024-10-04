
import Header from './components/Header/index.jsx';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import SalesPage from './pages/SalesPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<SingleProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        {/* Решение конфликта. Выбери, что тебе нужно: */}
        <Route path='/categories/:category_id' element={<ProductsByCategoryPage />} />  {/* Я выбрал вариант с id */}
        <Route path='/sales' element={<SalesPage />} />  {/* Исправлена синтаксическая ошибка */}
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;