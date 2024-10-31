import React from 'react';
import s from "./index.module.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className={s.container_footer}>
      <h1>Contact</h1>

      <div className={s.info_footer}>
        <div className={s.colum}>
          <span className={s.label}>Phone</span> 
          <span className={s.number}>+49 999 999 99 99</span>
        </div>
        <div className={s.colum}>
          <span className={s.socials}>Socials</span>
          <div className={s.icons}>  
          <RiInstagramFill onClick={() => window.open("https://www.instagram.com/startainstitute/", "_blank")} size={44} />
          <IoLogoWhatsapp onClick={() => window.open("https://wa.me/4915735999409", "_blank")} size={44} />
          </div>
        </div>
        <div className={s.colum}>
          <span className={s.address}>Address</span>
          <span className={s.address_detail}>Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</span>
        </div>
        <div className={s.colum}>
          <span className={s.working}>Working Hours</span>
          <span className={s.working_hours}>24 hours a day</span>
        </div>
      </div>
      
      <div className={s.map_container}>
        <iframe
          className={s.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4092216354006!2d13.375044699999998!3d52.5079329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sde!4v1727974267048!5m2!1suk!2sde"
          width="500"
          height="450"
          style={{border:0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tel-Ran"
        ></iframe>
      </div>
    </div>
  );
}
