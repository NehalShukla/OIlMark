import {
  ISPHttpClientOptions,
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import * as React from "react";
import { toast } from "react-toastify";
import { SearchIcon } from "../assets/icons";
import { colorf7, colorFF, PrimaryColor } from "../color/color";
import { IOilMarkProjectProps } from "../IOilMarkProjectProps";
import { Popup } from "../Popup/Popup";
import {
  ContainerDiv,
  InputDiv,
  InputMainDiv,
  MediaContent,
  OuterDiv,
} from "../Style/ComponentStyled";
import { Suppliertable } from "../Table/Suppliertable";
import {
  Header,
  Input,
  InputBtn,
  OutlineBtn,
  SupplierCountryDropdown,
  SupplierNameDropdown,
} from "./Component";
export const Supplier: React.FC<IOilMarkProjectProps> = (props: any) => {
  const [supplier, setSupplier] = React.useState<any>({
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

  const [search, setSearch] = React.useState<any>({
    SearchCountry: "",
    SearchSuppNamefullStyle: "",
  });
  const [supplierIsOpen, setSupplierIsOpen] = React.useState<any>(false);
  const [border, setBorder] = React.useState<any>(false);
  const [searchName, setSearchName] = React.useState<any>(false);
  const [searchCountry, setSearchCountry] = React.useState<any>(false);
  const [SupplierData, setSupplierData] = React.useState<any>([]);
  const [allCountryData, setAllCountryData] = React.useState<any>([]);
  const [dropdownData, setdropdownData] = React.useState<any>([]);
  const [namedropdownData, setNamedropdownData] = React.useState<any>([]);

  React.useEffect(() => {
    // SuppliertableData(search);
    SuppliertableData();
    //HidePowerBidashboard();
  }, []);

  //date 31/3/2023
  const HidePowerBidashboard = () => {
    document.getElementById("CanvasSection").style.display = "none";
    document.getElementById("pbiAppPlaceHolder").style.display = "none";
  };
  // const SuppliertableData = (text?: any) => {
  const SuppliertableData = async (text?: any) => {
    // HidePowerBidashboard();
    let restApiurl: string =
      props.siteUrl +
      "/_api/web/lists/getByTitle('SupplierDirectory')/items?$top=5000";
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": "",
      },
    };
    return new Promise<string>(async (resolve, reject) => {
      props.spHttpClient
        .get(restApiurl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              setSupplierData(results.value);
              setAllCountryData(results.value);
              console.log("Helllllllllllll", results.value);
              try {
                if (
                  text.SearchCountry != "" ||
                  text.SearchSuppNamefullStyle != ""
                ) {
                  console.log("Helllllllllllll", results.value);
                  SearchSupplier(text);
                }
              } catch (error) {
                console.log("error customer", results.value);
              }
            });
          } else {
            response.json().then((responseJSON) => {
              alert(
                `Something went wrong! Check the error in the browser console.`
              );
            });
          }
        });
    });
    // HidePowerBidashboard();
  };
  const SearchSupplier = (t?: any) => {
    if (t) {
      // setSupplierData((s) =>
      var filterCountryData = allCountryData.filter(
        (item) =>
          item.SupplierCountry.includes(dropdownData) &&
          item.SupplierNamefullstyle.includes(namedropdownData)
      );
      // );
      setSupplierData(filterCountryData);
    } else {
      // setSupplierData((s) =>
      var filterCountryData = allCountryData.filter(
        (item) =>
          item.SupplierCountry.includes(dropdownData) &&
          item.SupplierNamefullstyle.includes(namedropdownData)
      );
      // );
      setSupplierData(filterCountryData);
      setSearch({
        ...search,
        SearchSuppNamefullStyle: "",
        SupplierCountry: "",
      });
    }
    if (SupplierData.length === 0) {
      // console.log("SupplierData.length", SupplierData.length);
      toast.warning("No record found");
    }
  };

  const validationSearch = () => {
    debugger;

    if (dropdownData === "" && namedropdownData === "") {
      toast.warning("Please enter supplier details to search");
    } else if (dropdownData != "" || namedropdownData != "") {
      SearchSupplier();
    } else {
      toast.warning("Data not found");
    }
  };

  const SearchSupplierCountryDetails = (e: any) => {
    setSearch({ ...search, SearchCountry: e.target.value.toUpperCase() });
  };

  const SearchSuppNamefullStyleDetails = (e: any) => {
    setSearch({
      ...search,
      SearchSuppNamefullStyle: e.target.value.toUpperCase(),
    });
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      validationSearch();
    }
  };

  const PopupSupplierChange = () => {};
  return (
    <>
      <div>
        <Header text={"Supplier"} />
      </div>
      <MediaContent>
        <ContainerDiv className="p15 df-sb g25">
          <InputMainDiv className="df g15">
            <InputDiv>
              <SupplierNameDropdown
                SupplierData={allCountryData}
                setNamedropdownData={setNamedropdownData}
                namedropdownData={namedropdownData}
                text={"Search by Supplier Name"}
                onKeyPress={(e) => handleKeypress(e)}
              />
            </InputDiv>
            <InputDiv>
              <SupplierCountryDropdown
                SupplierData={allCountryData}
                setdropdownData={setdropdownData}
                dropdownData={dropdownData}
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
              onClick={() => {
                validationSearch();
              }}
            />
            <OutlineBtn
              color={PrimaryColor}
              bg={colorFF}
              text={"Add New Supplier"}
              icon={""}
              onClick={() => setSupplierIsOpen(true)}
              padding={"14px 37px"}
              width={"auto"}
              height={"49px"}
              className={"mt10"}
            />
          </OuterDiv>
        </ContainerDiv>
      </MediaContent>
      <Suppliertable
        SupplierData={SupplierData}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        CallSuppliertableData={() => SuppliertableData(search)}
        supplier={supplier}
        setSupplier={setSupplier}
        CallSearchSupplier={() => SearchSupplier()}
      />
      <Popup
        supplierIsOpen={supplierIsOpen}
        setSupplierIsOpen={setSupplierIsOpen}
        ModelWidth={"80%"}
        onchange={() => PopupSupplierChange()}
        text={"Add New Supplier"}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        SupplierData={SupplierData}
        CallSuppliertableData={() => SuppliertableData(search)}
        supplier={supplier}
        setSupplier={setSupplier}
        CallSearchSupplier={() => SearchSupplier()}
      />
    </>
  );
};
function componentdidmount() {
  throw new Error("Function not implemented.");
}
