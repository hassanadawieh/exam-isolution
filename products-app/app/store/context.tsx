"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const DataContext = createContext();



export const DataProvider = ({ children }) => {
    
//change data here (url,token)
const URL_API = "http://127.0.0.1:8000/api/auth"
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzAwNjA0NzgwLCJleHAiOjE3MDA2MDgzODAsIm5iZiI6MTcwMDYwNDc4MCwianRpIjoiakp2NGM5TGthV1hoa1daRyIsInN1YiI6IjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ggWKfcbpJ9bdtDbSELZcQ64JRhvCrjxrHYPetLqKmtk";



  const [products, setProducts] = useState([]);
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL_API}/products`, {
        headers,
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
    }
  };

  // Fetch data 
  useEffect(() => {
    console.log(process.env.URL_API , process.env.API_TOKEN)
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ products, headers, fetchData, URL_API }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
