import React from 'react'
import s from "./index.module.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
// import mapIcon from './assets/image/map.svg'


export default function Footer() {
  return (
    <div className={s.nav_info_footer}>
        <h1>Contact</h1>

<div class="info_footer">
    <div class="column">
            <span class="label">Phone</span>
            <span class="number">+49 999 999 99 99</span>
    </div>
    <div class="column">
        <span class="socials">Socials</span>
        <span class="icon" ></span>  
          
          <RiInstagramFill size={44} color="black" />
          <IoLogoWhatsapp size={44} color="black" /> 
    </div>
    <div class="column">
        <span class="address">Address</span>
        <span class="address_detail">Linkstrasse 2, 8 OG, 10785, Berlin, Deutschland</span>
    </div>
    <div class="column">
        <span class="working">Working Hours </span>
        <span class="working_hours">24 hours a day</span>
    </div>
</div>
<img src="assets/image/map.svg" alt="Map"/>
    </div>
  )
}
