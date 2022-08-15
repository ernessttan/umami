import Modal from 'react-modal';
import Proptypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import getCroppedImg from './canvasUtils';
import Input from '../forms/Input';

function ImageCropper({
  image, setPreview, modalIsOpen, toggleModal, setImage, aspect, cropShape,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = async () => {
    try {
      const cropImage = await getCroppedImg(image, croppedAreaPixels);
      setPreview(URL.createObjectURL(cropImage));
      setImage(cropImage);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return image && (
  <Modal
    isOpen={modalIsOpen}
    appElement={document.getElementById('root')}
    onRequestClose={toggleModal}
    className="z-10 max-w-4xl h-[75vh] p-4 mx-5 mt-16 bg-white border rounded-lg shadow-xl md:mx-auto border-grey-300 md:p-8"
  >
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <button onClick={handleCropComplete} className="flex justify-end w-full px-5 text-orange-500" type="button">Done</button>
      <div className="relative h-full w-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape={cropShape}
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

ImageCropper.defaultProps = {
  cropShape: '',
};

ImageCropper.propTypes = {
  image: Proptypes.string.isRequired,
  setPreview: Proptypes.func.isRequired,
  modalIsOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  setImage: Proptypes.func.isRequired,
  aspect: Proptypes.number.isRequired,
  cropShape: Proptypes.string,
};

export default ImageCropper;
