/* eslint-disable react/prop-types */
function Box({ children }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {children}
    </div>
  );
}

export default Box;
