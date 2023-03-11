import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonLink({ id, nameButton = 'Info' }) {
  return (
    <Link to={`/pokemon/${id}`} className="btn btn-info">
      {nameButton}
    </Link>
  );
}
ButtonLink.propTypes = {
  id: PropTypes.number.isRequired,
  nameButton: PropTypes.string,
};
ButtonLink.defaultProps = {
  nameButton: 'Info',
};
export default ButtonLink;
