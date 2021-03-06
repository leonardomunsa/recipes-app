import React, { useState } from 'react';
import PropTypes from 'prop-types';

import copy from 'clipboard-copy';

import shareIcon from '../../images/shareIcon.svg';

const COPIED_LINK_ALERT_TIME = 3000;

const ShareButton = ({ type, id, testId }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShareClick() {
    const link = `${global.location.origin}/${type}/${id}`;

    copy(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), COPIED_LINK_ALERT_TIME);
  }

  return (
    <>
      <button type="button" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share" data-testid={ testId } />
      </button>
      {copiedLink && <p>Link copiado!</p>}
    </>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ShareButton;
