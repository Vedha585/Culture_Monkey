import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../Context/DataContext';
import './Image.css'; // Reusing styles from Image.css
import ImageCard from '../Components/ImageCard'; // Ensure correct path
import NavBar from './Navbar'; // Import the NavBar component
import loginData from '../Data/login.json'; // Import local JSON file

function SavedImages() {
    const { username } = useContext(DataContext); // Get the current username from context
    const [savedImages, setSavedImages] = useState([]);

    useEffect(() => {
        const fetchSavedImages = () => {
            // Get the users array from loginData
            const userImages = loginData.users.filter(user => user.username === username);

            if (userImages.length > 0) {
                // Map over the filtered user images to format them for display
                const formattedImages = userImages.map(image => ({
                    id: image.image_id, // Unique ID for the image
                    urls: { small: image.image_urls }, // URL of the image
                    alt_description: image.image_alt // Alt description of the image
                }));

                setSavedImages(formattedImages);
            } else {
                setSavedImages([]); // Clear the saved images if no match found
            }
        };

        fetchSavedImages();
    }, [username]);

    return (
        <>
            {/* Include the NavBar component at the top */}
            <NavBar />

            {/* Display the saved images gallery */}
            <div className="image-gallery">
                {savedImages.length > 0 ? (
                    savedImages.map((image) => (
                        <ImageCard
                            key={image.id}
                            image={image} // Pass the image data to ImageCard
                            isSaved={true} // Indicates that these are saved images
                        />
                    ))
                ) : (
                    <p>No saved images found for this user.</p>
                )}
            </div>
        </>
    );
}

export default SavedImages;
