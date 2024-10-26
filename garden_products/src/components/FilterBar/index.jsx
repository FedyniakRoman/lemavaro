import { useDispatch } from "react-redux";
import s from "./index.module.css";
import {
  getDiscountProductsAction,
  sortAllProductsAction,
} from "../../store/reducers/productsReducer";

function FilterBar({ setMinValue, setMaxValue, checked, setChecked }) {
  const dispatch = useDispatch();

  // Обработчик для сортировки продуктов. При изменении значения в селекте,
  // отправляется action sortAllProductsAction с выбранным типом сортировки
  const handleSort = (e) => dispatch(sortAllProductsAction(e.target.value));

  // Обработчик для переключения фильтра "только товары со скидкой".
  // Устанавливает состояние "checked" и диспатчит getDiscountProductsAction
  const handleClick = (e) => {
    setChecked(e.target.checked);
    dispatch(getDiscountProductsAction(e.target.checked));
  };

  // Обработчики для ввода минимальной и максимальной цены.
  // Устанавливают значения минимальной и максимальной цены для фильтра
  const handleMinValue = (e) => setMinValue(e.target.value || 0);
  const handleMaxValue = (e) => setMaxValue(e.target.value || Infinity);

  return (
    <form action="" className={s.form}>
      {/* Поле для ввода минимальной и максимальной цены */}
      <label htmlFor="price" className={s.label_price}>
        Price
      </label>
      <input
        type="number"
        name="minPrice"
        placeholder="from"
        className={s.input_price}
        onChange={handleMinValue}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="to"
        className={s.input_price}
        onChange={handleMaxValue}
      />
      {/* Чекбокс для фильтрации по наличию скидки */}
      <label htmlFor="discount" className={s.label_discount}>
        Discounted items
      </label>
      <input
        type="checkbox"
        name="discount"
        className={s.input_discount}
        checked={checked}
        onChange={handleClick}
      />
      {/* Селект для сортировки продуктов по разным критериям */}
      <label htmlFor="sort" className={s.label_sort}>
        Sorted
        <select name="sort" className={s.select_sort} onChange={handleSort}>
          <option value="default">by default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="nameAz">Name: A to Z</option>
          <option value="nameZa">Name: Z to A</option>
        </select>
      </label>
    </form>
  );
}

export default FilterBar;
