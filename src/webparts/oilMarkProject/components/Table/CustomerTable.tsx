import * as React from "react";
import { ThreeBot } from "../assets/icons";
import { borderColorD0, colorE4, PrimaryColor } from "../color/color";
import { ActionDiv, ActionDiv1, OutlineBtn, TableEmpty } from "../ComponentPages/Component";
import { Pagination } from "../ComponentPages/Pagination";
import { Popup } from "../Popup/Popup";
import {
  Scrollbar,
  TableStyled,
  Tbody,
  Td,
  Th,
  Thead,
} from "../Style/ComponentStyled";

export const CustomerTable = (props: any) => {
  const [modalIsOpen, setModelIsOpen] = React.useState(false);
  const [Delete, setDelete] = React.useState(false);
  const [DeleteCustomer, setDeleteCustomer] = React.useState(false);
  const [EditCustomer, setEditCustomer] = React.useState(false);
  const [CustomData, setCustomData] = React.useState([]);
  const [SelectedDeleteId, setSelectedDeleteId] = React.useState(false);
  const [SelectedCutomerEditData, setSelectedCutomerEditData] = React.useState(
    {}
  );

  const EditPopUp = () => {};
  const EditUpdateFormData = (SelectedId: any) => {
  debugger;
    let filteredData = props.CustomerDataFilter.filter((filteredData) => {
      return filteredData.Id === SelectedId;
    });
    setSelectedCutomerEditData(filteredData[0]);
    props.setCustomer({
      ...props.customer,
      Id: filteredData[0].Id,
      Title: filteredData[0].TradingGroupName,
    
      TradingGroupName: filteredData[0].TradingGroupName,
      CustomerRegistration: filteredData[0].CustomerRegisteredName,
      CustCountry: filteredData[0].CountryIncorporation,
      //23may2023
      TraderNamePeoplePicker : filteredData[0].TraderNamePeoplePicker,
      Traders: filteredData[0].Trader,
      Date1: filteredData[0].DateofReviewAddition,
      Status: filteredData[0].Status,
      TraderName: filteredData[0].TraderName,
    });
    setEditCustomer(true);
  };

  var customerPage = props.CustomerDataFilter;
  console.log("customerPage", customerPage);
  console.log("props.SearchCustomerCountry", props.SearchCustomerCountry);
  return (
    <>
      <Scrollbar>
        <TableStyled className="CatalogTable mt20 fw600">
          <table className="w-100">
            {customerPage ? (
              <>
                <Thead>
                  <tr>
                    <Th>Trading/Group Name</Th>
                    <Th> Customer - Registered Name</Th>
                    <Th className="df-c">Country Incorporation</Th>
                    <Th>TraderEmailID</Th>
                    <Th>Date Of Review/Addition</Th>
                    <Th>Status</Th>
                    <Th>TraderName</Th>
                    <Th>
                      <div className="df-ee">
                        <ThreeBot />
                      </div>
                    </Th>
                  </tr>
                </Thead>
                {/* {props.SearchCustomerCountry !== "" ||
                props.SearchCustomerRegisName !== ""   ? ( */}
                  <Tbody className="mt20">
                    {CustomData.map((item: any, index: any) => {
                      debugger;
                      console.log("CustomData-------", CustomData);
                      return (
                        <tr key={index}>
                          <Td>
                            <div>
                              <div className="fw600">
                                {" "}
                                {item.TradingGroupName}
                              </div>
                            </div>
                          </Td>
                          <Td className="fw600">
                            {item.CustomerRegisteredName}
                          </Td>
                          <Td className="fw600 df-c">
                            <OutlineBtn
                              className={"df-c"}
                              text={item.CountryIncorporation}
                              bg={colorE4}
                              color={PrimaryColor}
                              width={"auto"}
                              padding={"3px 5px"}
                              height={"28px"}
                              borderColor={borderColorD0}
                            />
                          </Td>
                          <Td className="fw600">{item.Trader}</Td>

                          <Td className="fw600">
                            {new Date(
                              item.DateofReviewAddition
                            ).toLocaleDateString()}
                          </Td>
                          <Td className="fw600">{item.Status}</Td>
                          <Td className="fw600">{item.TraderName}</Td>
                          <Td className="df-c">
                            <ActionDiv1
                              editClick={() => {
                                EditUpdateFormData(item.Id);
                              }}
                              // deleteClick={() => {
                              //   setDeleteCustomer(true),
                              //     setSelectedDeleteId(item.Id);
                              // }}
                            />
                          </Td>
                        </tr>
                      );
                    })}
                  </Tbody>
                {/* ) : (
                  <>
                  <td></td>
                  <td></td>
                  <div className="mt20 w-100 txtAlign">
                    <TableEmpty text={"Field is empty!!!"} />{" "}
                  </div>
                  </>
                )} */}
              </>
            ) : (
              <div className="mt20 w-100 txtAlign">
                <TableEmpty text={"Nothing to show!!!"} />{" "}
              </div>
            )}
          </table>
        </TableStyled>
      </Scrollbar>
      <Pagination
        getFunction={customerPage}
        setCustomData={setCustomData}
        totalLength={customerPage.length}
      />
      <Popup
        Data={CustomData}
        modalIsOpen={modalIsOpen}
        setModelIsOpen={setModelIsOpen}
        ModelWidth={"80%"}
        onchange={() => EditPopUp()}
        text={"Edit Customer"}
        DeleteCustomer={DeleteCustomer}
        setDeleteCustomer={setDeleteCustomer}
        EditCustomer={EditCustomer}
        setEditCustomer={setEditCustomer}
        DeleteText={"Delete"}
        SelectedId={SelectedDeleteId}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        SelectedCutomerEditData={SelectedCutomerEditData}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        CallSearchCustomer={props.CallSearchCustomer}
        CallCustomertableData={props.CallCustomertableData}
        customer={props.customer}
        setCustomer={props.setCustomer}
      />
    </>
  );
};
