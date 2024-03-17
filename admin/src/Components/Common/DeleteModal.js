import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Modal, ModalBody } from "reactstrap";
import { languageData } from "../../helpers/StaticLanguageData";
import { MyContext } from "../Hooks/MyContextProvider";

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
  const { language } = useContext(MyContext);

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#fa896b"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{languageData[language].common?.areYouSure}</h4>
            <p className="text-muted mx-4 mb-0">
              {languageData[language].common?.deleteMsg}
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            {languageData[language].common?.close}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
            {languageData[language].common?.deleteIt}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;