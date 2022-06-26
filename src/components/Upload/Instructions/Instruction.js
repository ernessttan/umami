import PropTypes from 'prop-types';

function Instruction({
  text, number, id, deleteInstruction,
}) {
  return (
    <div className="flex gap-2 mb-4">
      <button onClick={deleteInstruction} type="button" value={id}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <p className="text-lg font-bold">{number}</p>
      <p className="text-lg">{text}</p>
    </div>
  );
}

Instruction.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  deleteInstruction: PropTypes.func.isRequired,
};

export default Instruction;
