import React, { useState } from 'react'
import { arrayOf, string, shape } from 'prop-types';
import classes from './Gallery.module.css';
import Item from './Item';
import Modal from 'components/Modal';

const Gallery = ({ items }) => {
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState('');

    const toggleModal = () => {
        setShowModal(showModal => !showModal)
     };
    
    const handleClick = (value) => {
        setLargeImage(value)
        toggleModal();
    };
    return (
        <>
            <ul className={classes.root}>
                {items && items.map(({id, tags, webformatURL, largeImageURL}) => (
                    <li className={classes.item} key={id}>
                        <Item
                            image={webformatURL}
                            alt={tags}
                            largeImage={largeImageURL}
                            onClick={handleClick}
                            
                        />
                    </li>
                    )
                )}
            </ul>
            { showModal && 
                <Modal onClose={toggleModal}>
                    <img src={largeImage} alt="" />
                </Modal>
            }
        </>
    )
}; 

Gallery.propsTypes = { 
    items: arrayOf(
        shape({
            id: string.isRequired,
            webformatURL: string.isRequired,
            largeImageURL: string.isRequired,
            tags: string.isRequired,
        })
    )
}
export default Gallery;