
import { useSelector } from "react-redux";
import s from "./index.module.css";

function OrderForm({ addNewOrder, clearCart, setIsModalOpen }) {  
    const cartState = useSelector((store) => store.cart);

    // Рассчитываем общую сумму заказа
    let totalSum = cartState.reduce((acc, elem) => {
        return elem.discont_price !== null
            ? acc + (elem.discont_price * elem.count)
            : acc + (elem.price * elem.count);
    }, 0);

    // Обработчик отправки формы
    const submitOrder = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        const { name, phone, email } = event.target; // Получаем данные из формы
        const newOrder = {
            id: Date.now(), // Создаем уникальный ID заказа
            name: name.value,
            phone: phone.value,
            email: email.value
        };
        addNewOrder(newOrder); // Отправляем заказ
        clearCart(); // Очищаем корзину после заказа
        setIsModalOpen(true);  // Открываем модальное окно для подтверждения
        event.target.reset(); // Очищаем форму
    };

    return (
        <div className={s.order_container}>
            <h3 className={s.order_title}>Order details</h3>
            <p className={s.total_items}>{`${cartState.length} items`}</p>
            <div className={s.total_price_box}>
                <p className={s.total_title}>Total</p>
                <p className={s.total_sum}>{`$${totalSum}`}</p>
            </div>
            <form onSubmit={submitOrder} className={s.order_form}>
                <input type="text" placeholder="Name" name="name" className={s.input} />
                <input type="tel" placeholder="Phone number" name="phone" className={s.input} />
                <input type="email" placeholder="Email" name="email" className={s.input} />
                <button className={s.form_button}>Checkout</button>
            </form>
        </div>
    );
}

export default OrderForm;
