import styled from "styled-components";
import {
  colorBlack,
  colorE4,
  colorF4,
  colorFF,
  PrimaryColor,
  PrimaryHover,
  scrollercolor,
} from "../color/color";
export const Label = styled.div`
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 10px;
  color: ${colorBlack};
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  background: ${({ color }: { color: any }) => color};
  border-radius: ${({ borderRadius }: { borderRadius: any }) => borderRadius};
  color: #ffffff;
  width: ${({ width }: { width: any }) => width};
  cursor: pointer;
  transition: 0.8s;
  padding: 0px 10px;
  :hover {
    background-color: ${PrimaryHover};
    transition: 0.8s;
  }
  @media (max-width: 371px) {
    width: 92%;
    margin-top: 5px;
  }
`;

export const InputStyled = styled.input`
  width: ${({ width }: { width: any }) => width};
  height: 50px;
  // background-color: ${({ bg }: { bg: any }) => bg};
  background-color: #f4f6f8;
  color: ${({ color }: { color: any }) => color};
  border: 1px solid #e5e5e5;
  border-radius: ${({ border }: { border }) =>
    border === false ? "none" : "5px"};
  padding: 0px 10px;
  text-transform: ${({
    modalIsOpen,
    supplierIsOpen,
    searchName,
    searchCountry,
    editCustomer,
    editsuppliearIsOpen,
  }: {
    modalIsOpen: any;
    supplierIsOpen: any;
    searchName: any;
    searchCountry: any;
    editCustomer: any;
    editsuppliearIsOpen: any;
  }) =>
    (modalIsOpen === true ||
      supplierIsOpen === true ||
      searchName === true ||
      searchCountry === true ||
      editCustomer === true ||
      editsuppliearIsOpen === true) &&
    "uppercase"};

  @media (max-width: 944px) {
    width: 95%;
  }
  cursor: pointer;
`;
export const ContainerDiv = styled.div`
  background-color: ${colorFF};
  box-shadow: 0px 0px 40px #eef1f5;
  
}
  @media (max-width: 944px) {
    display: block;
  }

`;
export const OutBtnStyled = styled.div`
  cursor: pointer;
  height: ${({ height }: { height: any }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 0px 10px;
  background-color: ${({ bg }: { bg: any }) => bg};
  color: ${({ color }: { color: any }) => color};
  border: 1px solid ${({ borderColor }: { borderColor: any }) => borderColor};
  width: ${({ width }: { width: any }) => width};
  white-space: nowrap;
  @media (max-width: 338px) {
    margin-top: 5px;
  }
`;
export const HeaderStyle = styled.div`
  padding: 0px 0px 20px;
  border-bottom: ${({ borderBottom }: { borderBottom: any }) => borderBottom};
`;
export const TitleText = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: #000000;
`;
export const FormStyle = styled.div`
  width: 60%;
  background: #ffffff;
  box-shadow: 0px 0px 40px #eef1f5;
  @media screen and (max-width: 900px) {
    width: 93%;
  }
  @media screen and (max-width: 820px) {
    width: 93%;
  }
  @media screen and (max-width: 768px) {
    width: 88%;
  }
  @media screen and (max-width: 305px) {
    width: 83%;
  }
`;
export const PreviousFormStyle = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 40px #eef1f5;
  animation-name: privious;
  @keyframes {
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    margin-top: 25px;
  }
`;
export const Inputstyled = styled.input`
  width: 95%;
  height: 50px;
  background: #f7f9fa;
  border: 1px solid #d5dee8;
`;
export const DragDrop = styled.div`
  width: 95%;
  height: 153px;
  margin-top: 25px;
`;
export const TextAreastyled = styled.textarea`
  height: ${({ height }: { height: any }) => height};
  background: #f7f9fa;
  border: 1px solid #d5dee8;
  resize: none;
  border-radius: ${({ border }: { border }) =>
    border === false ? "none" : "5px"};
  width: ${({ width }: { width: any }) => width};
  text-transform: ${({
    modalIsOpen,
    supplierIsOpen,
    editsuppliearIsOpen,
  }: {
    modalIsOpen: any;
    supplierIsOpen: any;
    editsuppliearIsOpen: any;
  }) =>
    (modalIsOpen === true ||
      supplierIsOpen === true ||
      editsuppliearIsOpen === true) &&
    "uppercase"};
  @media (max-width: 944px) {
    width: 97%;
  }
`;
export const ButtonStyle = styled.div`
  display: flex;
  justify-content: end;
  @media (max-width: 371px) {
    display: block;
    width: 100%;
  }
`;

export const TextStyle = styled.div`
  border-bottom: 1px solid #e1e0e7;
  color: ${colorBlack};
`;

