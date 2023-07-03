import {
  ISPHttpClientOptions,
  MSGraphClient,
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import dateFormat from "dateformat";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sp } from "@pnp/sp";
import "react-toastify/dist/ReactToastify.css";
import { DragNDropIcon } from "../assets/icons";
//25may2023
import {
  PrincipalType,
  PeoplePicker,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import "../Main.scss";
import { IOilMarkProjectProps } from "../IOilMarkProjectProps";
//
import {
  colorE2,
  colorf7,
  GrayAB,
  PrimaryColor,
  PrimaryHover,
} from "../color/color";
import {
  DeletePopupContent,
  Header,
  Input,
  InputBtn,
  InputDropDowncust,
  TextArea,
  UploadFile,
} from "../ComponentPages/Component";
import { ButtonStyle, MainDiv, Modal } from "../Style/ComponentStyled";
import { format, people, values } from "office-ui-fabric-react";
var formID: any;
var FileName;
var file: String;
var selectedUser;
let SelectedUserName;
var TraderName1;
var fileData = [];
// Date: 04/04/23 comment Added by dpk  Start

var customercurrrentuser = "";
var customercurrrentuserName = "";

var customerTradersEmail = "";
var storeArrayDate: any[] = []; // Declare storeArrayDate as an array
var upEditId = "";

// Date: 04/04/23 Added by dpk  End

const date = new Date();
const futureDate = date.getDate() + 3;
date.setDate(futureDate);
const defaultValue = date.toLocaleDateString("en-CA");

export const Popup = ({
  modalIsOpen,
  setModelIsOpen,
  onClick,
  text,
  ModelWidth,
  setDelete,
  Delete,
  DeleteText,
  supplierIsOpen,
  setSupplierIsOpen,
  setEditSupplierIsOpen,
  DeleteCustomer,
  siteUrl,
  spHttpClient,
  setDeleteCustomer,
  SelectedId,
  CallSuppliertableData,
  EditsuppliearIsOpen,
  SelectedEditData,
  AnnouncePopup,
  EditCustomer,
  setEditCustomer,
  SetAnnouncePopup,
  editWidth,
  CallSearchCustomer,
  AnounccedTableData,
  CreditLimitUpdate,
  SelectedCutomerEditData,
  DeleteAnnouncement,
  CallAnnouncemnetData,
  CallCustomertableData,
  imgUrl,
  SetEditsuppliearIsOpen,
  supplier,
  setSupplier,

  callsup,
  customer,
  setCustomer,
  CallSearchSupplier,
  SetAnnouncement,
  Announcement,
  //25may2023
  context,

  msGraphClientFactory,
}: any) => {
  const emailVali = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const contactVali =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const creditTermsVali = /^[0-9\b]+$/;
  const creditLimitVali = /^[0-9\b]+$/;
  React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [handleFile, SethandleFile] = React.useState("");
  //nehal31May2023
  const [addUsers, setaddUsers] = React.useState<any>([]);
  // addUsers: string[];
  const DataActive = [
    { key: 1, status: "ACTIVE" },
    {
      key: 2,
      status: "IN-ACTIVE",
    },
    {
      key: 3,
      status: "DORMANT",
    },
    {
      key: 4,
      status: "REJECTED",
    },
    {
      key: 5,
      status: "CANVASSING",
    },
  ];
  const history = useHistory();
  //Date 04/04/23 Comment  Added by dpk Start
  React.useEffect(() => {
    getAllSharepointUser();
    // _getPeoplePickerItems();
  }, []);

  function getAllSharepointUser() {
    var objHeaders1 = {
      type: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
      },
    };

    //fetch("https://pandey17.sharepoint.com/sites/OilMarkProjectRakesh/_api/web/currentuser?$select=EMail",
    fetch(
      `${siteUrl}/_api/web/currentuser?$select=EMail`,
      //fetch((await siteUrl) +"/_api/web/currentuser?$select=EMail",

      objHeaders1
    )
      .then(function (response) {
        console.log(objHeaders1);
        return response.json();
      })
      .then(function (json) {
        customercurrrentuserName = json.d.Email;
        customercurrrentuser = customercurrrentuserName.toUpperCase();
        // alert(customercurrrentuser);
      });
    error: (function (ex) {
      alert("ErrorMessage : " + ex);
    });
  }
  //Date: 04/04/23 Comment Added by Dpk Start

  const EditFromData1 = () => {
    // var docs = document.getElementById('customer_edit__btn');

    if (customercurrrentuser == customerTradersEmail) {
      // alert("valid")
      //   setbuttonVisible(true);
      //  document.getElementById('customer_edit__btn').style.display = 'none';
      // document.getElementById("cust_status_input").style.display = 'none';
    } else {
      //alert("INvalid")
      // setbuttonVisible(true);
      //document.getElementById('customer_edit__btn').style.display = 'none';
      return toast.warning("You cant change the status of customer");
      //document.getElementById('customer_edit__btn').style.display = 'none';
      // document.getElementById("cust_status_input").style.display = 'none';
    }
  };
  //Date: 04/04/23 Comment Added by Dpk End

  //Date 04/04/23 Comment  Added by dpk End

  ////////////ended

  const handleSubmitCutomerRef = () => {
    history.push("/Customer");
    setEditCustomer(false);
  };
  const handleSubmitSupplier = () => {
    checkValiAddSupplier();
  };
  const handleSubmitCutomer = () => {
    checkValiAddCustomer();
  };

  const checkValiAddSupplier = () => {
    if (supplier.LeadTrader === "") {
      return toast.warning("Lead Trader can't empty");
    } else if (supplier.BackupTrader === "") {
      return toast.warning("Backup Trader can't empty");
    } else if (supplier.SuppCountry === "") {
      return toast.warning("Supplier Country can't empty");
    } else if (supplier.SuppFullStyle === "") {
      return toast.warning("Supplier Full-Style can't empty");
    } else if (supplier.CreditLimit === "") {
      return toast.warning("Supplier Credit Limit can't empty");
    } else if (creditLimitVali.test(supplier.CreditLimit) === false) {
      return toast.warning("Please enter valid credit limit");
    } else if (supplier.SuppPIC === "") {
      return toast.warning("Supplier PIC can't empty");
    } else if (supplier.ContactNo === "") {
      return toast.warning("Contact no can't empty");
    }
    // else if (contactVali.test(supplier.ContactNo) === false) {
    //   return toast.warning("Please enter valid contact number");
    // }
    if (supplier.Email === "") {
      return toast.warning("Email can't empty");
    } else if (emailVali.test(supplier.Email) === false) {
      return toast.warning("Please enter valid email");
    } else if (supplier.SupplyRegion == "") {
      return toast.warning("Supply Region can't empty");
    } else if (supplier.CreditTerms == "") {
      return toast.warning("Credit Terms can't empty");
    } else if (creditTermsVali.test(supplier.CreditTerms) === false) {
      return toast.warning("Please enter valid credit terms");
    } else if (supplier.SuppCountry == "") {
      return toast.warning("Supplier Country can't empty");
    } else if (supplier.SuppFullStyle == "") {
      return toast.warning("Supplier Full-Style can't empty");
    } else if (supplier.CreditLimit == "") {
      return toast.warning("Supplier Credit Limit can't empty");
    } else if (creditLimitVali.test(supplier.CreditLimit) === false) {
      return toast.warning("Please enter valid credit limit");
    } else if (supplier.SuppPIC == "") {
      return toast.warning("Supplier PIC can't empty");
    }
    //date 18may2023

    //Date 26/05/23 comment added by dpk
    // else if (supplier.DateState == "") {
    //   return toast.warning("Date Terms can't empty");
    // }
    else if (supplier.ContactNo == "") {
      return toast.warning("Contact no can't empty");
    }
    //  else if (contactVali.test(supplier.ContactNo) === false) {
    //   return toast.warning("Please enter valid contact number");
    // }
    if (supplier.Email == "") {
      return toast.warning("Email can't empty");
    } else if (emailVali.test(supplier.Email) === false) {
      return toast.warning("Please enter valid email");
    } else if (supplier.SupplyRegion == "") {
      return toast.warning("Supply Region can't empty");
    } else if (supplier.CreditTerms == "") {
      return toast.warning("Credit Terms can't empty");
    } else if (creditTermsVali.test(supplier.CreditTerms) === false) {
      return toast.warning("Please enter valid credit terms");
    } else if (
      supplier.LeadTrader != "" &&
      supplier.BackupTrader != "" &&
      supplier.SuppFullStyle != "" &&
      supplier.SuppCountry != "" &&
      supplier.SuppPIC != "" &&
      supplier.Email != "" &&
      //18may2023
      // supplier.DateState != "" &&

      supplier.ContactNo != "" &&
      supplier.SupplyRegion != "" &&
      supplier.CreditTerms != "" &&
      supplier.CreditLimit != ""
    ) {
      createFormData();
    }
  };

  const createFormData = async () => {
    debugger;
    let restApiurl: string =
      (await siteUrl) + "/_api/web/lists/getByTitle('SupplierDirectory')/items";
    const body: string = JSON.stringify({
      Title: supplier.LeadTrader.toUpperCase(),
    });
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };
    try {
      spHttpClient
        .post(restApiurl, SPHttpClient.configurations.v1, options)

        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              formID = results.Id;
              updateFormData(formID);
              console.log(results);
              toast.success("Supplier added successfully");
            });
          } else {
            throw new Error("Something went wrong!");
          }
        })
        .catch((error: any) => {
          console.log("Error====>", error.message);
        });
    } catch (error) {
      console.log("Catch error==>", error.message);
    }
  };

  //Validation Added by Deepak Date: 15/02/2023
  const checkValiAddCustomer = () => {
    debugger;
    // if (customer.TradingGroupName === "") {
    //   toast.warning("Trading group name can't empty");
    // } else if (customer.CustomerRegistration === "") {
    //   toast.warning("Customer registration name can't empty");
    // } else if (customer.CustCountry === "") {
    //   toast.warning("Customer Country can't empty");
    // } else if (customer.Traders === "") {
    //   toast.warning("Traders can't empty");
    // } else if (customer.Date1 === "") {
    //   toast.warning("Date can't empty");
    // } else if (customer.Status === "") {
    //   toast.warning("Status can't empty");
    // }
    //Date: 04/04/23 Comment Added by Dpk Start

    if (customer.TradingGroupName === "") {
      toast.warning("Trading group name can't empty");
    } else if (customer.CustomerRegistration === "") {
      toast.warning("Customer registration name can't empty");
    } else if (customer.CustCountry === "") {
      toast.warning("Customer Country can't empty");
    }
    // else if (customer.TraderName === "") {
    //   return toast.warning("Trader name can't empty");
    // }
    else if (customer.Traders === "") {
      return toast.warning("Trader email can't empty");
    }
    //commented on trader email
    else if (emailVali.test(customer.Traders) === false) {
      return toast.warning("Please enter valid email");
    }

    // Date: 1/06/23
    // else if (customer.Trader_Email === "") {
    //   return toast.warning("Please enter Trader Name can't empty");
    // }
    else if (emailPattern.test(customer.Trader_Email) === false) {
      return toast.warning("Please enter valid Trader Name");
    }

    //date18may2023
    // else if (customer.Date1 === "") {
    //   toast.warning("Date can't empty");
    // }
    else if (customer.Status === "") {
      toast.warning("Status can't empty");
    }

    //Date: 04/04/23 Comment Added by Dpk End
    else if (
      customer.TradingGroupName != "" &&
      //18may2023
      //  customer.Date1 != "" &&
      customer.Status != "" &&
      //date23may2023
      // customer.TraderName != "" &&
      customer.Traders != "" &&
      customer.CustCountry != "" &&
      customer.CustomerRegistration != "" &&
      customer.Trader_Email != ""
    ) {
      createNewCustomer();
    }
  };

  const createNewCustomer = async () => {
    debugger;


    if(customer.Trader_Name !== null)
    {

   

    let restApiurl: string =
      (await siteUrl) + "/_api/web/lists/getByTitle('CustomerDirectory')/items";
    //  (await siteUrl) + "/_api/web/lists/getByTitle('CustomerDirectory')/items?$select=Title,TradingGroupName,DateofReviewAddition,Status,Trader,TraderNameId,CountryIncorporation,CustomerRegisteredName,TraderName/Id,TraderName/UserName,TraderName/FirstName,TraderName/LastName,TraderName/Name,TraderName/EMail&$expand=TraderName,TraderName/Name,TraderName/EMail",

    const body: string = JSON.stringify({
      Title: customer.TradingGroupName.toUpperCase(),


      TraderNamePeoplePicker: customer.Trader_Email,

      
      TraderName: customer.Trader_Name,
      // TradingGroupName: customer.TradingGroupName.toUpperCase(),
      // DateofReviewAddition: customer.Date1,
      // Status: customer.Status.toUpperCase(),
      // Trader: customer.Traders.toUpperCase(),
      // CountryIncorporation: customer.CustCountry.toUpperCase(),
      // CustomerRegisteredName: customer.CustomerRegistration.toUpperCase(),
    });
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };
    try {
      spHttpClient
        .post(restApiurl, SPHttpClient.configurations.v1, options)
        // .then((response: SPHttpClientResponse) => {
        //   if (response.ok) {
        //     toast.success("Customer added successfully");
        //     setModelIsOpen(false);
        //    // history.push("/CustomerData");
        //     response.json().then((results: any) => {
        //       console.log("results===>", results);
        //     });
        //     setModelIsOpen(false);

        //     //date 30/3/2023
        //     // https://oilmarshippingcom.sharepoint.com/sites/CreditAndCanvasApplication
        //     // window.location.href = "https://oilmarshippingcom.sharepoint.com/sites/CreditAndCanvasApplication/SitePages/Dashboard.aspx#/CustomerData";
        //   //  window.location.reload(history.push("/CustomerData"));
        //    // window.location.reload();
        //    // history.push("/CustomerData");
        //    // window.location.href = "https://pandey17.sharepoint.com/sites/OilMarkProjectRakesh/SitePages/OilMarProjectTesting.aspx#/CustomerData";
        //  // history.push('/CustomerData');
        //   }
        // })

        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              console.log("results----------", results);

              formID = results.Id;

              updateFormData1(formID);
              console.log(results);
              toast.success("Customer added successfully");
            });
          } else {
            throw new Error("Something went wrong!");
          }
        })

        .catch((error: any) => {
          toast.error("Something went wrong!!!");
          console.log("error=====>", error);
        });
    } catch (error) {
      console.log("Customer error==>", error.message);
    }
  } 
  else{
    toast.error("Something went wrong!!!!!!!!!!!!!!!!!!!");
  }
  };

  const updateFormData1 = (upId: any) => {
    debugger;

    console.log("TraderNameStringId", upId.TraderNameStringId);
    const body: string = JSON.stringify({
      Title: customer.TradingGroupName.toUpperCase(),
      TradingGroupName: customer.TradingGroupName.toUpperCase(),

      //18may2023
      // DateofReviewAddition: customer.Date1,
      DateofReviewAddition: dateFormat(
        new Date().toLocaleDateString(),
        "yyyy-mm-dd"
      ),
      //commented 23may2023
      Status: customer.Status.toUpperCase(),
      //Status: customer.Status,
      //date23may2023
      //TraderName: customer.TraderName.toUpperCase(),
      Trader: customer.Traders.toUpperCase(),
      TraderName: customer.TraderName,
      TraderNamePeoplePicker: customer.TraderNamePeoplePicker,
      CountryIncorporation: customer.CustCountry.toUpperCase(),
      CustomerRegisteredName: customer.CustomerRegistration.toUpperCase(),
    });
    spHttpClient
      .post(
        `${siteUrl}/_api/web/lists/getByTitle('CustomerDirectory')/items(${upId})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: body,
        }
      )
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          // setSupplierIsOpen(false);
          setModelIsOpen(false);

          CallCustomertableData();
          // CallSuppliertableData();
        } else {
          response.json().then((responseJSON) => {
            console.log(responseJSON);
            toast.error("Record not created successfully");
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateFormData = (upId: any) => {
    const body: string = JSON.stringify({
      //18may2023
      // Date: supplier.DateState,

      LeadTrader: supplier.LeadTrader.toUpperCase(),
      BackupTrader: supplier.BackupTrader.toUpperCase(),
      SupplierCountry: supplier.SuppCountry.toUpperCase(),
      SupplierNamefullstyle: supplier.SuppFullStyle.toUpperCase(),
      CreditLimit: supplier.CreditLimit,

      SupplierPIC: supplier.SuppPIC.toUpperCase(),

      //  Date: 26/05/2023 Comment Added by dpk
      Date: dateFormat(new Date().toLocaleDateString(), "yyyy-mm-dd"),
      ContactNo: supplier.ContactNo,
      Email: supplier.Email.toUpperCase(),
      SupplyRegion: supplier.SupplyRegion.toUpperCase(),
      CreditTerms: supplier.CreditTerms,

      Remarks: supplier.Remarks.toUpperCase(),
    });
    spHttpClient
      .post(
        `${siteUrl}/_api/web/lists/getByTitle('SupplierDirectory')/items(${upId})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: body,
        }
      )
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          setSupplierIsOpen(false);
          CallSuppliertableData();
        } else {
          response.json().then((responseJSON) => {
            console.log(responseJSON);
            toast.error("Record not created successfully");
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const deleteFormDataSupplier = (SelectedId: any) => {
    if (SelectedId > 0) {
      spHttpClient
        .post(
          `${siteUrl}/_api/web/lists/getbytitle('SupplierDirectory')/items(${SelectedId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "DELETE",
            },
          }
        )
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            CallSuppliertableData();
            toast.success("Record deleted successfully");
            setDelete(false);
          } else {
            toast.error("Something went wrong!!!");
            console.log(response.json());
          }
        });
    } else {
      toast.error(`Please enter a valid item id.`);
    }
    setDelete(false);
  };
  const deleteFormDataCustomer = (SelectedId) => {
    if (SelectedId > 0) {
      spHttpClient
        .post(
          `${siteUrl}/_api/web/lists/getbytitle('CustomerDirectory')/items(${SelectedId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "DELETE",
            },
          }
        )
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            CallCustomertableData();
            toast.success("Record deleted successfully");
            setDeleteCustomer(false);
          } else {
            toast.error("Something went wrong!!!");
            console.log(response.json());
          }
        });
    } else {
      toast.error(`Please enter a valid item id.`);
    }
  };

  const cancelEditSupplierData = () => {
    SetEditsuppliearIsOpen(false);

    supplier = [];
    setSupplier({
      ...supplier,
      LeadTrader: "",
      BackupTrader: "",
      SuppCountry: "",
      SuppFullStyle: "",
      CreditLimit: "",
      SuppPIC: "",
      ContactNo: "",
      Email: "",
      SupplyRegion: "",
      CreditTerms: "",
      Remarks: "",
      DateState: "",
    });
  };

  //date24may2023 people picker
  const _getPeoplePickerItems = () => {
    return context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        return client.api("/users").get();
      })
      .then((response: any) => {
        if (response && response.value) {
          storeArrayDate = response.value;
          return response.value;
        } else {
          throw new Error("No users found");
        }
      })
      .catch((error: any) => {
        console.log("Error retrieving users:", error);
        throw error;
      });
  };

  // Date: 25/1/23 Added Validation by Deepak Prajapat
  const updateEditSupplierFormData = (upEditId: any) => {
    if (supplier.LeadTrader === "") {
      return toast.warning("Lead trader can't empty");
    } else if (supplier.BackupTrader === "") {
      return toast.warning("Backup trader can't empty");
    } else if (supplier.SuppCountry === "") {
      return toast.warning("Supplier country can't empty");
    } else if (supplier.SuppFullStyle === "") {
      return toast.warning("Supplier full-Style can't empty");
    } else if (supplier.CreditLimit === "") {
      return toast.warning("Supplier credit Limit can't empty");
    } else if (creditLimitVali.test(supplier.CreditLimit) === false) {
      return toast.warning("Please enter valid credit limit");
    } else if (supplier.SuppPIC === "") {
      return toast.warning("Supplier pic can't empty");
    } else if (supplier.ContactNo === "") {
      return toast.warning("Contact no can't empty");
    }
    //  else if (contactVali.test(supplier.ContactNo) === false) {
    //   return toast.warning("Please enter valid contact number");
    // }
    if (supplier.Email == "") {
      return toast.warning("Email can't empty");
    } else if (emailVali.test(supplier.Email) === false) {
      return toast.warning("Please enter valid email");
    } else if (supplier.SupplyRegion == "") {
      return toast.warning("Supply region can't empty");
    } else if (supplier.CreditTerms == "") {
      return toast.warning("Credit terms can't empty");
    } else if (creditTermsVali.test(supplier.CreditTerms) === false) {
      return toast.warning("Please enter valid credit terms");
    } else if (
      supplier.LeadTrader != "" &&
      supplier.BackupTrader != "" &&
      supplier.SuppFullStyle != "" &&
      supplier.SuppCountry != "" &&
      supplier.SuppPIC != "" &&
      supplier.Email != "" &&
      //18may2023
      // supplier.DateState != "" &&

      supplier.ContactNo != "" &&
      supplier.SupplyRegion != "" &&
      supplier.CreditTerms != "" &&
      supplier.CreditLimit != ""
    ) {
      const body: string = JSON.stringify({
        Title: supplier.LeadTrader,
        LeadTrader: supplier.LeadTrader,
        BackupTrader: supplier.BackupTrader,
        SupplierCountry: supplier.SuppCountry,
        SupplierNamefullstyle: supplier.SuppFullStyle,
        //18may2023
        Date: supplier.DateState,
        // Date:dateFormat(
        //   new Date(supplier.DateState).toLocaleDateString(),
        //  "dd-mm-yyyy"

        // ),
        SupplierPIC: supplier.SuppPIC,
        ContactNo: supplier.ContactNo,
        Email: supplier.Email,
        SupplyRegion: supplier.SupplyRegion,
        CreditTerms: supplier.CreditTerms,
        CreditLimit: supplier.CreditLimit,
        Remarks: supplier.Remarks,
      });
      spHttpClient
        .post(
          `${siteUrl}/_api/web/lists/getByTitle('SupplierDirectory')/items(${upEditId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "content-type": "application/json;odata=nometadata",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "MERGE",
            },
            body: body,
          }
        )
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            CallSuppliertableData();
            toast.success("Record updated successfully");
            SetEditsuppliearIsOpen(false);
          } else {
            response.json().then((responseJSON) => {
              console.log(responseJSON);
              toast.error("Record not updated");
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const deleteAnnoucementData = (SelectedId) => {
    if (SelectedId > 0) {
      spHttpClient
        .post(
          `${siteUrl}/_api/web/lists/getbytitle('Announcement')/items(${SelectedId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "DELETE",
            },
          }
        )
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            CallAnnouncemnetData();
            setDelete(false);
            toast.error("Record deleted successfully");
          } else {
            alert(`Something went wrong!`);
            console.log(response.json());
          }
        });
    } else {
      toast.error(`Please enter a valid item id.`);
    }
  };
  const updateAnnouncement = (data: any, key: any) => {
    SetAnnouncement((a: any) => ({ ...a, [key]: data }));
  };

  const cancelEditCustomerData = () => {
    setEditCustomer(false);
    setCustomer({
      ...customer,
      TradingGroupName: "",
      CustomerRegistration: "",
      CustCountry: "",
      //23may2023
      // TraderName: "",
      Traders: "",
      Date1: "",
      Status: "",
    });
  };
  // Validation Added BY Deepak Date: 15/02/23
  const updateEditCustomerFormData = (upEditId: any) => {
    //date4april2023 started
    debugger;

    customerTradersEmail = customer.Traders;
    console.log(customerTradersEmail);
    // alert(customerTradersEmail);
    if (customercurrrentuser === customerTradersEmail) {
      // alert("valid")
      //   setbuttonVisible(true);
    } else {
      //alert("INvalid")
      return toast.warning("You cant change the status of customer");
    }
    //EditFromData1();
    //date4april2023 ended

    if (customer.TradingGroupName === "") {
      return toast.warning("Trading group name can't empty");
    }
    //18may2023
    // else if (customer.Date1 === "") {
    //   return toast.warning("Date can't empty");
    // }
    else if (customer.Status === "") {
      return toast.warning("Status can't empty");
    } else if (customer.Traders === "") {
      return toast.warning("Traders can't empty");
    } else if (customer.CustCountry === "") {
      return toast.warning("CustCountry can't empty");
    } else if (customer.CustomerRegistration === "") {
      return toast.warning("CustomerRegistration can't empty");
    } else if (
      customer.TradingGroupName != "" &&
      //18may2023
      // customer.Date1 != "" &&
      customer.Status != "" &&
      //date23may2023
      //  customer.TraderName != "" &&
      customer.Traders != "" &&
      customer.CustCountry != "" &&
      customer.CustomerRegistration != ""
    ) {
      const body: string = JSON.stringify({
        Title: customer.TradingGroupName,
        TradingGroupName: customer.TradingGroupName,
        //18may2023
        //  DateofReviewAddition: customer.Date1,
        DateofReviewAddition: dateFormat(
          new Date(customer.Date1).toLocaleDateString(),
          "yyyy-mm-dd"
        ),
        Status: customer.Status,
        //23may2023
        //  TraderName: customer.TraderName,
        Trader: customer.Traders,
        CountryIncorporation: customer.CustCountry,
        CustomerRegisteredName: customer.CustomerRegistration,
      });
      spHttpClient
        .post(
          `${siteUrl}/_api/web/lists/getByTitle('CustomerDirectory')/items(${upEditId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "content-type": "application/json;odata=nometadata",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "MERGE",
            },
            body: body,
          }
        )
        .then(async (response: SPHttpClientResponse) => {
          if (response.ok) {
            CallCustomertableData();
            toast.success("Record updated successfully");
            setEditCustomer(false);
          } else {
            response.json().then((responseJSON) => {
              console.log(responseJSON);
              toast.error("Record not updated");
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  //Function added  by deepak Date: 20/02/23

  const cancelAnnouncementData1 = () => {
    SethandleFile("");
    CallAnnouncemnetData();
    fileData = [];
    SetAnnouncement({
      ...Announcement,
      Title: "",
      handleFile: "",
      AnnouncementType: "",
    });
  };

  const updateAnnouncementData = (upId: any) => {
    const date = new Date(Date());
    const dateFormat: any = {
      // weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const DateCurrent1 = date.toLocaleString("en-US", dateFormat);

    //Date: 27/1/23 Validation Added by Deepak
    if (Announcement.Title === "") {
      return toast.warning("Title can't empty");
    } else if (fileData.length == 0) {
    }
    const body: string = JSON.stringify({
      Title: Announcement.Title,
      AnnouncementType: Announcement.AnnouncementType,
      CreatedDateTime: DateCurrent1,
    });
    spHttpClient
      .post(
        `${siteUrl}/_api/web/lists/getByTitle('Announcement')/items(${upId})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: body,
        }
      )
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          deleteAttachmentUpdate(upId);

          CallAnnouncemnetData();

          toast.success("Record updated successfully");
          SetAnnouncePopup(false);
          SetAnnouncement({
            ...Announcement,
            Title: "",
            handleFile: "",
            AnnouncementType: "",
          });
        } else {
          response.json().then((responseJSON) => {
            console.log(responseJSON);
            toast.error("Title Allowed 255 character length only");
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const checkValiAnnoun = () => {
    if (Announcement.Title === "") {
      return toast.warning("Title can't empty");
    } else if (fileData.length == 0) {
      return toast.warning("Please upload file");
    } else if (Announcement.Title !== "" && fileData.length !== 0) {
    }
  };

  const deleteAttachmentUpdate = (upId: any) => {
    getAttachmentDeleteUpdate(upId);
  };
  const updateAttachmentData = async (Id: any) => {
    await spHttpClient
      .post(
        `${siteUrl}/_api/web/lists/getByTitle('Announcement')/items(${Id})/AttachmentFiles/add(FileName='${fileData[0].name}')`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": "",
          },
          body: fileData[0],
        }
      )
      .then((response: SPHttpClientResponse) => {
        checkValiAnnoun();
        if (response.ok) {
          SethandleFile("");
          CallAnnouncemnetData();
          fileData = [];
          response.json().then((results: any) => {
            console.log(results);
          });
        } else {
          response.json().then((responseJSON) => {
            console.log(responseJSON);
            toast.error("Something went wrong!!!");
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const getAttachmentDeleteUpdate = (SelectedId: any) => {
    let restApiurl: string = `${siteUrl}/_api/web/lists/getByTitle('Announcement')/items(${SelectedId})/attachmentfiles`;
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": "",
      },
    };
    return new Promise<string>(async (resolve, reject) => {
      spHttpClient
        .get(restApiurl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              file = results.value[0].FileName;

              // delete api start

              if (fileData.length > 0) {
                spHttpClient
                  .post(
                    `${siteUrl}/_api/web/getFileByServerRelativeUrl('${imgUrl}')`,

                    SPHttpClient.configurations.v1,
                    {
                      headers: {
                        Accept: "application/json;odata=nometadata",
                        "content-type": "application/json;odata=nometadata",
                        "odata-version": "",
                        "X-HTTP-Method": "DELETE",
                      },
                    }
                  )
                  .then((response: SPHttpClientResponse) => {
                    if (response.ok) {
                      updateAttachmentData(SelectedId);
                    } else {
                      toast.error("Something went wrong!!!");
                      console.log(response.json());
                    }
                  });
              } else {
              }
            });
          } else {
            response.json().then((responseJSON) => {
              console.log(responseJSON);
              toast.error("Something went wrong!!!");
            });
          }
        });
    });
  };
  const handleChange = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    fileData.push(e.target.files[0]);
    FileName = fileData[0].name;

    reader.onload = (e: any) => {
      const fileUploaded = e.target.result;
      SethandleFile(fileUploaded);
    };
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = (e: any) => {
    hiddenFileInput.current.click();
  };

  //Date 29/3/2023
  const HandleOnUpdateData1 = (e: any, key: any) => {
    console.log("e value is", e.target.value);
    let dateValue = e.target.value;
    // check the condition
    //let result = (e == " ") ? 'pass' : 'fail';
    //console.log(`You ${result} the exam.`);
    // setSupplier((s: any) => ({...s, [key]: e.target.value }));
    const date = new Date();
    console.log(date);
    //  setSupplier((s: any) => ({...s, [key]: date }));

    //date 30/03/2023
    if (dateValue === "") {
      setSupplier((s: any) => ({ ...s, [key]: date }));
    } else {
      setSupplier((s: any) => ({ ...s, [key]: e.target.value }));
    }
  };
  const HandleOnUpdateData2 = (e: any, key: any) => {
    console.log("e value is", e);
    // let ValueData = e.target.value;
    let ValueData = e;
    // check the condition
    //let result = (e == " ") ? 'pass' : 'fail';
    //console.log(`You ${result} the exam.`);
    // setSupplier((s: any) => ({...s, [key]: e.target.value }));
    const Values = null;
    console.log(date);
    //  setSupplier((s: any) => ({...s, [key]: date }));

    //date 30/03/2023
    if (ValueData !== "") {
      setSupplier((s: any) => ({ ...s, [key]: ValueData }));
    } else {
      setSupplier((s: any) => ({ ...s, [key]: e.target.value }));
    }
  };

  //31/3/2023 ended
  const HandleOnUpdateData = (data: any, key: any) => {
    setSupplier((s: any) => ({ ...s, [key]: data.target.value }));
  };

  const CusHandleOnUpdateData = (data: any, key: any) => {
    setCustomer((c: any) => ({ ...c, [key]: data }));
  };

  ///nehal31may2023
  const _getPeoplePickerItems_PeopelID = (e: any) => {
    debugger;

    selectedUser = e[0].secondaryText;

    SelectedUserName = e[0].text;

    setCustomer({
      ...customer,
      Trader_Email: selectedUser,
      Trader_Name: SelectedUserName,
    });

    // console.log("customer", customer);
  };

  //  var fielddisable = EditCustomer  ? true: false

  return (
    <>
      <MainDiv
        modalIsOpen={
          modalIsOpen ||
          Delete ||
          supplierIsOpen ||
          EditCustomer ||
          AnnouncePopup ||
          DeleteCustomer ||
          EditsuppliearIsOpen ||
          DeleteAnnouncement
        }
        className="df-c"
      >
        {modalIsOpen === true && (
          <Modal width={ModelWidth}>
            <div>
              <Header text={text} borderBottom={`1px solid ${colorE2}`} />
            </div>
            <div>
              <Input
                text={"Trading/Group Name"}
                type={"text"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({ ...customer, TradingGroupName: e.target.value })
                }
              />
              <Input
                text={"Customer - Registered Name"}
                type={"text"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({
                    ...customer,
                    CustomerRegistration: e.target.value,
                  })
                }
              />
              <Input
                text={"Country Incorp"}
                type={"text"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({ ...customer, CustCountry: e.target.value })
                }
              />
              {/* <Input
                text={"Trader Name"}
                type={"text"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({ ...customer, TradersName: e.target.value })
                }
              /> */}
              <Input
                text={"Trader Email "}
                type={"text"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({ ...customer, Traders: e.target.value })
                }
              />

              {/* Date : 26/05/23 code added by dpk start*/}

              <div className="eyhLqE1 mt20">
                Trader Name <span className="jGnVch1">*</span>
              </div>

              <PeoplePicker
                required={true}
                context={context}
                peoplePickerCntrlclassName={"iOJgNY1"}
                placeholder="Search"
                // titleText="Trader Name"
                personSelectionLimit={1}
                groupName={""}
                onChange={_getPeoplePickerItems_PeopelID}
              />

              {/* Date : 26/05/23 code added by dpk end*/}

              <Input
                text={"Date of Review/Addition"}
                type={"date"}
                placeholder={""}
                modalIsOpen={modalIsOpen}
                width={"98%"}
                classNameLabel={"mt20"}
                onChange={(e: any) =>
                  setCustomer({ ...customer, Date1: e.target.value })
                }
                disabled={true}
                defaultValue={dateFormat(
                  new Date().toLocaleDateString(),
                  "yyyy-mm-dd"
                )}
                // "2023-05-18"
              />
              <InputDropDowncust
                text={"Status"}
                classNameLabel="mt20"
                modalIsOpen={modalIsOpen}
                Data={DataActive}
                onChange={(e: any) =>
                  setCustomer({ ...customer, Status: e.target.value })
                }
              />
              <div className="df-e mt20 g20">
                <InputBtn
                  btn={"Cancel"}
                  color={GrayAB}
                  onClick={() => setModelIsOpen(false)}
                  hoverColor={PrimaryHover}
                  width={"122px"}
                />
                <InputBtn
                  btn={"Submit"}
                  color={PrimaryColor}
                  hoverColor={PrimaryHover}
                  onClick={handleSubmitCutomer}
                  width={"122px"}
                />
              </div>
            </div>
          </Modal>
        )}
        {EditCustomer === true && (
          <Modal width={ModelWidth}>
            <div>
              <Header text={text} borderBottom={`1px solid ${colorE2}`} />
            </div>

            <div>
              <div>
                <Input
                  text={"Trading/Group Name"}
                  type={"text"}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  width={"98%"}
                  name="tradingname"
                  classNameLabel={"mt20"}
                  disabled={true}
                  defaultValue={customer.TradingGroupName}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "TradingGroupName"
                    )
                  }
                />
              </div>
              <div>
                <Input
                  classNameLabel={"mt20"}
                  text={"Customer - Registered Name"}
                  type={"text"}
                  disabled={true}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  width={"98%"}
                  name="registeredname"
                  defaultValue={customer.CustomerRegistration}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "CustomerRegistration"
                    )
                  }
                />
              </div>
              <div>
                <Input
                  classNameLabel={"mt20"}
                  text={"Country Incorp"}
                  disabled={true}
                  type={"text"}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  width={"98%"}
                  name="country"
                  defaultValue={customer.CustCountry}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "CustCountry"
                    )
                  }
                />
              </div>
              <div>
                {/* date23may2023 */}
                {/* <Input
                  text={"Trader Name"}
                  type={"text"}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  disabled={true}
                  width={"98%"}
                  name="traders"
                  classNameLabel={"mt20"}
                  defaultValue={customer.TraderName}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "TraderName"
                    )
                  }
                /> */}

                <Input
                  text={"Trader Email"}
                  type={"text"}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  disabled={true}
                  width={"98%"}
                  name="traders"
                  classNameLabel={"mt20"}
                  defaultValue={customer.Traders}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "Traders"
                    )
                  }
                />
                <div className="eyhLqE1 mt20">
                  Trader Name<span className="jGnVch1"> *</span>
                </div>

                <PeoplePicker
                  // titleText={"Trader Name"}
                  context={context}
                  disabled={true}
                  placeholder="Search"
                  peoplePickerCntrlclassName={"iOJgNY1"}
                  defaultSelectedUsers={[customer.TraderNamePeoplePicker]}
                  required
                  groupName={""}
                />
              </div>
              <div>
                <Input
                  text={"Date of Review/Addition"}
                  type={"Date"}
                  placeholder={""}
                  editCustomer={EditCustomer}
                  disabled={true}
                  width={"98%"}
                  name="status"
                  classNameLabel={"mt20"}
                  defaultValue={dateFormat(
                    new Date(customer.Date1).toLocaleDateString(),
                    "yyyy-mm-dd"
                  )}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(e.target.value, "Date1")
                  }
                />
              </div>
              <div>
                <InputDropDowncust
                  id={"customer_edit__btn"}
                  text={"Status"}
                  classNameLabel="mt20"
                  Data={DataActive}
                  defaultValue={customer.Status}
                  onChange={(e: any) =>
                    CusHandleOnUpdateData(
                      e.target.value.toUpperCase(),
                      "Status"
                    )
                  }
                />
              </div>
            </div>
            <div className="df-e mt20 g20">
              <InputBtn
                btn={"Cancel"}
                color={GrayAB}
                onClick={() => cancelEditCustomerData()}
                hoverColor={PrimaryHover}
                width={"122px"}
                classNameLabel={"mt20"}
              />
              <InputBtn
                btn={"Submit"}
                color={PrimaryColor}
                hoverColor={PrimaryHover}
                onClick={() => {
                  updateEditCustomerFormData(customer.Id);
                }}
                width={"122px"}
                classNameLabel={"mt20"}
              />
            </div>
          </Modal>
        )}
        {Delete === true && (
          <Modal width={"291px"} onChange={onchange}>
            <div>
              <Header text={DeleteText} />
              <DeletePopupContent text={"Record"} />

              <div>
                <div className="df-c mt20 g20">
                  <InputBtn
                    btn={"Cancel"}
                    color={GrayAB}
                    onClick={() => setDelete(false)}
                    hoverColor={PrimaryHover}
                    width={"100px"}
                  />
                  <InputBtn
                    btn={"Delete"}
                    color={PrimaryColor}
                    hoverColor={PrimaryHover}
                    onClick={() => deleteFormDataSupplier(SelectedId)}
                    width={"100px"}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
        {DeleteCustomer === true && (
          <Modal width={"291px"} onChange={onchange}>
            <div>
              <Header text={DeleteText} />
              <DeletePopupContent text={"Record"} />

              <div>
                <div className="df-c mt20 g20">
                  <InputBtn
                    btn={"Cancel"}
                    color={GrayAB}
                    onClick={() => setDeleteCustomer(false)}
                    hoverColor={PrimaryHover}
                    width={"100px"}
                  />
                  <InputBtn
                    btn={"Delete"}
                    color={PrimaryColor}
                    hoverColor={PrimaryHover}
                    onClick={() => deleteFormDataCustomer(SelectedId)}
                    width={"100px"}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
        {DeleteAnnouncement === true && (
          <Modal width={"291px"} onChange={onchange}>
            <div>
              <Header text={DeleteText} />
              <DeletePopupContent text={"Record"} />

              <div>
                <div className="df-c mt20 g20">
                  <InputBtn
                    btn={"Cancel"}
                    color={GrayAB}
                    onClick={() => setDelete(false)}
                    hoverColor={PrimaryHover}
                    width={"100px"}
                  />
                  <InputBtn
                    btn={"Delete"}
                    color={PrimaryColor}
                    hoverColor={PrimaryHover}
                    onClick={() => deleteAnnoucementData(SelectedId)}
                    width={"100px"}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
        {supplierIsOpen === true && (
          <Modal width={ModelWidth} onChange={onchange}>
            <div>
              <Header text={text} borderBottom={`1px solid ${colorE2}`} />
              <div>
                <div className="dg g30 m-db704 model_column_display">
                  <Input
                    className="input_create_supllier_one"
                    text={"Lead Trader"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, LeadTrader: e.target.value })
                    }
                  />
                  <Input
                    className="input_create_supllier_one"
                    text={"Backup Trader"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, BackupTrader: e.target.value })
                    }
                  />
                  <Input
                    className="input_create_supllier_one"
                    text={"Supplier Country"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, SuppCountry: e.target.value })
                    }
                  />
                </div>
                <div className="dg g30 m-db704 model_column_display">
                  <Input
                    className="input_create_supllier_one"
                    text={"Supplier Full-Style"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({
                        ...supplier,
                        SuppFullStyle: e.target.value,
                      })
                    }
                  />
                  <Input
                    className="input_create_supllier_one"
                    text={"Credit Limit"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, CreditLimit: e.target.value })
                    }
                  />
                  <Input
                    className="input_create_supllier_one"
                    text={"Supplier PIC"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, SuppPIC: e.target.value })
                    }
                  />
                </div>
                <div className="dg2 g30 m-db704 model_column_display">
                  <Input
                    className={"input_create_supllier"}
                    text={"Date"}
                    type={"Date"}
                    width={"100%"}
                    placeholder={""}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, DateState: e.target.value })
                    }
                    disabled={true}
                    defaultValue={dateFormat(
                      new Date().toLocaleDateString(),
                      "yyyy-mm-dd"
                    )}
                    // disabled={true}
                    // defaultValue={dateFormat(new Date().toLocaleDateString(),"yyyy-mm-dd")}
                    // disabled
                  />
                  <Input
                    className={"input_create_supllier"}
                    text={"Contact No."}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, ContactNo: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    className="input_create_email_supllier"
                    text={"Email"}
                    type={"text"}
                    width={"99%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, Email: e.target.value })
                    }
                  />
                </div>
                <div className="dg2 g30 m-db704 model_column_display">
                  <Input
                    className="input_create_supllier"
                    text={"Supply Region"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, SupplyRegion: e.target.value })
                    }
                  />
                  <Input
                    className={"input_create_supllier"}
                    text={"Credit Terms"}
                    type={"text"}
                    width={"100%"}
                    supplierIsOpen={supplierIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, CreditTerms: e.target.value })
                    }
                  />
                </div>
                <div>
                  <TextArea
                    className={"input_texarea_create_supplier"}
                    text={"Remarks"}
                    type={"text"}
                    height={"90.3px"}
                    width={"99%"}
                    supplierIsOpen={supplierIsOpen}
                    modalIsOpen={modalIsOpen}
                    classNameLabel={"mt20"}
                    onChange={(e: any) =>
                      setSupplier({ ...supplier, Remarks: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="df-e mt20 g20 m-db317">
                <InputBtn
                  btn={"Cancel"}
                  color={GrayAB}
                  onClick={() => setSupplierIsOpen(false)}
                  hoverColor={PrimaryHover}
                  width={"122px"}
                />
                <InputBtn
                  btn={"Submit"}
                  color={PrimaryColor}
                  hoverColor={PrimaryHover}
                  onClick={() => checkValiAddSupplier()}
                  width={"122px"}
                />
              </div>
            </div>
          </Modal>
        )}
        {AnnouncePopup === true && (
          <Modal width={editWidth} Medwidth={"70%"}>
            <Input
              text={"Title"}
              type={"text"}
              width={"96%"}
              bg={colorf7}
              defaultValue={AnounccedTableData[0].Title}
              // onChange={(e: any) => handaleChangeAnnouncementTitle(e)}
              onChange={(e: any) => updateAnnouncement(e.target.value, "Title")}
            />

            <div className="mt30">
              <UploadFile
                text={"Attach File"}
                icon={<DragNDropIcon />}
                onChange={handleChange}
                onClick={handleClick}
                hiddenFileInput={hiddenFileInput}
                update={update}
                handleFile={handleFile}
                image={imgUrl}
              />
            </div>

            <TextArea
              text={"Type your Announcement"}
              type={"text"}
              height={"129px"}
              width={"99%"}
              defaultValue={AnounccedTableData[0].AnnouncementType}
              // onChange={(e: any) => handaleChangeAnnouncementTypeUpdate(e)}
              onChange={(e: any) =>
                updateAnnouncement(e.target.value, "AnnouncementType")
              }
            />
            <ButtonStyle className="mt20 g10">
              <InputBtn
                btn={"Cancel"}
                color={GrayAB}
                width={"120px"}
                onClick={() => {
                  SetAnnouncePopup(false);
                  cancelAnnouncementData1();
                }}
              />
              <InputBtn
                btn={"Update"}
                color={PrimaryColor}
                width={"120px"}
                onClick={() => updateAnnouncementData(AnounccedTableData[0].Id)}
              />
            </ButtonStyle>
          </Modal>
        )}

        {EditsuppliearIsOpen === true && (
          <Modal width={ModelWidth}>
            <div>
              <Header text={text} />
              <div>
                <div className="dg g30 model_column_display">
                  <Input
                    className="input_edit_supllier_one"
                    text={"Lead Trader"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.LeadTrader}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "LeadTrader"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "LeadTrader"
                      )
                    }
                  />
                  <Input
                    className="input_edit_supllier_one"
                    text={"Backup Trader"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.BackupTrader}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "BackupTrader"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "BackupTrader"
                      )
                    }
                  />
                  <Input
                    className="input_edit_supllier_one"
                    text={"Supplier Country"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.SuppCountry}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "SuppCountry"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "SuppCountry"
                      )
                    }
                  />
                </div>
                <div className="dg g30 model_column_display">
                  <Input
                    className="input_edit_supllier_one"
                    text={"Supplier Full-Style"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.SuppFullStyle}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "SuppFullStyle"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "SuppFullStyle"
                      )
                    }
                  />
                  <Input
                    className="input_edit_supllier_one"
                    text={"Credit Limit"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.CreditLimit}
                    onChange={(e: any) =>
                      //HandleOnUpdateData(e.target.value, "CreditLimit")
                      HandleOnUpdateData2(e.target.value, "CreditLimit")
                    }
                  />
                  <Input
                    className="input_edit_supllier_one"
                    text={"Supplier PIC"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.SuppPIC}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "SuppPIC"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "SuppPIC"
                      )
                    }
                  />
                </div>
                <div className="dg2 g30 model_column_display">
                  <Input
                    id={"input_date"}
                    className="input_edit_supllier"
                    text={"Date"}
                    type={"Date"}
                    width={"100%"}
                    disabled={true}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    // defaultValue={dateFormat(
                    //   new Date(supplier.DateState).toLocaleDateString(),
                    //  "dd-mm-yyyy"

                    // )}
                    //  Date:26/05/23 comment added by dpk
                    defaultValue={dateFormat(
                      new Date(supplier.DateState).toLocaleDateString(),
                      "yyyy-mm-dd"
                    )}
                    onChange={(e: any) => HandleOnUpdateData1(e, "DateState")}
                  />
                  <Input
                    className="input_edit_supllier"
                    text={"Contact No."}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.ContactNo}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(e.target.value, "ContactNo")
                      HandleOnUpdateData2(e.target.value, "ContactNo")
                    }
                  />
                </div>
                <div>
                  <Input
                    className="input_edit_email_supllier"
                    text={"Email"}
                    type={"text"}
                    width={"99%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.Email}
                    onChange={(e: any) => {
                      // HandleOnUpdateData(e.target.value.toUpperCase(), "Email");
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "Email"
                      );
                    }}
                  />
                </div>
                <div className="dg2 g30 model_column_display">
                  <Input
                    className="input_edit_supllier"
                    text={"Supply Region"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.SupplyRegion}
                    onChange={(e: any) => {
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "SupplyRegion"
                      // );
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "SupplyRegion"
                      );
                    }}
                  />
                  {/* Date:25/01/23 Change CreditTerms Filed Name b'coz unable to update credit terms update SupplyRegion dony by deepak */}
                  <Input
                    className="input_edit_supllier"
                    text={"Credit Terms"}
                    type={"text"}
                    width={"100%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.CreditTerms}
                    onChange={(e: any) => {
                      // HandleOnUpdateData(e.target.value, "CreditTerms");
                      HandleOnUpdateData2(e.target.value, "CreditTerms");
                    }}
                  />
                </div>
                <div>
                  <TextArea
                    className={"input_texarea_edit_supplier"}
                    text={"Remarks"}
                    type={"text"}
                    height={"90.3px"}
                    width={"99%"}
                    editsuppliearIsOpen={EditsuppliearIsOpen}
                    modalIsOpen={modalIsOpen}
                    classNameLabel={"mt20"}
                    defaultValue={supplier.Remarks}
                    onChange={(e: any) =>
                      // HandleOnUpdateData(
                      //   e.target.value.toUpperCase(),
                      //   "Remarks"
                      // )
                      HandleOnUpdateData2(
                        e.target.value.toUpperCase(),
                        "Remarks"
                      )
                    }
                  />
                </div>
              </div>
              <div className="df-e mt20 g20 model_column_display_btn">
                <InputBtn
                  btn={"Cancel"}
                  color={GrayAB}
                  onClick={() => cancelEditSupplierData()}
                  hoverColor={PrimaryHover}
                  width={"122px"}
                />
                <InputBtn
                  btn={"Submit"}
                  color={PrimaryColor}
                  hoverColor={PrimaryHover}
                  onClick={() => updateEditSupplierFormData(supplier.Id)}
                  width={"122px"}
                />
              </div>
            </div>
          </Modal>
        )}
        {/* <ToastContainer /> */}
      </MainDiv>
    </>
  );
};
