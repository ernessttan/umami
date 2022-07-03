import Cropper from 'react-easy-crop';
import { useState } from 'react';

function AvatarCropModal({ modalIsOpen, toggleModal }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Modal
      isOpen={modalIsOpen}
      toggleModal={toggleModal}
      appElement={document.getElementById('root')}
    >
      <div>
        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          className="form-range appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
          id="customRange1"
        />
      </div>
    </Modal>
  );
}

export default AvatarCropModal;
