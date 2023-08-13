import React, { useContext, useEffect, useState } from "react";

//INTENAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Filter,
  NFTCard,
  BigNFTSlider,
  // Subscribe,
  Title,
  Category,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  // Brand,
  // Video,
  Loader,
} from "../components/ComponentIndex";
import { getTopCreators } from "../TopCreator/TopCreators";

import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const Home = () => {
  const { fetchNFTSbycatogory ,fetchNFTS} = useContext(NFTMarketplaceContext);
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
  
  //CRATOR LIST
  const creators = getTopCreators(nfts);
  console.log(creators);

  useEffect(() => {
   
    if(logo==true){
    
      fetchNFTSbycatogory("Logo").then((item) => {
        setNFTs(item.reverse());
        setNftCopys(item);
      });
   
  } 
  else if(avatar==true){
    fetchNFTSbycatogory("Avatar").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
  else if(crypto==true){
    fetchNFTSbycatogory("Cryptopunks").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  } else if(art==true){
    fetchNFTSbycatogory("Digital Art").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  } else if(photography==true){
    fetchNFTSbycatogory("Photography").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  } else if(musiccategory==true){
    fetchNFTSbycatogory("Music").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
  else if(sports==true){
    fetchNFTSbycatogory("Sports Moments").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
  else if(weapon==true){
    fetchNFTSbycatogory("Virtual Weapons").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
  else if(ticket==true){
    fetchNFTSbycatogory("Event Tickets").then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
  else {
    fetchNFTS().then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
    });
  }
   []});

  return (
    <div className={Style.homePage}>
      <HeroSection />
      {creators.length == 0 ? <Loader /> : <FollowerTab TopCreator={creators} />}
      <BigNFTSlider />
      <Slider />
      <Title heading="Audio Collection" paragraph="Discover the most outstanding NFTs in all topics of life." />
      <AudioLive />
      <Collection />
      
      <Title heading="Featured NFTs" paragraph="Discover the most oustanding NFTs in all topics of life." />
     
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
    
   
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <Title heading="Browse by category" paragraph="Explore the NFTs in the most featured categories." />
      <Category />
      <Title
        heading="Connect Your Wallet"
        paragraph="Connect with wallet, discover, buy NTFs, sell your NFTs and earn money"
      />
      <Service />
      
      {/* <Title heading="New Collection" paragraph="Discover the most oustanding NFTs in all topics of life." /> */}
      
     
      
      {/* <Subscribe />

     

      <Brand />
      <Video /> */}
    </div>
  );
};

export default Home;
