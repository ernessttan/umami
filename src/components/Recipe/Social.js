import { useState } from 'react';

function Social() {
  const [selected, setSelected] = useState('description');

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-5 ">
        <button
          onClick={handleClick}
          type="button"
          value="description"
          className={`text-lg ${selected === 'description' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Description
        </button>
        <button
          onClick={handleClick}
          type="button"
          value="comments"
          className={`text-lg ${selected === 'comments' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Instructions
        </button>
      </div>
      <div className="border -ml-7 w-screen" />
      <div className="container mx-auto">
        {selected === 'description' ? <Description /> : null}
        {selected === 'instructions' ? <Comments /> : null}
      </div>
    </div>
  );
}

export default Social;
