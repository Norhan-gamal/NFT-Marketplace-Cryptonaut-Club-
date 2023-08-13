import React, { useState, useContext,useEffect } from "react";

import { FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaMusic, FaVideo, FaImages, FaUserAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiThList, TiTick } from "react-icons/ti";
//INTERNAL IMPORT
import Style from "./Filter.module.css";


const Filter = ({setlogo,setavatar,setcryptopunks,setDigitalArt,setphotography,setMusic_catgory,setSportsMoments,setVirtualWeapons,setEventTickets}) => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);
  const [activeBtn, setActiveBtn] = useState(1);
  

  // FUNCTIONS

  const openTab = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Logo") {
     
      setlogo(true);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(1);
      
    } 
    else if (btnText == "Avatar") {
     
      setlogo(false);
      setavatar(true);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(2);
    } 
    else if (btnText == "Cryptopunks") {
     
      setlogo(false);
      setavatar(false);
      setcryptopunks(true);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(3);
    } 
    else if (btnText == "Digital Art") {
     
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(true);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(4);
    } 
    else if (btnText == "Photography") {
   
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(true);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(5);
    }
    else if (btnText == "Music") {
    
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(true);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(6);
    }
    else if (btnText == "Sports Moments") {
     
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(true);
      setVirtualWeapons(false);
      setEventTickets(false);
      setActiveBtn(7);
    }
    else if (btnText == "Virtual Weapons") {
     
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(true);
      setEventTickets(false);
      setActiveBtn(8);
    }
    else if (btnText == "Event Tickets") {
    
      setlogo(false);
      setavatar(false);
      setcryptopunks(false);
      setDigitalArt(false);
      setphotography(false);
      setMusic_catgory(false);
      setSportsMoments(false);
      setVirtualWeapons(false);
      setEventTickets(true);
      setActiveBtn(9);
    }
  };

  const openFilter = () => {
    if (!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  const openImage = () => {
    if (!image) {
      setImage(true);
    } else {
      setImage(false);
    }
  };

  const openVideo = () => {
    if (!video) {
      setVideo(true);
    } else {
      setVideo(false);
    }
  };

  const openMusic = () => {
    if (!music) {
      setMusic(true);
    } else {
      setMusic(false);
    }
  };

  return (
    <div className={Style.filter}>
     
      <div className={Style.filter_box}>
        {/* Left section */}
        <div className={Style.filter_box_left}>
          <button className={`${activeBtn == 1 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Logo</button>
          <button className={`${activeBtn == 2 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Avatar</button>
          <button className={`${activeBtn == 3 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Cryptopunks</button>
          <button className={`${activeBtn == 4 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Digital Art</button>
          <button className={`${activeBtn == 5 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Photography</button>
          <button className={`${activeBtn == 6 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Music</button>
          <button className={`${activeBtn == 7 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Sports Moments</button>
          <button className={`${activeBtn == 8 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Virtual Weapons</button>
          <button className={`${activeBtn == 9 ? Style.active : ""}`} onClick={(e) => openTab(e)}>Event Tickets</button>
        </div>
        
       

        {/* Right section */}
        <div className={Style.filter_box_right}>
          <div className={Style.filter_box_right_box} onClick={() => openFilter()}>
            <FaFilter />
            <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>
         
      {/* Filter item Menu Filter */}
      {filter && (
        <div className={Style.filter_box_items}>
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaWallet />
              <span>10ETH</span>
              <AiFillCloseCircle />
            </div>
          </div>

          {/* Filter item Transaction Image*/}
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item_trans} onClick={() => openImage()}>
              <FaImages />
              <small>Images</small>
              {image ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          {/* Filter item Transaction Video*/}
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item_trans} onClick={() => openVideo()}>
              <FaVideo />
              <small>Video</small>
              {video ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          {/* Filter item Transaction Music*/}
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item_trans} onClick={() => openMusic()}>
              <FaMusic />
              <small>Music</small>
              {music ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          {/* Filter item Verified*/}
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaUserAlt />
              <span>Verified</span>
              <MdVerified />
            </div>
          </div>
        </div>
      )}
      
     
    </div>
  );
};

export default Filter;
