import React, { useState, useEffect, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/ComponentIndex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Loader } from "../components/ComponentIndex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext, setError } from "../context/NFTMarketplaceContext";

const searchPage = () => {
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

  const [cursor, setcursor] = useState(false);
  const [search_, setSearch_] = useState(null);
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
         
        });
      }
    }
    catch (error) {
      setError("please reload the page");
    }
    []
  });
  //Seacrh NFT Function
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setcursor(true);
    if (filteredNFTS.length == 0) {

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
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} setcursor={setcursor} setSearch_={setSearch_} />
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
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
