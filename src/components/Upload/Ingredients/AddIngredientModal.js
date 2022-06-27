import { useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

// Adds an ingredient to temporary ingredients array
function AddIngredientModal({ toggleModal, modalIsOpen, addIngredient }) {
  const [ingredient, setIngredient] = useState({
    category: '',
    title: '',
    amount: '',
    unit: '',
    id: generateUniqueId({ length: 2, useLetters: false }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      id: generateUniqueId({ length: 2, useLetters: false }),
    }));
    addIngredient(ingredient);
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
        <h1 className="text-xl font-bold">Add Ingredient</h1>
      </div>
      <form className="flex flex-col gap-6">
        <div>
          <h2>Category</h2>
          <input
            className="bg-textbox-grey w-full rounded p-2 py-3"
            type="text"
            name="category"
            onChange={handleChange}
            placeholder="e.g. Sauce, Filling, Dough"
          />
        </div>
        <div>
          <h2>Ingredient</h2>
          <input
            className="bg-textbox-grey w-full rounded p-2"
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-5">
          <div>
            <h2>Amount</h2>
            <input
              className="bg-textbox-grey w-full rounded p-2"
              type="number"
              name="amount"
              onChange={handleChange}
            />
          </div>
          <div>
            <h2>Unit</h2>
            <input
              className="bg-textbox-grey w-full rounded p-2"
              type="text"
              name="unit"
              onChange={handleChange}
            />
          </div>
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
AddIngredientModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  addIngredient: PropTypes.func.isRequired,
};

export default AddIngredientModal;
