import React, { useEffect } from "react";
import "./Invoice.css";
import Logo from "../../assets/images/landing-logo-img.jpeg";
import moment from "moment";
import html2pdf from "html2pdf.js";
const InvoiceFormat = ({ data, setCounter }) => {
  const handleDownload = (elementId) => {
    const element = document.getElementById("pdf-content");
    const options = {
      filename: `${data?.id}-${data?.user?.firstName}-${data?.user?.lastName}.pdf`,
      html2canvas: { scale: 2 },
      margin: 5,
    };

    html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        var blob = new Blob([pdf.output("blob")], { type: "application/pdf" });
        var url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
    setCounter(0);
  };

  useEffect(() => {
    handleDownload();
  }, []);
  return (
    <div id="pdf-content" className="print-invoice">
      <div className=" border border-dark">
        <div className="cs-invoice cs-style1">
          <div className="cs-invoice_in" id="download_section">
            <div className="cs-invoice_head cs-type1 cs-mb25">
              <div className="cs-invoice_left">
                <b className="cs-primary_color">COFFEE GABLE</b>
                <p>
                  Office 4.5 First Floor 4 Sandpit Road, <br />
                  Dartford DA1 5BU <br />
                  coffeegable@gmail.com
                </p>
              </div>
              <div className="cs-invoice_right cs-text_right">
                <div className="cs-logo cs-mb5">
                  <img width={100} height={100} src={Logo} alt="Logo" />
                </div>
              </div>
            </div>
            <div className="cs-invoice_head cs-mb10">
              <div className="cs-invoice_left">
                <b className="cs-primary_color">Invoice To:</b>

                <p>
                  {" "}
                  <b className="cs-primary_color">
                    {data?.user?.firstName} {data?.user?.lastName}
                  </b>
                  <br />
                  {data?.address}
                </p>
              </div>
              <div className="cs-invoice_right cs-text_right">
                <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
                  <b className="cs-primary_color">Invoice No:</b> IN-{data.id}
                </p>
                <p className="cs-invoice_date cs-primary_color cs-m0">
                  <b className="cs-primary_color">Date: </b>
                  {data?.createdAt &&
                    moment(data?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div className="cs-table cs-style1">
              <div className="cs-round_border">
                <div className="cs-table_responsive">
                  <table className="table-bordered w-100">
                    <thead>
                      <tr className="p-1">
                        <th className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                          Item
                        </th>

                        <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                          Qty
                        </th>
                        <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                          Price
                        </th>
                        <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.parse(data?.productDetails)?.map((item, i) => {
                        console.log("item: ", item);
                        return (
                          <tr key={i}>
                            <td className="cs-width_3">{item?.productName}</td>

                            <td className="cs-width_2 px-2">
                              {item?.quantity}
                            </td>
                            <td className="cs-width_1 px-2">₹ {item?.price}</td>
                            <td className="cs-width_2 cs-text_right">
                              ₹{" "}
                              {parseFloat(item?.price * item?.quantity).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="cs-invoice_footer cs-border_top">
                  <div className="cs-left_footer cs-mobile_hide"></div>
                  <div className="cs-right_footer" style={{ marginLeft: 60 }}>
                    <table className="w-100">
                      <tbody>
                        <tr className="cs-border_left">
                          <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                            Subtoal
                          </td>
                          <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                            ₹ {data.totalPrice}
                          </td>
                        </tr>
                        <tr className="cs-border_left">
                          <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                            Tax Deduction
                          </td>
                          <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                            ₹ {data.taxAmount}
                          </td>
                        </tr>
                        <tr className="cs-border_none">
                          <td className="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color">
                            Total Amount
                          </td>
                          <td className="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color cs-text_right">
                            ₹ {data?.finalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="cs-note">
              <div className="cs-note_left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                </svg>
              </div>
              <div className="cs-note_right">
                <p className="cs-mb0">
                  <b className="cs-primary_color cs-bold">Note:</b>
                </p>
                <p className="cs-m0">
                  Here we can write a additional notes for the client to get a
                  better understanding of this invoice.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormat;
