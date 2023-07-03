import {
  ISPHttpClientOptions,
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import * as React from "react";
import { toast } from "react-toastify";
import { SearchIcon } from "../assets/icons";
import { colorf7, colorFF, PrimaryColor } from "../color/color";
import { Popup } from "../Popup/Popup";
import {
  ContainerDiv,
  InputDiv,
  InputMainDiv,
  OuterDiv,
} from "../Style/ComponentStyled";
import { CustomerTable } from "../Table/CustomerTable";
import {
  CustomerCountryDropdown,
  CustomerNameDropdown,
  Header,
  Input,
  InputBtn,
  OutlineBtn,
  TableEmpty,
} from "./Component";
import { useHistory } from "react-router-dom";
import { IOilMarkProjectProps } from "../IOilMarkProjectProps";
import { ValidationState } from "office-ui-fabric-react";
import dateFormat from "dateformat";

var array = [];
export const Customer = (props: any) => {
  const [customer, setCustomer] = React.useState({
    TradingGroupName: "",
    CustomerRegistration: "",
    CustCountry: "",
    //date23may2023
   // TradersName: "",
    Traders: "",
    Date1: "",
    Status: "Active",
  });


  const[search ,setSearch] = React.useState<any>({
     SearchCountry: "",
    SearchCustNamefullStyle: "",
  });


  var btn: any;
  const [modalIsOpen, setModelIsOpen] = React.useState<any>(false);
  const [CreateCustomer, SetCreateCustomer] = React.useState<any>("");
  const [searchName, setSearchName] = React.useState<any>(false);
  const [searchCountry, setSearchCountry] = React.useState<any>(false);
  const [customerTableOpen, setcustomerTableOpen] = React.useState<any>(false);
  const [border, setBorder] = React.useState<any>(false);
  const [countery, SetCountery] = React.useState<any>("");
  const [CustomerData, setCustomerData] = React.useState<any>([]);
  const [SetStateData, setStateData] = React.useState<any>([]);
  const [CustomerDataUpdated, setCustomerDataUpdated] = React.useState<any>([]);
  const [SearchCustomerCountry, SetSearchCustomerCountry] =
    React.useState<any>("");
  const [SearchCustomerRegisName, SetSearchCustomerRegisName] =
    React.useState<any>("");
  const [FilteredCustomerData, setFilteredCustomerData] = React.useState<any>(
    []
  );
  const [custallCountryData, setCustAllCountryData] = React.useState<any>([]);
  const [custdropdownData, setCustdropdownData] = React.useState<any>([]);
  const [custnamedropdownData, setCustNamedropdownData] = React.useState<any>(
    []
  );
  const history = useHistory();
  React.useEffect(() => {
    
    CustomertableData();
    //HidePowerBidashboard();
  }, []);

  //date 31/3/2023
  const HidePowerBidashboard =() =>{
    
//document.getElementById("pbiAppPlaceHolder").style.display = "none";
document.getElementById("CanvasSection").style.display = "none";

  }

  const CustomertableData = async (text?: any) => {
    
    let restApiurl: string =
      props.siteUrl + "/_api/web/lists/getByTitle('CustomerDirectory')/items?$top=5000";
      // props.siteUrl + "/_api/web/lists/getByTitle('CustomerDirectory')/items?$select=*";
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": "",
      },
    };
    return new Promise<string>(async (resolve, reject) => {
      await props.spHttpClient
        .get(restApiurl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              
              setCustomerDataUpdated(results.value);
              setCustAllCountryData(results.value);
              // setCustomerData(CustomerDataUpdated);
              // array = results.value;


            if (
                text.SearchCountry != "" ||
                text.SearchCustNamefullStyle != ""
              ) {
                 SearchCustomer(text);
              }
            });
           
          } else {
            response.json().then((responseJSON) => {
              console.log(responseJSON);
              alert(
                `Something went wrong! Check the error in the browser console.`
              );
            });
          }
        });
    });
  
  };


  const SearchCustomer = (t?: any) => {
    
    // setFilteredCustomerData(
    //   let NameSearch= "";
    //   let CountrySearch = "";

    //     NameSearch= custdropdownData.length > 0 ? custdropdownData:"";
    //     CountrySearch=custnamedropdownData.length >0 ? custnamedropdownData:"";

    // var filterCountryData = custallCountryData.filter(
    //   (item: any) =>
    //   item.CountryIncorporation.includes(NameSearch) &&
    //   item.CustomerRegisteredName.includes(CountrySearch) 

    //     // item.CountryIncorporation.includes(NameSearch.toUpperCase()) &&
    //     // item.CustomerRegisteredName.includes(CountrySearch.toUpperCase())
    // );
    // // );
    // setFilteredCustomerData(filterCountryData);
    // if(filterCountryData.length == 0){
    // toast.warning("No Record Found");
    // }

    
    // Date 30/02/23 Added by dpk 
      let NameSearch= "";
      let CountrySearch = "";
     NameSearch = custdropdownData.length > 0 ? custdropdownData : "";
    CountrySearch = custnamedropdownData.length > 0 ? custnamedropdownData : "";
  
    var filterCountryData = custallCountryData.filter((item: any) => {
      const itemCountryIncorporation = item.CountryIncorporation || "";
      const itemCustomerRegisteredName = item.CustomerRegisteredName || "";
  
      return (
        itemCountryIncorporation.includes(NameSearch) &&
        itemCustomerRegisteredName.includes(CountrySearch)
      );
    });
  
    setFilteredCustomerData(filterCountryData);
    if (filterCountryData.length === 0) {
      toast.warning("No Record Found");
    }
  };

  console.log("CustomerDataUpdated", CustomerData);

  const SearchCustomerCountryDetails = (e: any) => {

    
    if (e.target.value === "") {
      setFilteredCustomerData([]);
      SetSearchCustomerCountry("");
    } else {
      SetSearchCustomerCountry(e.target.value);
    }
  };
  const SearchCustomerRegisNameDetails = (e: any) => {
    
    SetSearchCustomerRegisName(e.target.value);
    if (e.target.value === "") {
      setFilteredCustomerData([]);
    }
  };



  const validationSearch = () => {
    

    console.log("custdropdata---->", custdropdownData);
    var search = false;
    let NameSearch= "";
    let CountrySearch = "";
    
        
    CountrySearch = custdropdownData.length>0 ? custdropdownData:"";
    NameSearch = custnamedropdownData.length>0 ? custnamedropdownData:"";
      // CountrySearch = custdropdownData.length>0 ? custdropdownData.toUpperCase():"";
      // NameSearch = custnamedropdownData.length>0 ? custnamedropdownData.toUpperCase():"";

      //history.push("/Customer");
    {
        CustomerDataUpdated.map((item: any) => {
        // console.log("itemofcustomer",item.CustomerRegisteredName)
         console.log("item.CustomerRegisteredName", item.CustomerRegisteredName);
        if (
          NameSearch === item.CustomerRegisteredName ||
          CountrySearch === item.CountryIncorporation
        ) {
          search = true;
        }
      });
    }

     console.log("CustomerDataUpdated----------->", CustomerDataUpdated);
     
    if (custdropdownData === "" && custnamedropdownData === "") {
      toast.warning("Please enter customer details to search");
    } else if (search) {
      SearchCustomer(); 
      setcustomerTableOpen(true);
    } else {
      toast.warning("No Record Found");
    }
  };


  const handleKeypress = (e) => {
    
    if (e.key === "Enter") {
      validationSearch();
    }
  };


  return (
    <>
      <div>
        <Header text={"Customer"} />
      </div>
      <ContainerDiv className="p15 df-sb g25">
        <InputMainDiv className="df g15">
          <InputDiv>
            <CustomerNameDropdown
              CustomerDataUpdated={CustomerDataUpdated}
              setCustNamedropdownData={setCustNamedropdownData}
              custnamedropdownData={custnamedropdownData}          
              text={"Search by Customer"}
              onKeyPress={(e) => handleKeypress(e)}

            />
  
          </InputDiv>
          <InputDiv>
            <CustomerCountryDropdown
          
              CustomerDataUpdated={CustomerDataUpdated}
              // setCustdropdownData={(e: any) => {
              //   console.log("ccc->>>>>>", e);
              // }}
              setCustdropdownData={setCustdropdownData}
              custdropdownData={custdropdownData}
              onKeyPress={(e) => handleKeypress(e)}
              placeholder={"Search Country"}
              text={"Search by Country"}
              
            />
          </InputDiv>
        </InputMainDiv>
        <OuterDiv className="df-c-ae g15">
          <InputBtn
            btn={"Search"}
            icon={<SearchIcon />}
            color={PrimaryColor}
            width={"auto"}
            borderRadius={"5px"}
            className={"f-sz16 df g15"}
            onClick={() => validationSearch()}
          />
          <OutlineBtn
            color={PrimaryColor}
            bg={colorFF}
            text={"Add New Customer"}
            onClick={() => setModelIsOpen(true)}
            padding={"15px 37px"}
            width={"auto"}
            borderRadius={"5px"}
            height={"48px"}
            className={"mt10"}
            borderColor={PrimaryColor}
          />
        </OuterDiv>
      </ContainerDiv>
      {customerTableOpen === true ? (
        <CustomerTable
          CustomerDataFilter={FilteredCustomerData}
          context={props.context}
          siteUrl={props.siteUrl}
          description={""}
          spHttpClient={props.spHttpClient}
          pageContext={props.pageContext}
          CallSearchCustomer={SearchCustomer}
          CallCustomertableData={CustomertableData}
          customer={customer}
          setCustomer={setCustomer}
          SearchCustomerCountry={SearchCustomerCountry}
          SearchCustomerRegisName={SearchCustomerRegisName}
          array={array}
        />
      ) : (
        <div className="mt20">
          <TableEmpty text={"Search to display table content"} />
        </div>
      )}

      <Popup
        modalIsOpen={modalIsOpen}
        setModelIsOpen={setModelIsOpen}
        ModelWidth={"80%"}
        onClick={""}
        text={"Add New Customer"}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        OnClickCancle={() => setModelIsOpen(false)}
        CallSearchCustomer={SearchCustomer}
        CallCustomertableData={CustomertableData}
        customer={customer}
        setCustomer={setCustomer}
      />
    </>
  );
};
function componentDidMount() {
  throw new Error("Function not implemented.");

}

function setSearch(arg0: any) {
  throw new Error("Function not implemented.");
}

