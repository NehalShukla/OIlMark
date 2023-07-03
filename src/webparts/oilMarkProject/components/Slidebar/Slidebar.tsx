import * as React from "react";
import { Title } from "./SideBarTitle";
import {
  ContentDiv,
  LogoStyleMedia,
  MenuStyled,
  SideBarMain,
} from "./SideBarStyle";
import { LogoStyle } from "./SideBarStyle";
import {
  CardBlue,
  CardWhite,
  CustomerBlue,
  CustomerWhite,
  ExcelNoteBlue,
  ExcelNoteWhite,
  Logo,
  MenuIcon,
  NoteBlue,
  NoteWhite,
  SoundBlue,
  SoundWhite,
} from "../assets/icons";
import SidebarMenu from "./SidebarMenu";
import { ROUTES } from "../Router/Contant";

export const SideBarData = [
  {
    key: 1,
    title: Title.Announcement,
    iconHover: <SoundWhite />,
    icon: <SoundBlue />,
    path: ROUTES.Announcement,
  },
  {
    key: 2,
    title: Title.Customer,
    iconHover: <CustomerWhite />,
    icon: <CustomerBlue />,
    path: ROUTES.Customer,
  },
  {
    key: 3,
    title: Title.Supplier,
    iconHover: <CardWhite />,
    icon: <CardBlue />,
    path: ROUTES.Supplier,
  },
  {
    key: 4,
    title: Title.LeaveApplication,
    iconHover: <NoteWhite />,
    icon: <NoteBlue />,
    path: ROUTES.LeaveApplication,
  },
  {
    key: 5,
    title: Title.CreditApplication,
    iconHover: <ExcelNoteWhite />,
    icon: <ExcelNoteBlue/>,
    path: ROUTES.CreditApplication,
  },
];
const Slidebar = ({ show, onClick }: any) => {
  return (
    <>
      <SideBarMain>
        <LogoStyle className="df-c-ac" show={show}>
          <Logo />
        </LogoStyle>
        <LogoStyleMedia className="df-c-ac" show={show}>
        </LogoStyleMedia>
        <div>
          {SideBarData.map((sideitem) => {
            return <SidebarMenu sideitem={sideitem} show={show} />;
          })}
        </div>
      </SideBarMain>
    </>
  );
};

export default Slidebar;
