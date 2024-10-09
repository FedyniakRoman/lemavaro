import React from 'react';
import s from "./index.module.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import 'leaflet/dist/leaflet.css'
import MapComponent from '../../assets/MapComponent/MapComponent';



export default function Footer() {
  return (
    <div className={s.container_footer}>
      <h1>Contact</h1>

      <div className={s.info_footer}>
        <div className={s.column}>
          <span className={s.label}>Phone</span> 
          <span className={s.number}>+49 999 999 99 99</span>
        </div>
        <div className={s.column}>
          <span className={s.socials}>Socials</span>
          <div className={s.icons}>  
            <RiInstagramFill size={44} color="black" />
            <IoLogoWhatsapp size={44} color="black" />
          </div>
        </div>
        <div className={s.column}>
          <span className={s.address}>Address</span>
          <span className={s.address_detail}>Linkstrasse 2, 8 OG, 10785, Berlin, Deutschland</span>
        </div>
        <div className={s.column}>
          <span className={s.working}>Working Hours</span>
          <span className={s.working_hours}>24 hours a day</span>
        </div>
      </div>

      <img className={s.mapComponent} src={MapComponent} alt="Map" />
    </div>
  );
}
