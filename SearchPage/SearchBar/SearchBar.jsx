import React, { useState, useEffect } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";
const SearchBar = ({ onHandleSearch, onClearSearch , setcursor,setSearch_}) => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
 
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 5000);
    setcursor(true);
    setSearch_(searchItem);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      console.log(search);
      onHandleSearch(search);
      setSearch_(search);
      setcursor(true);
    } else {
      onClearSearch();
      setcursor(false);
    }
  }, [search]);

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Type your keyword..."
          onChange={(e) => setSearch(e.target.value) }
         
          // value={searchItem}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
