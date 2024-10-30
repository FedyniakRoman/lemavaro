import React, { useState } from "react";
import s from "./index.module.css";
import arms from "../../assets/images/arms.svg";
import backendUrl from "../../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.
import { useForm } from "react-hook-form";

function DiscountForm() {
  const [isSend, setIsSend] = useState(false); // Состояние для отслеживания отправки формы

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const userData = (data) => {
    console.log({
      id: Date.now(), // Генерация уникального ID
      ...data,
    });
    // Отправка данных на сервер с помощью fetch
    fetch(`${backendUrl}/sale/send`, {
      method: "POST", // Метод отправки данных
      headers: {
        "Content-Type": "application/json", // Указываем, что данные в формате JSON
      },
      body: JSON.stringify(userData), // Преобразуем объект userData в JSON-строку
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при отправке формы");
        }
        return response.json(); // Парсим ответ от сервера
      })
      .then((data) => {
        console.log("Ответ сервера:", data); // Обрабатываем данные, полученные от сервера
      })
      .catch((error) => {
        console.error("Ошибка:", error); // Обрабатываем ошибки
      });
    setIsSend(true); // Устанавливаем состояние отправки
    reset(); // Сбрасываем форму
  };

  const registerName = register("name", {
    required: '*The field "Name" is required', // Сообщение об ошибке
  });

  const registerPhone = register("phone", {
    required: '*The field "Phone" is required',
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, // Регулярное выражение для проверки телефона
      message: "You entered the wrong phone.",
    },
  });

  const registerEmail = register("email", {
    required: '*The field "Email" is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "You entered the wrong e-mail.",
    },
  });

  return (
    <div className={s.form_container}>
      <h1 className={s.form_title}>5% off on the first order</h1>
      <div className={s.form_and_image_container}>
        <img className={s.form_image} src={arms} alt="Arms with tools" />
        <form className={s.main_form} onSubmit={handleSubmit(userData)}>
          <input
            type="text"
            placeholder="Name"
            className={s.input_field}
            {...registerName}
          />
          {errors.name && <p>{errors.name?.message}</p>}
          <input
            type="tel"
            placeholder="Phone number"
            className={s.input_field}
            {...registerPhone}
          />
          {errors.phone && <p>{errors.phone?.message}</p>}
          <input
            type="email"
            placeholder="Email"
            className={s.input_field}
            {...registerEmail}
          />
          <button type="submit" className={s.submit_button}>
            {isSend ? "Apply Discount" : "Get a Discount"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiscountForm;
