import * as React from "react";
import { DustbinIcon, EditIcon, Empty } from "../assets/icons";
import Select from "react-dropdown-select";
import { useState, useEffect } from "react";

import {
  A,
  Buttons,
  DropDown,
  DropDownList,
  GraphDiv,
  HeaderStyle,
  IMGStyle,
  InputStyled,
  Label,
  OutBtnStyled,
  Span,
  TableActionDiv,
  TextAreastyled,
  TitleText,
  ToolTipStyle,
  UploadButton,
  EmptyTextStyled,
  InputDrop,
  InputDataLIst,
} from "../Style/ComponentStyled";
import { Dropdown } from "office-ui-fabric-react";
import { element } from "prop-types";

export const AnouncementText = ({ title }) => {
  return (
    <div>
      <div>
        <TitleText>{title}</TitleText>
      </div>
    </div>
  );
};

export const Input = ({
  text,
  type,
  placeholder,
  modalIsOpen,
  width,
  bg,
  color,
  classNameLabel,
  onChange,
  value,
  defaultValue,
  name,
  border,
  supplierIsOpen,
  searchName,
  searchCountry,
  editCustomer,
  editsuppliearIsOpen,
  onKeyPress,
  className,
  disabled,
  dateFormat,
}: any) => {
  return (
    <div>
      <Label className={classNameLabel}>
        {text}
        {text === "Search by Customer" ||
        text === "Search by Country" ||
        text === "Search by Name" ||
        text === "Search by Country" ||
        text === "Search by Supplier Name" ? null : (
          <Span> *</Span>
        )}
      </Label>
      <InputStyled
        type={type}
        placeholder={placeholder}
        modalIsOpen={modalIsOpen}
        width={width}
        supplierIsOpen={supplierIsOpen}
        searchName={searchName}
        searchCountry={searchCountry}
        bg={bg}
        color={color}
        className={className}
        onChange={onChange}
        value={value}
        border={border}
        editCustomer={editCustomer}
        defaultValue={defaultValue}
        editsuppliearIsOpen={editsuppliearIsOpen}
        onKeyPress={onKeyPress}
        disabled={disabled}
      />
    </div>
  );
};




export const PeoplePicker = ({
  text,
  type,
  placeholder,
  modalIsOpen,
  width,
  bg,
  color,
  classNameLabel,
  onChange,
  value,
  defaultValue,
  name,
  border,
  supplierIsOpen,
  searchName,
  searchCountry,
  editCustomer,
  defaultSelectedUsers
  
}: any) => {
  return (
    <div>
      <PeoplePicker
        type={type}
        defaultSelectedUsers={defaultSelectedUsers}
        placeholder={placeholder}
        modalIsOpen={modalIsOpen}
        width={width}
        supplierIsOpen={supplierIsOpen}
        searchName={searchName}
        searchCountry={searchCountry}
        bg={bg}
        color={color}
        onChange={onChange}
        value={value}
        border={border}
        editCustomer={editCustomer}
        defaultValue={defaultValue}
    
      />
    </div>
  );
};



export const InputBtn = ({
  btn,
  color,
  icon,
  onClick,
  hoverColor,
  width,
  borderRadius,
  className,
}: any) => {
  return (
    <div onClick={onClick}>
      <Buttons
        color={color}
        // className="df g15"
        hoverColor={hoverColor}
        width={width}
        borderRadius={borderRadius}
        className={className}
      >
        <div className="fw500">{btn}</div>
        {icon && <div className="df-ac">{icon}</div>}
      </Buttons>
    </div>
  );
};

export const Header = ({ text, borderBottom }: any) => {
  return (
    <HeaderStyle className="fw600 f-sz20" borderBottom={borderBottom}>
      {text}
    </HeaderStyle>
  );
};
export const DeletePopupContent = ({ text }: any) => {
  return (
    <>
      <div className="f-sz20">
        Are you sure you want to delete?
        {/* this<span> {text}. </span>You can’t undo
        this action. */}
      </div>
    </>
  );
};
export const OutlineBtn = ({
  bg,
  color,
  icon,
  text,
  onClick,
  width,
  padding,
  className,
  height,
  borderColor,
}: any) => {
  return (
    <div onClick={onClick}>
      <OutBtnStyled
        bg={bg}
        color={color}
        width={width}
        padding={padding}
        className={className}
        height={height}
        borderColor={borderColor}
      >
        <div className="fw500">{text}</div>
        {icon && <div className="df-ac">{icon}</div>}
      </OutBtnStyled>
    </div>
  );
};

