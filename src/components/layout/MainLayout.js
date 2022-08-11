import PropTypes from 'prop-types';

function MainLayout({ children, className }) {
  return (
    <main className={`md:px-3 md:container md:max-w-4xl ${className}`}>
      {children}
    </main>
  );
}

MainLayout.defaultProps = {
  className: '',
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MainLayout;
