import * as React from "react";
import { ContentDiv, LinkStyle, SpanToolTip } from "./SideBarStyle";
import { NavLink, useLocation } from "react-router-dom";
import { ToolTip } from "../ComponentPages/Component";

const SidebarMenu = ({ sideitem, show }) => {
  const [iconShow, setIconShow] = React.useState(false);
  const [SideBarActive, SetSidebarActive] = React.useState(false);
  const location = useLocation();
  return (
    <>
      <div
        onMouseEnter={() => setIconShow(true)}
        onMouseLeave={() => setIconShow(false)}
        onClick={() => SetSidebarActive(!SideBarActive)}
      >
        <NavLink to={sideitem.path}>
          <ContentDiv
            className={
              location.pathname === sideitem.path
                ? "df g10 Sidebar active"
                : "Sidebar df g10"
            }
          >
            {location.pathname === sideitem.path ? (
              <>
                {iconShow === false ? (
                  <div>{sideitem.iconHover}</div>
                ) : (
                  <div>{sideitem.icon}</div>
                )}
              </>
            ) : (
              <div>{sideitem.icon}</div>
            )}
            <LinkStyle className="f-sz18 fw500" show={show}>
              {sideitem.title}
            </LinkStyle>
            <div style={{display:"flex", zIndex:10000}}>

            {iconShow === true && (
              <SpanToolTip className="tooltiptext fw500 fz-18">
                {sideitem.title}
              </SpanToolTip>
            )}
            </div>
          </ContentDiv>
        </NavLink>
      </div>
      {/* {iconShow === true && <ToolTip text={sideitem.title} iconShow={iconShow}/>} */}
    </>
  );
};

export default SidebarMenu;
