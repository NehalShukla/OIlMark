import * as React from "react";
import { Crossicon, Logo, MenuIcon } from "../assets/icons";
import {
  Head,
  HeaderStyle,
  MenuStyled,
  MediaDiv,
  LogoStyledMedia,
  OilmarMedia,
} from "../Slidebar/SideBarStyle";
import Slidebar from "../Slidebar/Slidebar";
import { AppContent } from "./Content";
import { MoblieSidebar } from "../Slidebar/MoblieSidebar";
import { IMG } from "../assets/Images";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppLayout = ({ children }: any) => {
  const [show, setShow] = React.useState(false);
  const [dropshow, setDropShow] = React.useState(false);
  const ref: any = React.useRef();
  function useOnClickOutside(ref: any, handler: any) {
    React.useEffect(() => {
      const listener = (event: any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  useOnClickOutside(ref, () => setDropShow(false));

  return (
    <>
      <div className="df">
      <ToastContainer />
        <Slidebar show={show} />
        <Head className="bg w-100">
          <HeaderStyle className="df-ac">
            <MediaDiv>
              <MenuStyled>
                {dropshow === true ? (
                  <div onClick={() => setDropShow(false)} className="trans03">
                    <Crossicon />
                  </div>
                ) : (
                  <div onClick={() => setDropShow(true)} className="trans03">
                    <MenuIcon />
                  </div>
                )}
              </MenuStyled>
            </MediaDiv>
            <div className={"df-c w-100"}>
              <OilmarMedia>
                <img src={IMG.OilMar} />
              </OilmarMedia>
            </div>
          </HeaderStyle>
          {dropshow === true && (
            <div ref={ref} className="trans03">
              <MoblieSidebar show={show} setDropShow={setDropShow} />
            </div>
          )}
          <AppContent>{children}</AppContent>
        </Head>
      </div>
    </>
  );
};

export default AppLayout;
