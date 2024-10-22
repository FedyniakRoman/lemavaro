import React, { useEffect, useState } from 'react';  
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsContainer from '../../components/ProductsContainer';
import { getProductsByCategory } from '../../requests/products'; 
import s from './index.module.css';
import SkeletonContainer from '../../components/SkeletonContainer';

function ProductsByCategoryPage() {
  const { category_id } = useParams(); // Получаем category_id из URL
  const dispatch = useDispatch();
  const productsState = useSelector((store) => store.products);

  const { products: { data = [], category } = {}, status } = productsState; // Деструктуризация состояния с проверкой

  const [minPrice, setMinPrice] = useState(''); // Для хранения минимальной цены
  const [maxPrice, setMaxPrice] = useState(''); // Для хранения максимальной цены
  const [sortOption, setSortOption] = useState('default'); // Опция сортировки
  const [isDiscountedOnly, setIsDiscountedOnly] = useState(false); // Состояние для скидок
  
  // Фильтрация продуктов по цене и наличию скидки
  const filteredProducts = data.filter(product => {
    const price = product.discont_price || product.price;
    const matchesPrice = 
    (!minPrice || price >= minPrice) && // Если minPrice не указан, то условие true. Если minPrice есть, проверяется, что цена больше или равна minPrice
    (!maxPrice || price <= maxPrice);   // Если maxPrice не указан, то условие true. Если maxPrice есть, проверяется, что цена меньше или равна maxPrice
    const matchesDiscount = !isDiscountedOnly || product.discont_price != null; // Если выбран "Discounted items"
    return matchesPrice && matchesDiscount;
  });

  // Сортировка продуктов
  const sortedProducts = filteredProducts.sort((a, b) => { 
    const priceA = a.discont_price || a.price;
    const priceB = b.discont_price || b.price;  //Использование оператора || (логическое "ИЛИ") означает, что вы сначала проверяете наличие   discont_price, и если она есть, вы берете её для сравнения. Если скидочная цена отсутствует (null или undefined), тогда  используете обычную цену товара.

    if (sortOption === 'asc') return priceA - priceB; // здесь мы сравниваем состояние созданное выше с заданными значениями которые мы описали
    if (sortOption === 'desc') return priceB - priceA;
    if (sortOption === 'nameAz') return a.title.localeCompare(b.title); 
    if (sortOption === 'nameZa') return b.title.localeCompare(a.title); // Метод localeCompare используется для сравнения двух строк в алфавитном порядке.
    return 0;
  });

  useEffect(() => {
    dispatch(getProductsByCategory(category_id)); // Запрос продуктов по категории с сервера
  }, [category_id, dispatch]);

  useEffect(() => {
    if (category && category.title) {
      document.title = `${category.title}`; // Изменяем заголовок страницы
    } else {
      document.title = 'Loading...'; // Заголовок при загрузке
    }
  }, [category]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleDiscountChange = () => {
    setIsDiscountedOnly(!isDiscountedOnly); // Переключаем состояние скидочных товаров
  };

  return (
    <section className={s.container}>
      <nav className={s.nav}>
        <ul className={s.nav_list}>
          <li className={s.item}>
            <Link to="/" className={s.link}>
              Main page
            </Link>
          </li>
          <li className={s.item}>
            <Link to="/categories" className={s.link}>
              Categories
            </Link>
          </li>
          <li className={s.item}>
            {/* Отображаем текущую категорию */}
            {category && <span className={s.current_category}>{category.title}</span>}
          </li>
        </ul>
      </nav>

      <h2 className={s.title}>{category ? category.title : "Category"}</h2>

      {/* Форма для фильтрации и сортировки */}
      <form action="" className={s.form}>
        <label htmlFor="price" className={s.label_price}>
          Price
        </label>
        <input
          type="number"
          name="minPrice"
          placeholder="from"
          className={s.input_price}
          value={minPrice}
          onChange={handlePriceChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="to"
          className={s.input_price}
          value={maxPrice}
          onChange={handlePriceChange}
        />
        
        <label htmlFor="discount" className={s.label_discount}>Discounted items</label>
        <input
          type="checkbox"
          name="discount"
          className={s.input_discount}
          checked={isDiscountedOnly}
          onChange={handleDiscountChange}
        />

        <label htmlFor="sort" className={s.label_sort}>
          Sorted
          <select name="sort" className={s.select_sort} value={sortOption} onChange={handleSortChange}>
            <option value="default">by default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="nameAz">Name: A to Z</option>
            <option value="nameZa">Name: Z to A</option>
          </select>
        </label>
      </form>

      {status === 'loading' ? (       
        <SkeletonContainer count={8}/>
      ) : (
        <ProductsContainer products={sortedProducts} />
      )}
    </section>
  );
}

export default ProductsByCategoryPage;
