import React, { useState, useEffect, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/ComponentIndex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Loader } from "../components/ComponentIndex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import { Title } from "../components/ComponentIndex";
//SMART CONTRACT IMPORT
import { NFTMarketplaceContext, setError } from "../context/NFTMarketplaceContext";

const search2 = () => {
  const { fetchNFTSbycatogory, fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [nftsCopys, setNftCopys] = useState([]);

  const [cursor, setcursor] = useState(false);
  const [search_, setSearch_] = useState(null);
  const [category1,setcategory1]=useState("");
  const [photo,setphoto]=useState("");
  useEffect(() => {
    try {
     
        const queryParams = new URLSearchParams(window.location.search);
        const category = queryParams.get("category");
        // const photo1= queryParams.get("backgroundURL");
        setcategory1(category);
        // setphoto(photo1);
        // console.log(photo1);
      if (category) {
        // Fetch NFTs based on the selected category
        console.log(category);
        fetchNFTSbycatogory(category).then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
        });
      } else if (cursor === false && search_ === undefined) {
        fetchNFTS().then((item) => {
          setNFTs(item.reverse());
          setNftCopys(item);
          console.log("sososososo");
        });
      }
    } catch (error) {
      // setError("Please reload the page");
    }
  }, []);
  
  //Seacrh NFT Function
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setcursor(true);
    if (filteredNFTS.length === 0) {
      setNFTs(nftsCopys);
    } else {
      setNFTs(filteredNFTS);
    }
  };

  //Clear search NFT function
  const onClearSearch = () => {
    if (nfts.length && nftsCopys.length) {
      setNFTs(nftsCopys);
    }
  };

  return (
    <div className={Style.searchPage}>
     {console.log(photo)}
     <Banner bannerImage={images.creatorbackground1} />
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} setcursor={setcursor} setSearch_={setSearch_} />
      <Title heading={`${category1} NFTs`} paragraph="Explore the NFTs in the most featured categories." />
      {nfts.length === 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default search2;
