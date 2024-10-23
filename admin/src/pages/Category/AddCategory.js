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

const AddCategory = (props) => {
  const history = useHistory();
  const { language } = useContext(MyContext);
  const { addCategoryModal } = props;
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState(false);

  const { getTranslationData } = TranslateData();
  const [image, setImage] = useState("");
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
    } else if (image === "") {
      toast.error("Please Select Product Image");
    } else {
      setloading(true);
      setVisible(true);

      let formData = new FormData();

      formData.append("categoryName", categoryName);
      formData.append("image", image);

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
          // "Content-Type": "application/json",
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}category/store`, requestOptions)
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
            toast.success("Record Added Successfully.");
          } else {
            setVisible(false);
            setloading(false);
            toast.error(data?.err_msg);
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
        isOpen={addCategoryModal}
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
          <div className="row gy-3 mt-2">
            <div className="col-md-6">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Image
                </Label>
                <div className="input-group">
                  <div>
                    <Input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg,"
                      name="image"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div>
                    {image && (
                      <img
                        src={URL?.createObjectURL(image)}
                        className="img-thumbnail "
                        height={100}
                        width={200}
                        alt="user-profile"
                      />
                    )}
                  </div>
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
              {loading ? <ClipLoader color="#e9511d" size={20} /> : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddCategory;