export const TextArea = ({
  text,
  type,
  height,
  width,
  onChange,
  value,
  defaultValue,
  border,
  supplierIsOpen,
  modalIsOpen,
  editsuppliearIsOpen,
  className,
}: any) => {
  return (
    <div className="mt30">
      <div>
        <Label>
          {text}
          {/* Date: 27/01/23 Remove * from Remarks  done by deepak */}
          {/* <Span> *</Span> */}
        </Label>
        <TextAreastyled
          type={type}
          height={height}
          width={width}
          onChange={onChange}
          value={value}
          border={border}
          defaultValue={defaultValue}
          modalIsOpen={modalIsOpen}
          supplierIsOpen={supplierIsOpen}
          editsuppliearIsOpen={editsuppliearIsOpen}
          className={className}
        />
      </div>
    </div>
  );
};

export const ActionDiv = ({ editClick, deleteClick }: any) => {
  return (
    <>
      <TableActionDiv className="df-ev">
        <div className="p5" onClick={editClick}>
          <EditIcon />
        </div>
        <div className="be2"></div>
        <div className="p5" onClick={deleteClick}>
          <DustbinIcon />
        </div>
      </TableActionDiv>
    </>
  );
};

// DeleteIcon customertable cmt added by deepak date: 23/02/23

export const ActionDiv1 = ({ editClick, deleteClick }: any) => {
  return (
    <>
      <TableActionDiv className="df-ev">
        <div className="p5" onClick={editClick}>
          <EditIcon />
        </div>
        {/* <div className="be2"></div>
        <div className="p5" onClick={deleteClick}>
          <DustbinIcon />
        </div> */}
      </TableActionDiv>
    </>
  );
};

// DeleteIcon Searchtable cmt added by deepak date: 23/02/23

export const ActionDiv2 = ({ editClick, deleteClick }: any) => {
  return (
    <>
      <TableActionDiv className="df-ev">
        <div className="p5" onClick={editClick}>
          <EditIcon />
        </div>
        {/* <div className="be2"></div>
        <div className="p5" onClick={deleteClick}>
          <DustbinIcon />
        </div> */}
      </TableActionDiv>
    </>
  );
};

export const Graphs = ({
  title,
  data,
  color,
  bg,
  width,
  height,
  text,
  borderColor,
}: any) => {
  return (
    <GraphDiv>
      <Label className="bgColor txtAlign p15 colorBlack">{title}</Label>
      <div className="">
        <div className="df-e">
          <OutlineBtn
            color={color}
            bg={bg}
            width={width}
            height={height}
            text={text}
            className={"pd"}
            borderColor={borderColor}
          />
        </div>
        <div className="bgColor">{data}</div>
      </div>
    </GraphDiv>
  );
};
export const ToolTip = ({ text, iconShow }: any) => {
  return <ToolTipStyle iconShow={iconShow}>{text}</ToolTipStyle>;
};

export const UploadFile = ({
  text,
  icon,
  onChange,
  onClick,
  hiddenFileInput,
  update,
  handleFile,
  FileName,
  updateAnn,
  image,
}: any) => {
  return (
    <>
      <Label>
        {text}
        <Span>*</Span>
      </Label>
      {update === false || updateAnn === true ? (
        <>
          <div className="df-ac fw500 g30 f-sz15">
            <IMGStyle
              src={
                handleFile === "" || hiddenFileInput === "" ? image : handleFile
              }
            />
            <A onClick={onClick}>Change</A>
          </div>
        </>
      ) : (
        <>
          <UploadButton
            className="txtAlign f-sz16 fw500 g5 df-c-ac p10 h61"
            onClick={onClick}
          >
            <span>{icon}</span>Upload
          </UploadButton>
        </>
      )}

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={onChange}
        accept="image/png, image/gif, image/jpeg"
        style={{ display: "none" }}
      />
    </>
  );
};

export const InputDropDownLeave = ({
  text,
  classNameLabel,
  Data,
  onChange,
}: any) => {
  return (
    <div>
      <Label className={classNameLabel}>
        {text}
        <Span> *</Span>
      </Label>
      <DropDown
        className="borderRadius3 ArrowIconLeave"
        id="cars"
        onChange={onChange}
      >
        {Data.map((item: any, key: any) => {
          return (
            <>
              <DropDownList
                value={item.Typename}
                onChange={onChange}
                key={key}
                className={"selector-options"}
              >
                {item.Typename}
              </DropDownList>
            </>
          );
        })}
      </DropDown>
    </div>
  );
};

