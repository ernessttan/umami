import { useState } from 'react';
import PropTypes from 'prop-types';

function Image({ setImageFile }) {
  const [preview, setPreview] = useState('');

  const handleChange = (event) => {
    setImageFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <label htmlFor="imageUrl" className="bg-textbox-grey rounded-lg flex items-center justify-center h-80 w-full">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="imageUrl"
        id="imageUrl"
        onChange={handleChange}
        className="hidden"
      />
      <img
        src={preview}
        alt="preview"
        className={`${preview ? 'block' : 'hidden'} rounded-lg object-cover h-full w-full`}
      />
      <div className={`flex flex-col items-center ${preview ? 'hidden' : 'block'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p>Upload a photo of your dish</p>
      </div>
    </label>
  );
}

Image.propTypes = {
  setImageFile: PropTypes.func.isRequired,
};

export default Image;
