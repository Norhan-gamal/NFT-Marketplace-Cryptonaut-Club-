import React, { useState ,useEffect,useContext} from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";
import { useRouter } from "next/router";
import Router from "next/router";
import { NFTMarketplaceContext, setError } from "../../context/NFTMarketplaceContext";

const Category = () => {
  //const [selectedCategory, setSelectedCategory] = useState(null);
  // const { fetchNFTSbycatogory } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const router = useRouter();

  const CategoryArray = [
    {
      background: images.logo1,
      name: "Logo",
      url:"./logo1.png"
    },
    {
      background: images.Entertainment,
      name: "Avatar",
    },
    {
      background: images.c1,
      name: "Cryptopunks",
    },
    {
      background: images.artt,
      name: "Digital Art",
    },
    {
      background: images.ph1,
      name: "Photography",
    },
    {
      background: images.music,
      name: "Music",
    },
    {
      background: images.sportsmom,
      name: "Sports Moments",
    },
    {
      background: images.vir,
      name: "virtual weapons",
    },
    {
      background: images.tic,
      name: "Event Tickets",
    },
   
  ];

  
  const handleClick = (category) => {
    try {
      // Set the selected category and background URL in the URL query parameters
      const queryParams = new URLSearchParams();
      queryParams.set("category", category);
      // queryParams.set("backgroundURL", backgroundURL);
      router.push(`/search2?${queryParams.toString()}`);
    } catch (error) {
      setError("Please reload the page");
    }
  };

   return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((element, Ikey) => (
          <div
            className={Style.category_box}
            key={Ikey + 1}
            onClick={() => handleClick(element.name)}
          >
            <Image
              src={element.background}
              className={Style.category_box_image}
              alt="Background Image"
              width={400}
              height={250}
            />
            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>{element.name}</h4>
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Category;
