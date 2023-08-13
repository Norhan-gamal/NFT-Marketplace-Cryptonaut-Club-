import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";

const NFTDetailsImg = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [catgory, setCategory] = useState(true);
  const [like, setLike] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(true);
  const openDescription = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };
  const openCatgory = () => {
    if (!catgory) {
      setCategory(true);
    } else {
      setCategory(false);
    }
  };
  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  fetch(nft.tokenURI)
  .then(response => response.json())
  .then(data => {
    setselectedCategory(data.selectedCategory);
    console.log(selectedCategory);
  })
  .catch(error => {
    console.error('Error fetching IPFS link:', error);
  });

 
  return (

    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          {/* Like NFT */}
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiOutlineHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
              ) : (
                <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
              )}
              <span>23</span>
            </p>
          </div>

          {/* NFT Image */}
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={nft.image || images.creatorbackground1}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={600}
            />
          </div>
        </div>

        {/*NFT Description  */}
        <div className={Style.NFTDetailsImg_box_description} onClick={() => openDescription()}>
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}

        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.description}</p>
          </div>
        )}


        {console.log(nft.tokenURI)}
        {/*NFT category  */}
        <div className={Style.NFTDetailsImg_box_description} onClick={() => openCatgory()}>
          <p>Category</p>
          {catgory ? <TiArrowSortedUp /> : <TiArrowSortedDown />}

        </div>
       
        {catgory && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            
            <p>{selectedCategory}</p>
           
          </div>
        )}



        {/*NFT Details */}
        <div className={Style.NFTDetailsImg_box_details} onClick={() => openDetails()}>
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              <small>Contract Address : </small>
              <br></br>
              {nft.seller}
            </p>
            <p>
              <small>Token ID : </small>
              {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
