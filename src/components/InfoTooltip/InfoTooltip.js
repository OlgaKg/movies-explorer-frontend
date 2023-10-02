import React from 'react';
import { AppContext } from '../contexts/AppContext';

function InfoTooltip({ isOpen, registerStatus, successMessage, failureMessage }) {
  const appContext = React.useContext(AppContext);

  return (
    <div className={`popup popup_type_register ${isOpen && 'popup_opened'}`}>
      <div className="popup__container-register">
        <button className="popup__closed-btn" type="button" onClick={appContext.closeAllPopups} />
        <div className={`popup__registerStatus ${registerStatus ? 'popup__registerStatus_success' : 'popup__registerStatus_fail'}`} />
        <h3 className="popup__title popup__title_register">
          {registerStatus ? successMessage : failureMessage}
        </h3>
      </div>
    </div>
  )
}

export default InfoTooltip;
