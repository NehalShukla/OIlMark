import styled from "styled-components";
import { colorFF, PrimaryColor, colorBlack, colorE4 } from "../color/color";
import { Link } from "react-router-dom";
import { MenuIcon } from "../assets/icons";

export const SideBarMain = styled.div`
  background-color: ${colorFF};
  transition: all 0.3s ease-in-out;
  height: 100vh;
  text-align: center;
  animation-name: Side;
  animation-duration: 0.5s;
  a:-webkit-any-link {
    color: ${colorBlack};
    cursor: pointer;
    text-decoration: none !important;
  }
  @media (max-width: 1261px) {
    transition: all 0.3s ease-in-out;
    width: 100px;
    @keyframes Side {
      from {
        width: 0px;
      }
      to {
        width: 100px;
      }
       {
        animation-timing-function: ease-out;
      }
    }
  }
  @media (min-width: 1261px) {
    transition: all 0.3s ease-in-out;
    width: 280px;
    @keyframes Side {
      from {
        width: 0px;
      }
      to {
        width: 280px;
      }
       {
        animation-timing-function: ease-out;
      }
    }
  }
  @media (max-width: 1028px) {
    transition: all 0.3s ease-in-out;
    display: none;
  }

`;
export const LogoStyle = styled.div`
  height: 110px;
  @media (min-width: 1261px) {
    display: ${({ show }: { show: any }) => (show === true ? "none" : "flex")};
    justify-content: ${({ show }: { show: any }) =>
      show === true ? "none" : "center"};
  }
  @media (max-width: 1261px) {
    display: ${({ show }: { show: any }) =>
      show === true ? "inline-block" : "none"};
  }
`;
export const LogoMediaStyle = styled.div`
  @media (min-width: 1261px) {
    display: none;
  }
  @media (max-width: 1261px) {
    display: none;
  }
`;
export const ContentDiv = styled.ul`
  transition: 0.3s;
  padding: 12px 10px 12px 37px;
  @media (max-width: 1261px) {
    padding: 12px;
    justify-content: center;
  }
  &:hover {
    background-color: ${colorE4};
    color: ${colorBlack};
    transition: 0.3s;
  }
`;
export const ContentDivMobile = styled.ul`
  padding: 12px 10px 12px 37px;
  border-radius: 3px;
  transition: 0.7s;
  @media (max-width: 1261px) {
    padding: 12px;
    justify-content: center;
  }
  @media (max-width: 429px) {
    justify-content: start;
  }
  &:hover {
    transition: 0.3s;
    background-color: ${colorE4};
    color: ${colorBlack};
  }
`;
export const LinkStyle = styled.div`
  @media (min-width: 1261px) {
    display: inline-block;
  }
  @media (max-width: 1261px) {
    display: none;
  }
`;
export const MoblieLinkStyle = styled.div`
  @media (min-width: 1261px) {
    display: none;
  }
  @media (max-width: 1261px) {
    display: flex;
  }
`;
export const HeaderStyle = styled.div`
  width: 100%;
  height: 102px;
  background-color: ${colorFF};
`;
export const MenuStyled = styled.div`
  padding: 20px;

  @media (min-width: 1261px) {
    display: none;
  }
  @media (max-width: 1261px) {
    display: flex;
  }
`;
export const Head = styled.div``;
export const ChildernDiv = styled.div`
  background-color: ${({ show }: { show: any }) =>
    show === true ? "rgba(0, 0, 0, 0.5)" : ""};
`;

export const LogoStyleMedia = styled.div`
  @media (max-width: 1261px) {
    height: 110px;
  }
  @media (min-width: 1261px) {
    height: none;
  }
`;
export const MediaDiv = styled.div`
  @media (max-width: 1027px) {
    display: flex;
  }
  @media (min-width: 1027px) {
    display: none;
  }
`;
export const LogoStyledMedia = styled.div`
  @media (min-width: 1027px) {
    display: flex;
  }
  @media (max-width: 1027px) {
    display: none;
  }
`;
export const MobileMain = styled.div`
  a:-webkit-any-link {
    color: ${colorBlack};
    cursor: pointer;
    text-decoration: none !important;
  }
  transition: 0.3s;
  background-color: ${colorFF};
  animation-name: slideIn;
  -webkit-animation-name: slideIn;
  animation-duration: 0.4s
  @-webkit-keyframes slideIn {
    from {top: -300px; opacity: 0} 
    to {top: 0; opacity: 1}
  }  
  @keyframes slideIn {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
`;
export const MainMobile = styled.div`
  @media (max-width: 429px) {
    width: 100%;
    display: block !important;
  }
`;
export const OilmarMedia = styled.div`
  margin-right: 42px;
  @media (max-width: 1261px) {
    display: flex;
  }
  @media (min-width: 1261px) {
    display: none;
  }
`;
export const SpanToolTip = styled.span`
  @media (max-width:1260px){
    display:flex
    z-index: 10000;
    background-color: rgb(0 0 0 / 67%);
    padding: 6px;
    border-radius: 5px;
    color: ${colorFF};
    position: absolute;
    ::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent rgb(0 0 0 / 67%) transparent transparent;
    }
  }
  @media (min-width: 1260px){
    display:none;
  }
`;