export const InputDropDowncust = ({
  text,
  classNameLabel,
  Data,
  onChange,
  defaultValue,
  onSelect,
}: any) => {
  return (
    <div>
      <Label className={classNameLabel}>
        {text}
        <Span> *</Span>
      </Label>
      <DropDown
        className="borderRadius3 ArrowIconCust"
        id="cars"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {Data.map((item: any, index: any) => {
          return (
            <>
              <DropDownList key={index}>
                {item.status.toUpperCase()}
              </DropDownList>
            </>
          );
        })}
      </DropDown>
    </div>
  );
};
export const NoOfDays = ({ text, symbol, value, classNameLabel }: any) => {
  return (
    <div>
      <Label className={classNameLabel}>{text}</Label>
      {value === null ? <div>--</div> : <div>{value}</div>}
    </div>
  );
};

export const Items = ({ currentItems }: any) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any, index: any) => (
          <div key={index}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
};

export const TableEmpty = ({ text }: any) => {
  return (
    <div className="mt20 txtAlign">
      <div>
        <Empty />
      </div>
      <EmptyTextStyled className={"f-sz20 fw600"}>{text}</EmptyTextStyled>
    </div>
  );
};

export const removeDuplicateFromArr = (array, key) => {
 
  const counterVar = new Set();

  const filteredArr = array.filter((el) => {
    const duplicate = counterVar.has(el[key]);

    counterVar.add(el[key]);

    return !duplicate;
  });

  return filteredArr;
};

export const SupplierCountryDropdown = ({
  
  SupplierData,
  dropdownData,
  setdropdownData,
  onKeyPress,
  placeholder,
  text,
}: any) => {

  let newoptions = removeDuplicateFromArr(SupplierData, "SupplierCountry");

  console.log(SupplierData, "demo supplier data");
 
  var country = newoptions.map((item, i) => ({
    
    value: item.SupplierCountry,
    label: item.SupplierCountry,
  }));

  console.log("data countryfffffff->>>", country);
  const onSelect = (e) => {
    if (e.target.value !== "") {
      console.log("eeee->", e.target.value);
      var value = e.target.value;
      setdropdownData(value);
    } else {
      setdropdownData("");
    }
  };

  return (
    <>
      <InputDrop>
        <Label>{text}</Label>
        <InputDataLIst
          dropdownHandle={false}
          list="browsers2"
          // name="browser2"
          placeholder="Search Country"
          // id="browser2"
          Values="dropdownData"
          onChange={(e) => {
            onSelect(e);
          }}
          type="search"
        />
        
        <datalist id="browsers2">
          {country.map((item: any) => (
            <option key={item.value} value={item.value} label={item.label}  />
          ))}
        </datalist>
        
        {/* <Select
          dropdownHandle={false}
          placeholder={placeholder}
          options={country}
          values={dropdownData}
          onChange={(e) => {
            onSelect(e);
            // console.log("Eeeeeeee->", e);
          }}
          searchable
        /> */}
      </InputDrop>

    </>
  );
};
export const SupplierNameDropdown = ({
  SupplierData,
  namedropdownData,
  setNamedropdownData,
  text,
  onKeyPress,
}) => {
  let newoptions = removeDuplicateFromArr(SupplierData, "SupplierCountry");

  var name = newoptions.map((item, i) => ({
    value: item.SupplierNamefullstyle,
    label: item.SupplierNamefullstyle,
  }));

  const onSelect = (e: any) => {
    console.log("eeee=>", e);
    // if (e.target.value.length > 0) {
    //   console.log("eeee->", e.target.value);
    //   var value = e.target.value;
    //   setNamedropdownData(value);
    // } else {
    //   setNamedropdownData("");
    // }
    //  Date:29/5/23 added by dpk
    if (e.target.value !== "") {
      console.log("eeee->", e.target.value);
      var value = e.target.value;
      setNamedropdownData(value);
    } else {
      setNamedropdownData("");
    }
  };
  return (
    <>
      <InputDrop>
        <Label>{text}</Label>
        <InputDataLIst
          list="browsers"
          //  name="browser"
          // id="browser"
          dropdownHandle={false}
          values={namedropdownData}
          onChange={(e) => {
            onSelect(e);
          }}
          type="search"
        />
        
        <datalist id="browsers">
          {name.map((item: any) => (
            <option  key={item.value} value={item.value} label={item.label}/>
          ))}
        </datalist>
        {/* <Select
          dropdownHandle={false}
          placeholder="Search Supplier Name"
          options={name}
          values={namedropdownData}
          onChange={(e) => {
            onSelect(e);
            // console.log("Eeeeeeee->", e);
          }}
          searchable
        /> */}
      </InputDrop>
    </>
  );
};
 
