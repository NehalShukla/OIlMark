import * as React from "react";

type Props = {};

const RouteComponent = ({component:Component}: any) => {
  React.useEffect(()=>{
  },[])
  return (
    <Component/>
  )
}
export default RouteComponent;