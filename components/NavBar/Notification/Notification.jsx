import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// INTENAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const Notification = () => {
  const { fetchtransaction,currentAccount } = useContext(NFTMarketplaceContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const transactions = await fetchtransaction();
        console.log(transactions);
        // const formattedNotifications = transactions.forEach((tx) => {
        //   console.log(`Transaction hash: ${tx.hash}`);
        //   console.log(`Sender address: ${tx.from}`);
        //   console.log(`Recipient address: ${tx.to}`);
        //   console.log(`Value: ${web3.utils.fromWei(tx.value, "ether")} ether`);
        // });
  
        setNotifications(transactions);
      }
      catch (error) {
        console.error(error,"there are no transactions");
      }
    };
    fetchNotifications();
  }, []);

  return (
    // <div className={Style.notification}>
    //   <p>Notification</p>
    //   <div className={Style.notification_box}>
    //     <div className={Style.notification_box_img}>
    //       <Image src={images.user1} alt="Profile image" width={50} height={50} className={Style.notification_box_img} />
    //     </div>
    //     <div className={Style.notification_box_info}>
    //       <h4>Jackson Baker</h4>
    //       <p>Measure action your user...</p>
    //       <small>3 minute ago</small>
    //     </div>
    //     <span className={Style.notification_box_new}></span>
    //   </div>
    // </div>
    <div className={Style.notification}>
    
      <h2>Notifications</h2>
      <ul>
      {console.log(notifications)}
      {notifications && notifications.map((n) => (
        
          <li key={n.Hash}>
            {/* Display the notification details */}
            {/* <p>{n.Hash}</p> */}
            {/* <p>{n.method}</p> */}
            <p>{console.log(`Transaction hash: ${n.hash}`)}</p>
            <p>{ console.log(`Sender address: ${n.from}`)}</p>
            <p>{ console.log(`Recipient address: ${n.to}`)}</p>
            <p>{console.log(`Value: ${web3.utils.fromWei(n.value, "ether")} ether`)}</p>
            {/* <p>{n.Value}</p>
            <p>{n.TxnFee}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
