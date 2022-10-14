import React from "react";

const PreviewImage = ({ img }) => {
  const [preview, setPreview] = React.useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    setPreview(reader.result);
  };
  // console.log(preview);
  return (
    <div>
      {preview ? (
        <img
          src={preview}
          style={{ width: "50px", height: "50px", borderRadius: "20px" }}
          alt="preview"
        />
      ) : (
        "loading"
      )}
    </div>
  );
};
export default PreviewImage;
