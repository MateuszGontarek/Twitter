import React from "react";
import "./Search.scss";
import axios from "axios";
import { useState } from "react";

const Search = () => {

  
  
  return (
    <div className="Search-Box">
      <div>
        <form className="Search-Form">
          <div className="Search-Input"><input type="text"/></div>
          <div className="Search-Button"><button>Wyszukaj</button></div>
        </form>
      </div>
    </div>
  );
};

export default Search;
