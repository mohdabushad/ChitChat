import React from "react";

const Showimg = ({ imagePreview }) => {
  if (!imagePreview) return null;

  return (
    <img
      src={imagePreview}
      alt="Preview"
      className="
        max-w-full
        max-h-[80vh]
        object-contain
        rounded-lg
      "
    />
  );
};

export default Showimg;
