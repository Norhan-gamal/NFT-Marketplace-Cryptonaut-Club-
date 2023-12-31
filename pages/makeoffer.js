import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/From/Form.module.css";
import { Button } from "../components/ComponentIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const reSellToken = () => {
  const { make_offer ,fetchNFTSbycatogory} = useContext(NFTMarketplaceContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('"');
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const mk_offer = async () => {
    try {
      await make_offer(id,price);
     //await fetchNFTSbycatogory();
      router.push("/author");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>Make an offer</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="reSell price"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} className={Style.reSellToken_box_image_img} />
          )}
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="make offer" handleClick={() => mk_offer()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
