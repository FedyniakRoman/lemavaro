import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import s from "./index.module.css";

function OrderForm({ addNewOrder, setIsModalOpen }) {
  const cartState = useSelector((store) => store.cart);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // Рассчитываем общую сумму заказа
  let totalSum = cartState.reduce((acc, elem) => {
    return elem.discont_price !== null
      ? acc + elem.discont_price * elem.count
      : acc + elem.price * elem.count;
  }, 0);

  const order = (data) => {
    console.log({
      ...data,
      cart: cartState,
      sum: totalSum.toFixed(2),
    });
    addNewOrder(data); // Отправляем заказ
    setIsModalOpen(true); // Открываем модальное окно для подтверждения
    reset();
  };
  const registerName = register('name', {
    required: '*The field "Name" is required'
  });

  const registerPhone = register('phone', {
    required: '*The field "Phone" is required',
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      message: 'You entered the wrong phone.'
    }
  });

  const registerEmail = register('email', {
    required: '*The field "Email" is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'You entered the wrong e-mail.'
    }
  });

  return (
    <div className={s.order_container}>
      <h3 className={s.order_title}>Order details</h3>
      <p className={s.total_items}>{`${cartState.length} items`}</p>
      <div className={s.total_price_box}>
        <p className={s.total_title}>Total</p>
        <p className={s.total_sum}>{`$${totalSum.toFixed(2)}`}</p>
      </div>
      <form className={s.order_form} onSubmit={handleSubmit(order)}>
        <input type="text" placeholder="Name" className={s.input} {...registerName} />
        {
          errors.name && <p>{errors.name?.message}</p>
        }
        <input
          type="tel"
          placeholder="Phone number"
          className={s.input}
          {...registerPhone}
        />
        {
          errors.phone && <p>{errors.phone?.message}</p>
        }
        <input
          type="email"
          placeholder="Email"
          className={s.input}
          {...registerEmail} 
        />
            {
          errors.email && <p>{errors.email?.message}</p>
        }
        <button className={s.form_button}>Checkout</button>
      </form>
    </div>
  );
}

export default OrderForm;
