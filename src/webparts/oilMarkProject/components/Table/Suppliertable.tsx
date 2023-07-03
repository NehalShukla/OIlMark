import * as React from "react";
import { ThreeBot } from "../assets/icons";
import { borderColorD0, colorE4, PrimaryColor } from "../color/color";
import { ActionDiv, ActionDiv2, OutlineBtn, } from "../ComponentPages/Component";
import { Pagination } from "../ComponentPages/Pagination";
import { Popup } from "../Popup/Popup";

import {
  PageMedia,
  ScrollbarSuppliear,
  TableStyled,
  Tbody,
  Td,
  Th,
  Thead
} from "../Style/ComponentStyled";

export const Suppliertable = (props) => {
  const [EditModelIsOpen, setEditModelIsOpen] = React.useState(false);
  const [Delete, setDelete] = React.useState(false);
  const [SelectedDeleteId, setSelectedDeleteId] = React.useState(false);
  const [SelectedEditData, setSelectedEditData] = React.useState({});
  const [EditsuppliearIsOpen, SetEditsuppliearIsOpen] = React.useState(false);
  const [CustomData, setCustomData] = React.useState(props.SupplierData);

  const EditUpdateFormData = (SelectedId) => {
    let filteredData = props.SupplierData.filter((filteredData) => {
      return filteredData.Id === SelectedId;
    });
    props.setSupplier({
      ...props.supplier,
      Id: filteredData[0].Id,
      LeadTrader: filteredData[0].LeadTrader,
      BackupTrader: filteredData[0].BackupTrader,
      SuppCountry: filteredData[0].SupplierCountry,
      SuppFullStyle: filteredData[0].SupplierNamefullstyle,
      CreditLimit: filteredData[0].CreditLimit,
      SuppPIC: filteredData[0].SupplierPIC,
      ContactNo: filteredData[0].ContactNo,
      Email: filteredData[0].Email,
      SupplyRegion: filteredData[0].SupplyRegion,
      CreditTerms: filteredData[0].CreditTerms,
      Remarks: filteredData[0].Remarks,
      DateState: filteredData[0].Date,
    });
    setSelectedEditData(filteredData[0]);
    SetEditsuppliearIsOpen(true);
  };
  var supplierPage = props.SupplierData;
  const callsup = (e: any) => {
    props.setSupplier({ ...props.supplier, LeadTrader: e.target.value });
  };
  return (
    <>
      <ScrollbarSuppliear>
        <TableStyled className="CatalogTable mt20 fw600">
          <table className="w-100">
            <Thead>
              <tr>
                <Th>Lead Trader</Th>
                <Th>Backup Trader</Th>
                <Th>Supplier Country</Th>
                <Th>Supplier Full Style</Th>
                <Th>Credit Limit</Th>
                <Th>Supplier PIC</Th>
                <Th>Contact Number</Th>
                <Th>Email</Th>
                <Th>Supply Region</Th>
                <Th>Credit Term</Th>
                <Th>Remark</Th>
                <Th>
                  <div className="df-ee">
                    <ThreeBot />
                  </div>
                </Th>
              </tr>
            </Thead>
            <Tbody className="mt20">
              {CustomData.map((item, key) => {
                // selectedId= item.Id
                return (
                  <tr>
                    <Td>
                      <div>
                        <div className="fw600"> {item.LeadTrader}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.BackupTrader}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600">
                          <OutlineBtn
                            className={"df-c"}
                            text={item.SupplierCountry}
                            bg={colorE4}
                            color={PrimaryColor}
                            width={"auto"}
                            padding={"3px 5px"}
                            height={"28px"}
                            borderColor={borderColorD0}
                          />
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600">
                          {" "}
                          {item.SupplierNamefullstyle}
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.CreditLimit}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.SupplierPIC}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.ContactNo}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.Email}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600">
                          <OutlineBtn
                            className={"df-c"}
                            text={item.SupplyRegion}
                            bg={colorE4}
                            color={PrimaryColor}
                            width={"auto"}
                            padding={"3px 5px"}
                            height={"28px"}
                            borderColor={borderColorD0}
                          />{" "}
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.CreditTerms}</div>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className="fw600"> {item.Remarks}</div>
                      </div>
                    </Td>
                    <Td className="df-c">
                      <ActionDiv2
                        editClick={() => EditUpdateFormData(item.Id)}
                        deleteClick={() => {
                          setDelete(true), setSelectedDeleteId(item.Id);
                        }}
                      />
                    </Td>
                  </tr>
                );
              })}
            </Tbody>
          </table>
        </TableStyled>
      </ScrollbarSuppliear>
      <PageMedia>
        <Pagination
          getFunction={supplierPage}
          setCustomData={setCustomData}
          totalLength={supplierPage.length}
        />
      </PageMedia>
      <Popup
        // Data={SupplierData}
        EditsuppliearIsOpen={EditsuppliearIsOpen}
        SetEditsuppliearIsOpen={SetEditsuppliearIsOpen}
        ModelWidth={"80%"}
        // EditsuppliearIsOpen={EditsuppliearIsOpen}
        text={"Edit Supplier"}
        Delete={Delete}
        setDelete={setDelete}
        DeleteText={"Delete"}
        SelectedId={SelectedDeleteId}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        SelectedEditData={SelectedEditData}
        CallSuppliertableData={props.CallSuppliertableData}
        supplier={props.supplier}
        setSupplier={props.setSupplier}
        callsup={callsup}
        CallSearchSupplier={props.CallSearchSupplier}
      />
    </>
  );
};