export const GraphDiv = styled.div`
  width: 100%;
  height: 326.66px;
  /* left: 310px; */
  /* top: 753px; */
  background: ${colorFF};
  margin-top: 25px;

  .pd {
    margin: 20px 31px 20px 20px;
  }
`;
export const TableStyled = styled.div`
  width: auto;
  height: auto;
  th {
    text-align: start !important;
  }
  tr:nth-child(odd) {
    background: ${colorFF};
  }
  tr:nth-child(even) {
    background: ${colorF4};
  }
`;
export const IndiaTab = styled.div`
  box-sizing: border-box;
  color: #0075ff;
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 10px;
  gap: 20px;

  width: 65px;
  height: 28px;

  background: #e4f1ff;
  border: 1px solid #d0e6ff;
  border-radius: 3px;
`;
export const ShopButton = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  gap: 15px;
  isolation: isolate;

  width: 67px;
  height: 32px;
  left: 1325px;
  top: 410px;

  background: #ffffff;
  border: 1px solid #e2e9ef;
  border-radius: 3px;
`;
export const Th = styled.th`
  padding: 21px;
  font-size: 16px;
  line-height: 19px;
`;
export const Thead = styled.thead`
  background-color: ${colorFF};
`;
export const Td = styled.td`
  padding: 17px 23px;
  white-space: pre-line;
  courser: pointer;
`;
export const Tbody = styled.tbody`
  background-color: ${colorFF};
`;
export const TableActionDiv = styled.div`
  border: 1px solid #e2e9ef;
  border-radius: 3px;
  background-color: ${colorFF};
  width: 67px;
  cursor: pointer;
`;
export const Modal = styled.div`
  z-index: 1000 !important;
  position: absolute;
  width: ${({ width }: { width: any }) => width};
  padding: 40px;
  background-color: ${colorFF};
  top: 10%;
  // transition: all 0.2s ease-in-out;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s @-webkit-keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 10%;
      opacity: 1;
    }
  }

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 10%;
      opacity: 1;
    }
  }

  @media (max-width: 411px) {
    width: ${({ Medwidth }: { Medwidth: any }) => Medwidth};
  }
`;
export const MainDiv = styled.div`
  position: ${({ modalIsOpen, Delete }: { modalIsOpen: any; Delete: any }) =>
    modalIsOpen === true || Delete === true ? "fixed" : ""};
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: ${({ modalIsOpen, Delete }: { modalIsOpen: any; Delete: any }) =>
    modalIsOpen === true || Delete === true ? "rgba(0, 0, 0, 0.5)" : ""};
  transition: all 0.3s ease-in-out;
  z-index: 1000 !important;
  overflow: auto;
  overflow-y: auto;
  // transform: scale(0.8);
`;
export const ToolTipStyle = styled.div`

@media (max-width: 1024px){
  display: ${({ iconShow }: { iconShow: any }) =>
    iconShow === true ? "flex" : "none"}
  background-color: ${colorFF};
position: absolute;
padding: 10px;
width:auto;
height: 30px;
z-index:1000;
}
`;

export const ImageStyle = styled.div`
  margin-bottom: 5px;
  height: 86px;
  width: 120px;
`;

export const DragFilestyled = styled.div`
  width: 338px;
  height: 95px;
  background: #ecf5ff;
  border: 1px dashed #abb6c0;
  border-radius: 10px;
`;

export const UploadButton = styled.div`
  background: #ecf5ff;
  border: 1px dashed #abb6c0;
  border-radius: 10px;
  cursor: pointer;
`;
export const InputDiv = styled.div`
  width: 50%;
  @media (max-width: 944px) {
    width: 95%;
    margin-bottom: 15px;
  }
`;
export const InputMainDiv = styled.div`
  width: 100%;
  @media (max-width: 944px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;
export const OuterDiv = styled.div`
  @media (max-width: 944px) {
    justify-content: end;
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 371px) {
    display: block;
  }
`;
export const FormMainDiv = styled.div`
  @media screen and (max-width: 900px) {
    display: block;
  }
`;
export const GraphMainDiv = styled.div`
  @media screen and (max-width: 900px) {
    display: block;
    width: 100%;
  }
  .pd {
    margin: 20px 31px 20px 20px;
  }
`;
export const MainLeaveDiv = styled.div`
  box-shadow: 0px 0px 40px #eef1f5;
  width: 100%;
  background-color: ${colorFF};

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const LeaveHeader = styled.div`
  padding: 15px;
  text-align: right;
  color: ${colorBlack};
`;
export const DropDownStyled = styled.div`
  width: ${({ width }: { width: any }) => width};
  height: 50px;
  background-color: ${({ bg }: { bg: any }) => bg};
  color: ${({ color }: { color: any }) => color};
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 0px 10px;
  @media (max-width: 944px) {
    width: 95%;
  }
  cursor: pointer;
`;
export const DropDownIconStyled = styled.div`
  transform: ${({ dropDown }: { dropDown: any }) =>
    dropDown === true && "rotate(180deg)"};
`;
export const Scrollbar = styled.div`
cursor: grab;
:active{
  cursor: grabbing;
}
  @media (max-width: 955px) {
    overflow-x: scroll;
    white-space: nowrap;
    cursor: grabbing;
   
  }
  ::-webkit-scrollbar {
    width: 14px;
    height: 7px;
    
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: 0px 4px 4px rgb(0 0 0 / 25%);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
   background: ${scrollercolor};

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }

 

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
   // background: #1b60ff;
  background: #9baebb;
  }}