export const removeDuplicateFromArrCustomer = (array, key) => {

  const counterVar = new Set();

  const filteredArrCustomer = array.filter((el) => {
    const duplicate = counterVar.has(el[key]);

    counterVar.add(el[key]);

    return !duplicate;
  });
   
  
  return filteredArrCustomer;
};


export const CustomerNameDropdown = ({
  CustomerDataUpdated,
  custnamedropdownData,
  setCustNamedropdownData,
  text,
  onKeyPress,
}) => {
  //date 8/5/2023

  let newoptions = removeDuplicateFromArrCustomer(
    CustomerDataUpdated,
    "CustomerRegisteredName"
  );
  // let newoptions =
  //   CustomerDataUpdated;
console.log("newoptions",newoptions);
console.log("custnamedropdownData", custnamedropdownData)

  var name = newoptions.map((item, i) => ({
    value: item.CustomerRegisteredName,
    label: item.CustomerRegisteredName,
  }));

  console.log("data iiiiiiiiiiiiiiiiNameffffff->>>", name);
  // const onSelect = (e:any) => {
  //   if (e.target.value !== "") {
  //     console.log("eeee->", e.target.value);
  //     var value = e.target.value;
  //     setCustNamedropdownData(value);
  //   } else {
  //     setCustNamedropdownData("");
  //   }
  // };
  const onSelect = (e: any) => {
    debugger;
  if (e.target.value !== "") {
    console.log("eeee--------------------------->", e.target.value);
    var value = e.target.value;
    setCustNamedropdownData(value);
  } else {
    setCustNamedropdownData("");
  }
};

  console.log("custnamedropdownData", CustomerDataUpdated)

  return (
    <>
      <InputDrop>
        <Label>{text}</Label>
        <InputDataLIst
          list="browsers"
          // name="browser"
          // id="browser"
          dropdownHandle={false}
           values={custnamedropdownData}
          placeholder = "Search Customer"
          onChange={(e) => {
            onSelect(e);
          }}
          type="search"
        />
          <datalist id="browsers">
          {name.map((item: any) => (
            
            <option  key={item.value} value={item.value} label={item.label}/>
            
          ))}
       
        </datalist>
 
  
        {/* <Select
          dropdownHandle={false}
          //  placeholder={placeholder}
          placeholder="Search Customer"
          options={name}
          values={custnamedropdownData}
          onChange={(e) => {
            onSelect(e);
            // console.log("Eeeeeeee->", e);
          }}
          searchable
        /> */}
      </InputDrop>
    </>
  );
};
export const CustomerCountryDropdown = ({
  CustomerDataUpdated,
  custdropdownData,
  setCustdropdownData,
  onKeyPress,
  placeholder,
  text,
  onChange,
}: any) => {
  let newoptions = removeDuplicateFromArr(
    CustomerDataUpdated,
    "CountryIncorporation"
  );

  var country = newoptions.map((item, i) => ({
    value: item.CountryIncorporation,
    label: item.CountryIncorporation,
  }));

  console.log("data countryfffffff->>>", country);
  const onSelect = (e) => {
    // if (e.length > 0) {
    //   console.log("eeee->", e[0].value);
    //   var value = e[0].value;
    //   setCustdropdownData(value);
    // } else {
    //   setCustdropdownData("");
    // }
     
    if (e.target.value !== "") {
        console.log("eeee->", e.target.value);
        var value = e.target.value;
        setCustdropdownData(value);
      } else {
        setCustdropdownData("");
      }
  };
  return (
    <>
      <InputDrop>
        <Label>{text}</Label>

        <InputDataLIst
          list="browsers1"
          // name="browser1"
          // id="browser1"
          dropdownHandle={false}
          values={custdropdownData}
          placeholder = "Search Country"
          onChange={(e) => {
            onSelect(e);
          }}
          type="search"
        />
        <datalist id="browsers1">
          {country.map((item: any) => (
          <option  key={item.value} value={item.value} label={item.label}/>
          ))}
        </datalist>
        {/* <Select
          dropdownHandle={false}
          placeholder={placeholder}
          options={country}
          values={custdropdownData}
          onChange={(e) => {
            onSelect(e);
            // console.log("Eeeeeeee->", e);
          }}
          searchable
        /> */}
      </InputDrop>
    </>
  );
};
