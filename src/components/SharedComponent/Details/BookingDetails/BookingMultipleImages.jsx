import React, { useState } from "react";
import styles from "../details.module.css";
import { FaTimes } from "react-icons/fa";

const BookingMultipleImages = ({ content = {}, baseUrl = "", titles = {} }) => {
  // State to manage images for each category with fallback to empty array
  const [imageData, setImageData] = useState({
    galleryImages: content.galleryImages || [],
    vehicleRegImages: content.vehicleRegImages || [],
    carImages: content.carImages || [],
    licenseImages: content.licenseImages || [],
    typeImages: content.typeImages || [],
    tyreImages: content.tyreImages || [],
  });

  // Image types list for dynamic rendering
  const imageTypes = [
    { key: "galleryImages", title: titles.galleryImages || "Gallery Images" },
    { key: "vehicleRegImages", title: titles.vehicleRegImages || "Vehicle Registration Images" },
    { key: "carImages", title: titles.carImages || "Car Images" },
    { key: "licenseImages", title: titles.licenseImages || "License Images" },
    { key: "typeImages", title: titles.typeImages || "Type Images" },
    { key: "tyreImages", title: titles.tyreImages || "Tyre Images" },
  ];

  // Handler to remove image from array
  const handleRemoveImage = (index, imageType) => {
    setImageData((prevData) => ({
      ...prevData,
      [imageType]: prevData[imageType].filter((_, imgIndex) => imgIndex !== index),
    }));
  };

  // Render image block
  const renderImageBlock = (images, title, imageType) => (
    <div className="col-12" key={imageType}>
      <div className={styles.customInfoBlock}>
        <span className={styles.customInfoHeading}>{title}</span>
        <div className={styles.customGalleryImages}>
          {images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((image, index) => {
              const imageUrl = `${baseUrl}${image}`;
              return (
                <div key={index} className={styles.customImageWrapper}>
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className={styles.customGalleryImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png"; // Fallback image
                    }}
                  />
                  <button
                    className={styles.customRemoveButton}
                    onClick={() => handleRemoveImage(index, imageType)}
                  >
                    <FaTimes />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.customImageMainSection}>
      <div className={styles.customImageContainer}>
        <div className={styles.customInfoContainer}>
          {imageTypes.map(({ key, title }) => (
            // For each image type, render its container with title and images
            <div className={styles.customInfoContainer} key={key}>
              {renderImageBlock(imageData[key], title, key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingMultipleImages;
