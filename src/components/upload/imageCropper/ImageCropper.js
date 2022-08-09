/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Modal from 'react-modal';
import Proptypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import getCroppedImg from './canvasUtils';
import Input from '../../forms/Input';

function ImageCropper({
  image, setPreview, modalIsOpen, toggleModal, setImage,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = useCallback(async () => {
    try {
      const cropImage = await getCroppedImg(image, croppedAreaPixels);
      setPreview(URL.createObjectURL(cropImage));
      setImage(cropImage);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  }, [image, crop, zoom]);

  return image && (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      style={{
        content: {
          inset: '0',
          padding: '0',
        },
      }}
    >
      <div className="w-full flex flex-col items-center gap-8 mt-24">
        <button onClick={handleCropComplete} className="flex justify-end w-full px-5 text-orange-500" type="button">Done</button>
        <div className="relative w-full h-96">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-22">
          <Input
            type="range"
            value={zoom}
            min={1}
            max={10}
            step={0.1}
            onChange={(e) => {
              setZoom(e.target.value);
            }}
          />
        </div>

      </div>
    </Modal>
  );
}

ImageCropper.propTypes = {
  image: Proptypes.string.isRequired,
  setPreview: Proptypes.func.isRequired,
  modalIsOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  setImage: Proptypes.func.isRequired,
};

export default ImageCropper;
