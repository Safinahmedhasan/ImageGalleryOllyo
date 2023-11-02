import React, { useEffect, useState } from "react";
import Container from "../Container/Container";
import { BsImages } from "react-icons/bs";
import { toast } from "react-toastify";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const data = [
  {
    id: "item-1",
    imageUrl: "https://i.ibb.co/JmLhtQm/image-11.jpg",
  },
  {
    id: "item-2",
    imageUrl: "https://i.ibb.co/KDVt9rC/image-9.webp",
  },
  {
    id: "item-3",
    imageUrl: "https://i.ibb.co/ynBDqxY/image-10.jpg",
  },
  {
    id: "item-4",
    imageUrl: "https://i.ibb.co/8gwdb0X/image-7.webp",
  },
  {
    id: "item-5",
    imageUrl: "https://i.ibb.co/h7DGbL4/image-6.webp",
  },
  {
    id: "item-6",
    imageUrl: "https://i.ibb.co/vBNRLnC/image-5.webp",
  },
  {
    id: "item-7",
    imageUrl: "https://i.ibb.co/dg63mHq/image-4.webp",
  },
  {
    id: "item-8",
    imageUrl: "https://i.ibb.co/HFvJ8m4/image-3.webp",
  },
  {
    id: "item-9",
    imageUrl: "https://i.ibb.co/88Y4CTZ/image-2.webp",
  },
  {
    id: "item-10",
    imageUrl: "https://i.ibb.co/543LW3w/image-1.webp",
  },
  {
    id: "item-11",
    imageUrl: "  https://i.ibb.co/Dgs31Pb/image-8.webp",
    label: "Add Images", // Add a label property to the "Add Images" object
  },
];

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addImages = (files) => {
    const filesArray = Array.from(files); // Convert files to an array
    filesArray.forEach((file) => {
      uploadedFiles.push({
        id: `item-${uploadedFiles.length + 1}`,
        imageUrl: URL.createObjectURL(file),
      });
    });
    setUploadedFiles([...uploadedFiles]); // Trigger a state update to render the new images.
  };

  useEffect(() => {
    setImages([...uploadedFiles]);
    console.log("uploadedFiles:", uploadedFiles); // Add this line to check the state
  }, [uploadedFiles]);

  useEffect(() => {
    setImages([...data]); // Initialize images from the data
  }, []);

  // The function getImageGridStyles is a custom utility function in your React component that computes a CSS class name based on the index provided as an argument.
  const getImageGridStyles = (index) => {
    switch (index) {
      case 0:
        return "col-span-2 row-span-2";
      case 1:
        return "col-start-3";
      case 2:
        return "col-start-4";
      case 3:
        return "col-start-5";
      case 4:
        return "col-start-3 row-start-2";
      case 5:
        return "col-start-4 row-start-2";
      case 6:
        return "col-start-5 row-start-2";
      default:
        return "row-start-3";
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index); // Set the index being dragged
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const imagesCopy = [...images];
    const [draggedItem] = imagesCopy.splice(draggedIndex, 1);
    imagesCopy.splice(index, 0, draggedItem);
    setImages(imagesCopy);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const labelItem = data.find((item) => item.label === "Add Images");

  const handleCheckboxChange = (image) => {
    if (selectedFiles.includes(image)) {
      // If the image is already selected, remove it from the selected files.
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((file) => file !== image)
      );
    } else {
      // If the image is not selected, add it to the selected files.
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, image]);
    }
  };

  // Deleted Section and function
  const deleteText = selectedFiles.length > 1 ? "Delete files" : "Delete file";

  const handleDeleteSelectedFiles = () => {
    const deletedFileCount = selectedFiles.length;
    const updatedImages = images.filter(
      (image) => !selectedFiles.includes(image)
    );
    setImages(updatedImages);
    setSelectedFiles([]); // Clear the selected files array

    // Show a toast notification with the deleted file count
    const toastMessage = `${deletedFileCount} ${
      deletedFileCount > 1 ? "files" : "file"
    } deleted successfully`;
    toast.success(toastMessage, {
      position: "top-right",
      autoClose: 3000, // Close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  // ThemeMode
  const handleThemeChange = () => {
    setIsDarkMode((prevMode) => {
      document.body.classList.toggle("dark-theme", !prevMode);
      document.body.classList.toggle("light-theme", prevMode);
      return !prevMode;
    });
  };

  return (
    <div>
      <Container>
        <div className="flex mt-10 justify-end">
          <ThemeSwitcher
            handleThemeChange={handleThemeChange}
            isDarkMode={isDarkMode}
          />
        </div>
        <div
          className={`bg-white p-10 rounded-3xl mt-10 shadowEx mb-10 ${
            isDarkMode ? "dark-theme" : "light-theme"
          }`}
        >
          <h1 className="flex justify-between p-5 border-b-2 mb-5">
            <p className="text-xl font-bold">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} Selected file${
                    selectedFiles.length > 1 ? "s" : ""
                  }`
                : "Gallery"}
            </p>

            {selectedFiles.length > 0 && (
              <button
                className="text-red-500 font-bold"
                onClick={() => handleDeleteSelectedFiles()}
              >
                {deleteText}
              </button>
            )}
          </h1>
          <div className="md:grid grid-cols-5 gap-5">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`relative ${getImageGridStyles(
                  index
                )} image-container`}
                onMouseEnter={() => {
                  const inputElement = document.getElementById(
                    `input-${image.id}`
                  );
                  if (!selectedFiles.includes(image)) {
                    inputElement.style.display = "block";
                    inputElement.style.zIndex = "1";
                  }
                }}
                onMouseLeave={() => {
                  const inputElement = document.getElementById(
                    `input-${image.id}`
                  );
                  if (!selectedFiles.includes(image)) {
                    inputElement.style.display = "none";
                    inputElement.style.zIndex = "0";
                  }
                }}
              >
                <input
                  type="checkbox"
                  id={`input-${image.id}`}
                  className="absolute top-0 left-0 ml-2 mt-2"
                  onChange={() => handleCheckboxChange(image)}
                  checked={selectedFiles.includes(image)}
                />
                <label
                  htmlFor={`input-${image.id}`}
                  className="absolute top-0 left-0 ml-2 mt-2"
                  style={{ display: "none" }}
                ></label>
                <img
                  src={image.imageUrl}
                  alt={`Image ${image.id}`}
                  className="w-full rounded-lg bg-white border-2 border-gray-500 image-zoom md:mb-0 mb-10"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => allowDrop(e)}
                  onDrop={(e) => handleDrop(e, index)}
                />
              </div>
            ))}

            <div className="col-start-5 row-start-3 w-full font-bold flex justify-center items-center flex-col border-dotted border-gray-500 border-4 rounded-2xl h-60 md:h-auto">
              <div>{labelItem.label}</div>
              <label htmlFor="file-input" className="cursor-pointer">
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }} // Ensure this line remains unchanged
                  multiple
                  onChange={(e) => addImages(e.target.files)}
                />
                <span role="img" aria-label="Gallery Icon" className="mr-2">
                  <BsImages></BsImages>
                </span>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ImageGallery;
