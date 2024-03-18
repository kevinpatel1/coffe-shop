import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Modal, Label, Input, ModalBody, ModalHeader } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { languageData } from "../../helpers/StaticLanguageData";
import { MyContext } from "../../Components/Hooks/MyContextProvider";
import TranslateData from "../../hooks/TranslateData";

const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const EditCategory = (props) => {
  const history = useHistory();
  const { row, editCategoryModal } = props;
  const [categoryName, setCategoryName] = useState(row?.categoryName);
  const [categoryNameError, setCategoryNameError] = useState(false);

  const { getTranslationData } = TranslateData();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#e9511d";

  const submitBtnClk = async () => {
    if (categoryName === "") {
      setCategoryNameError(true);
      toast.error("Category Name is Required", {
        toastId: "depNameerror",
      });

      setVisible(false);
    } else if (categoryName && categoryName?.length < 3) {
      setCategoryNameError(true);
      toast.error("Minimum 3 Characteristics is Required", {
        toastId: "incompleteNameError",
      });

      setVisible(false);
    } else {
      setloading(true);
      setVisible(true);

      let formData = {
        categoryName: categoryName,
      };

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetch(
        `${process.env.REACT_APP_API_URL}category/update/${row?.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();

            history.push("/logout");
            // toast.error("Session Expired.", {
            //   toastId: "sessionerror",
            // });
          }

          if (data.status) {
            setVisible(false);
            history.push("/category");
            setloading(false);
            props.onModalSubmitBtnClk();
            toast.success("Record Updated Successfully.");
          } else {
            setVisible(false);
            setloading(false);
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          setVisible(false);
          setloading(false);
          toast.error("There was an error, Please try again later.");
          setTimeout(() => {
            props?.onModalSubmitBtnClk();
          }, 2000);
        });
    }
  };

  return (
    <>
      <Modal
        id="showModal"
        size="md"
        isOpen={(row, editCategoryModal)}
        toggle={() => props.onCloseModal()}
        centered
      >
        <ModalHeader
          className="p-3 bg-soft-success"
          toggle={() => props.onCloseModal()}
        >
          Add Category
        </ModalHeader>
        <ModalBody className="p-3">
          <div className="row gy-3 mb-2">
            <div className="col-md-12">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Category Name <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="text"
                    className={`form-control ${
                      categoryNameError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Category Name"}
                    aria-label=" CategoryName"
                    aria-describedby="basic-addon1"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);

                      if (e.target.value?.length >= 3) {
                        setCategoryNameError(false);
                      } else {
                        setCategoryNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <div className="p-3">
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                props.onCloseModal(false);
              }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              id="add-btn"
              onClick={() => {
                submitBtnClk();
              }}
              disabled={visible}
            >
              {loading ? <ClipLoader color="#e9511d" size={20} /> : "Update"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EditCategory;
