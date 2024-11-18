import React, { useContext, useState } from 'react';
import DataContext from '../Context/DataContext';
import './Image.css';
import ImageCard from './ImageCard';
import loginData from '../Data/login.json'; // Importing the local data file

function Image() {
    const { username, saved, setSaved, images } = useContext(DataContext);
    const [savedImages, setSavedImages] = useState({}); // Track save status for each image by ID

    const saveImage = (image) => {
        const newUser = {
            username: username,
            image_id: image.id,
            image_urls: image.image_urls,
            image_alt: image.image_alt,
        };

        // Update saved images state locally
        setSaved((prev) => [...prev, newUser]);
        setSavedImages((prev) => ({ ...prev, [image.id]: true }));
    };

    return (
        <div className="image-gallery">
            {images.map((image) => (
                <ImageCard
                    key={image.id}
                    image={image}
                    onSave={() => saveImage(image)}
                    isSaved={!!savedImages[image.id]} // Check if this specific image is saved
                />
            ))}
        </div>
    );
}

export default Image;
