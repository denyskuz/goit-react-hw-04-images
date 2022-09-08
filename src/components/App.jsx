import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { fetchImages, pageSize } from "../services/api";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import classes from './App.module.css'

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState([]);

  useEffect(() => { 
    if (searchName !== '') {
      setLoading(true);
      fetchImages({ searchName, currentPage })
        .then(data => { 
          if (currentPage === 1) {
            setItems(() => data.hits.length ? [...data.hits] : [])
          } else {
            setItems(items => data.hits.length ? [...items, ...data.hits] : [])
          }
          setLoading(false);
          setTotalHits(data.totalHits)
        }
        )
        .catch(error => console.log(error))
        .finally(() => {
            setLoading(false);
        });
    }

  }, [searchName, currentPage])
  
  const handleSubmit = (value) => {
    setSearchName(value);
    setCurrentPage(1);
 
  };

  const handleLoadMore = () => {
    setCurrentPage(page => page + 1);
  };

  const totalPages = totalHits / pageSize;
  return (
    <div className={classes.container}>
      <SearchBar onSubmit={handleSubmit} loading={isLoading} />
      {items ? <ImageGallery items={items} /> : 'Please try to enter another name'}
      {totalPages > currentPage && <Button onClick={handleLoadMore} />}
      <ToastContainer  autoClose={2000} />
    </div> 
  )
}