`;
export const ScrollbarSuppliear = styled.div`
  cursor: grab;
  :active {
    cursor: grabbing;
  }
  @media (max-width: 2209px) {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(370px, 1fr)) !important;
  }
  @media (max-width: 1818px) {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(370px, 1fr)) !important;
  }
  @media (max-width: 1761px) {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
  @media (max-width: 1262px) {
    width: 100%;
  }
  @media (max-width: 1029px) {
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 14px;
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: 0px 4px 4px rgb(0 0 0 / 25%);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${scrollercolor};
    border-radius: 20px;
    :hover {
      cursor: grabbing;
    }
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
   // background: #1b60ff;
   background: #9baebb;
  }
`;
export const MediaContent = styled.div`
  width: 100%;
  @media (max-width: 1761px) {
    width: 100%;
  }
  @media (max-width: 1347px) {
    width: 100%;
  }
  @media (max-width: 1257px) {
    width: 100%;
  }
`;
export const Span = styled.span`
  color: red;
`;
export const AnnounceDiv = styled.div`
  @media (max-width: 415px) {
    display: block;
  }
`;
export const AnnounceMain = styled.div`
  @media (max-width: 415px) {
    display: block;
  }
`;
export const PageIconStyle = styled.div`
  cursor: pointer;
  align-items: center;
`;
export const PageNoStyle = styled.div`
  .round-effect {
    padding: 9px 12px;
    display: flex;
    height: 20px;
    width: 16px;
    justify-content: center;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      background-color: ${colorE4};
    }
  }
  .round-effect.active {
    color: ${PrimaryColor};
    background: ${colorFF};
    border-radius: 5px;
    box-shadow: 0px 0px 40px #eef1f5;
    padding: 9px 12px;
  }
`;
export const PaginationDiv = styled.div`
  @media (max-width: 553px) {
    flex-wrap: wrap;
  }
`;
export const DropDownList = styled.option`
  background-color: ${colorFF};
`;
export const DropDown = styled.select`
  box-shadow: 0px 0px 40px #eef1f5;
  width: 99.9%;
  height: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 0px 10px;
  -webkit-appearance: none;
`;
export const PageMedia = styled.div`
  @media (max-width: 1761px) {
    width: 88%;
  }
  @media (max-width: 1459px) {
    width: 85%;
  }
  @media (max-width: 1260px) {
    width: 93%;
  }
`;
export const A = styled.a`
  text-decoration: underline;
  color: ${PrimaryColor};
  cursor: pointer;
`;
export const IMGStyle = styled.img`
  width: 200px;
  height: 120px;
`;
export const AnnounceScrollBar = styled.div`
  overflow: scroll;
  height: 445px;
::-webkit-scrollbar {
  width: 3px;
  height: 7px;
  cursor: grabbing;
}

/* Track */
::-webkit-scrollbar-track {
  background: 0px 4px 4px rgb(0 0 0 / 25%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${scrollercolor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}
 
// date: 25/1/2023 change hover and scroller-thumb color    by deepak

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  //background: #1b60ff;
  background: #9baebb;
}}
`;
export const EmptyTextStyled = styled.div`
  color: #4a4a4ab5;
`;

export const InputDrop = styled.div`
  .css-wmy1p7-ReactDropdownSelect {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    cursor: pointer;
    height: 53px;
    background-color: #f4f6f8;
    border: 1px solid #e5e5e5;
    border-radius: none;
    padding: 0px 10px;
    cursor: pointer;
  }
  .css-1tspqtw-InputComponent {
    width: 100% !important;
  }

  .css-wmy1p7-ReactDropdownSelect:hover,
  .css-wmy1p7-ReactDropdownSelect:focus-within {
    border-color: #242424;
  }

  .css-wmy1p7-ReactDropdownSelect:focus,
  .css-wmy1p7-ReactDropdownSelect:focus-within {
    outline: 0;
    box-shadow: 0 0 0 1px rgb(36 36 36);
  }
  .css-m6dlzq-InputComponent {
    width: 100% !important;
  }
`;

export const InputDataLIst = styled.input`
position: relative;
    width: 100%;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    height: 53px;
    background-color: #f4f6f8;
    border: 1px solid #e5e5e5;
    border-radius: none;
    padding: 0px 10px;
    cursor: pointer;
`;

