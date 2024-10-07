import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/images/404.svg";
import s from "./index.module.css";

function NotFoundPage() {
  return (
    <div className={s.not_found_page_container}>
      <img className={s.notFoundImage} src={notFound} alt="Bag Icon" />
      <h1 className={s.not_found_title}>Page Not Found</h1>
      <p className={s.not_found_text}>
        We’re sorry, the page you requested could not be found.
      </p>

      <p className={s.not_found_text}>Please go back to the homepage.</p>

      <Link to="/">
        <button className={s.not_found_button}>Go Home</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
