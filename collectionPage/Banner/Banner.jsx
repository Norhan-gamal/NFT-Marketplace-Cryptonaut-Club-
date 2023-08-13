import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image src={bannerImage} className={Style.banner_img_img} alt="background" height={430} width={430} />
      </div>

      <div className={Style.banner_img_mobile}>
        <Image src={bannerImage} className={Style.banner_img_img} alt="background" height={430}  width={430}/>
      </div>
    </div>
  );
};

export default Banner;
