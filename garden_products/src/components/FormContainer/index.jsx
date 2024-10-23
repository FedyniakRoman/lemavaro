import React, { useState } from "react";
import s from "./index.module.css";
import arms from "../../assets/images/arms.svg";
import backendUrl from "../../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.

function DiscountForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Отправка данных на сервер с помощью fetch
    fetch(`${backendUrl}/sale/send`, { 
      method: 'POST', // тут нам нужно еще над ссылкой прорабоать и разобраться
      headers: {
        'Content-Type': 'application/json', // Указываем, что данные в формате JSON
      },
      body: JSON.stringify(formData), // Преобразуем объект formData в JSON-строку
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при отправке формы');
        }
        return response.json(); // Парсим ответ от сервера
      })
      .then((data) => {
        console.log('Ответ сервера:', data); // Обрабатываем данные, полученные от сервера

      })
      .catch((error) => {
        console.error('Ошибка:', error); // Обрабатываем ошибки
        
      });
  };

  return (
    <div className={s.form_container}>
      <h1 className={s.form_title}>5% off on the first order</h1>
      <div className={s.form_and_image_container}>
      <img className={s.form_image} src={arms} alt="Arms with tools" />
        <form className={s.main_form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={s.input_field}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={s.input_field}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={s.input_field}
          />
          <button type="submit" className={s.submit_button}>
            Get a discount
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiscountForm;
