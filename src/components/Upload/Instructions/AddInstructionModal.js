import { useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

function AddInstruction({ toggleModal, modalIsOpen, addInstruction }) {
  const [instruction, setInstruction] = useState({
    text: '',
    id: generateUniqueId({ length: 2, useLetters: false }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstruction((prevInstruction) => ({
      ...prevInstruction,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInstruction((prevInstruction) => ({
      ...prevInstruction,
      id: generateUniqueId({ length: 2, useLetters: false }),
    }));
    addInstruction(instruction);
    toggleModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      appElement={document.getElementById('root')}
      style={{
        content: {
          left: '20px',
          right: '20px',
        },
      }}
    >
      <div className="flex gap-5 mb-8">
        <button onClick={toggleModal} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Add Instruction</h1>
      </div>
      <form className="flex flex-col gap-6">
        <div>
          <h2>Instruction</h2>
          <textarea
            className="bg-textbox-grey w-full rounded p-2"
            name="text"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-grey-500 text-white p-3 px-12 rounded-full"
            type="button"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
AddInstruction.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  addInstruction: PropTypes.func.isRequired,
};

export default AddInstruction;
