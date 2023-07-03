import * as React from 'react';
import { Children } from '../IOilMarkProjectProps';
import { ChildernDiv } from '../Slidebar/SideBarStyle';
export const AppContent: React.FC<Children> = ({children}) => {
  
  return (
    <ChildernDiv className='p20'>{children}</ChildernDiv>
  )
}
