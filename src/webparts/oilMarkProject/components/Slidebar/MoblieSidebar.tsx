import * as React from 'react';
import SidebarMenuMobile from './SidebarMenuMobile';
import { MainMobile, MobileMain } from './SideBarStyle';
import { SideBarData } from './Slidebar';

export const MoblieSidebar = ({show,setDropShow}) => {
  return (
    <MobileMain className="df-c">
      <MainMobile className='df-s fw g20'>
          {SideBarData.map((sideitem) => {
            return <SidebarMenuMobile sideitem={sideitem} show={show} setDropShow={setDropShow}/>;
          })}
        </MainMobile>
    </MobileMain>
  )
}
