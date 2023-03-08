import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const ButtonLink = ({ id, nameButton = 'Info' }) => {
  return (
    <Link to={`/pokemon/${id}`} className="btn btn-info">
      {nameButton}
    </Link>
  );
};
ButtonLink.propTypes = {
  id: PropTypes.number,
  nameButton: PropTypes.string,
};
export default ButtonLink;
