/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Proptypes from 'prop-types';
import Input from '../forms/Input';
import ImageCropper from './imageCropper/ImageCropper';

function Image({ setImage, image }) {
  const [preview, setPreview] = useState();
  const [imageSrc, setImageSrc] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen((prev) => !prev);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      toggleModal();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor="image" className="relative bg-textbox-grey rounded-lg flex items-center justify-center h-72 md:h-96 w-full">
        <Input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleChange}
          className="hidden"
        />
        <img
          src={preview || image}
          alt="preview"
          className={`${preview || image ? 'block' : 'hidden'} rounded-lg h-full w-full`}
        />
        <div className={`flex flex-col items-center ${preview || image ? 'hidden' : 'block'}`}>
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
      <ImageCropper image={imageSrc} setImage={setImage} setPreview={setPreview} modalIsOpen={modalIsOpen} toggleModal={toggleModal} aspect={4 / 3} />
    </>
  );
}

Image.defaultProps = {
  image: '',
};

Image.propTypes = {
  setImage: Proptypes.func.isRequired,
  image: Proptypes.string,
};

export default Image;
