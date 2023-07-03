import * as React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from "@microsoft/sp-page-context";
import { Announcement } from "../ComponentPages/Announcement";
import  LeaveApplication  from "../ComponentPages/LeaveApplication";
import { Supplier } from "../ComponentPages/Supplier";
import { Customer } from "../ComponentPages/Customer";
import { IOilMarkProjectProps, PrivateRoutes } from "../IOilMarkProjectProps";
import { ROUTES } from "./Contant";
import AppLayout from "../layout";
import RouteComponent from "./RouteComponent";
import { forEach } from "lodash";
import CreditApplication from "../ComponentPages/ExcelFile";

const Router = (props: any) => {
  return (
    <HashRouter>
      <Switch>
        <AppLayout>
          <Redirect from="/" to="/Announcement" />
          <Route
            path="/Supplier"
            component={() => (
              <Supplier
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          />
           <Route
            path="/Popup"
            component={() => (
              <Supplier
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          />

          <Route
            path="/Announcement"
            component={() => (
              <Announcement
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          />

          <Route
            path="/Customer"
            component={() => (
              <Customer
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          />
          <Route
            path="/CustomerData"
           // render= {(props)=>window.location.reload()}
            component={() => (
              <Customer
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          />
          {/* <Route
            path="/LeaveApplication"
            component={() => (
              <LeaveApplication
                context={props.context}
                description={""}
                siteUrl={props.siteUrl}
                spHttpClient={props.spHttpClient}
                pageContext={props.pageContext}
              />
            )}
          /> */}
            <Route path={"/LeaveApplication"} component={LeaveApplication} />
          <Route path={"/CreditApplication"} component={CreditApplication} />
        </AppLayout>
      </Switch>
    </HashRouter>
  );
};

export default Router;
