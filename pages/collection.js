import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner, CollectionProfile, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/ComponentIndex";
import Filter from "../components/Filter/Filter";
import { NFTMarketplaceContext, setError } from "../context/NFTMarketplaceContext.js";
const collection = () => {
  const { fetchNFTSbycatogory, fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [nftsCopys, setNftCopys] = useState([]);

  const [logo, setlogo] = useState(false);
  const [avatar, setavatar] = useState(false);
  const [crypto, setcryptopunks] = useState(false);
  const [art, setDigitalArt] = useState(false);
  const [photography, setphotography] = useState(false);
  const [musiccategory, setMusic_catgory] = useState(false);
  const [sports, setSportsMoments] = useState(false);
  const [weapon, setVirtualWeapons] = useState(false);
  const [ticket, setEventTickets] = useState(false);

  useEffect(() => {
    try {
      console.log(cursor);
      if (logo == true) {

        fetchNFTSbycatogory("Logo").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });

      }
      else if (avatar == true) {
        fetchNFTSbycatogory("Avatar").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      }
      else if (crypto == true) {
        fetchNFTSbycatogory("Cryptopunks").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      } else if (art == true) {
        fetchNFTSbycatogory("Digital Art").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      } else if (photography == true) {
        fetchNFTSbycatogory("Photography").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      } else if (musiccategory == true) {
        fetchNFTSbycatogory("Music").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      }
      else if (sports == true) {
        fetchNFTSbycatogory("Sports Moments").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      }
      else if (weapon == true) {
        fetchNFTSbycatogory("Virtual Weapons").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      }
      else if (ticket == true) {
        fetchNFTSbycatogory("Event Tickets").then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      }
      else if (cursor == false && search_ == undefined) {
        fetchNFTS().then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
          console.log("sososososo")
        });
      }
    }
    catch (error) {
      // setError("please reload the page");
    }
    []
  });


  const collectionArray = [
    {
      image: images.nft_image_1,
      name: "NFT_IMAGE1",
      price: "00.1",
      seller: "seller",
      tokenId: "1",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.nft_image_2,
      name: "NFT_IMAGE2",
      price: "1.4",
      seller: "seller",
      tokenId: "2",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.creatorbackground6,
      name: "NFT_IMAGE3",
      price: "0.42",
      seller: "seller",
      tokenId: "2",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.ai4,
      name: "NFT_IMAGE4",
      price: "0.28",
      seller: "seller",
      tokenId: "3",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.animal,
      name: "NFT_IMAGE5",
      price: "4",
      seller: "seller",
      tokenId: "4",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.bored2,
      name: "NFT_IMAGE6",
      price: "7",
      seller: "seller",
      tokenId: "5",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.ai4,
      name: "NFT_IMAGE7",
      price: "2",
      seller: "seller",
      tokenId: "6",
      description: "",
      tokenURI: "",
      owner: "",
    },
    {
      image: images.founder4,
      name: "NFT_IMAGE8",
      price: "2.5",
      seller: "seller",
      tokenId: "7",
      description: "",
      tokenURI: "",
      owner: "",
    },
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter
        setlogo={setlogo}
        setavatar={setavatar}
        setcryptopunks={setcryptopunks}
        setDigitalArt={setDigitalArt}
        setphotography={setphotography}
        setMusic_catgory={setMusic_catgory}
        setSportsMoments={setSportsMoments}
        setVirtualWeapons={setVirtualWeapons}
        setEventTickets={setEventTickets}
      />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
