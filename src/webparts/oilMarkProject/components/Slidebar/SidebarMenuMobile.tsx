import * as React from "react";
import {
  ContentDiv,
  ContentDivMobile,
  LinkStyle,
  MoblieLinkStyle,
} from "./SideBarStyle";
import { NavLink, useLocation } from "react-router-dom";

const SidebarMenuMobile = ({ sideitem, show, setDropShow }) => {
  const [iconShow, setIconShow] = React.useState(false);
  const location = useLocation();
  return (
    <>
      <div
        onMouseEnter={() => setIconShow(true)}
        onMouseLeave={() => setIconShow(false)}
        onClick={() => setDropShow(false)}
      >
        <NavLink to={sideitem.path}>
          <ContentDivMobile
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
            <MoblieLinkStyle className="f-sz18 fw500">
              {sideitem.title}
            </MoblieLinkStyle>
          </ContentDivMobile>
        </NavLink>
      </div>
      {/* {iconShow === true && <ToolTip text={sideitem.title} iconShow={iconShow}/>} */}
    </>
  );
};

export default SidebarMenuMobile;
