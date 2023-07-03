
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PageContext } from '@microsoft/sp-page-context';


export interface IOilMarkProjectProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  pageContext: PageContext;
  context: WebPartContext;

}

export interface PrivateRoutes {
  key: number;
  component: any;
  path: string;
}
export interface Children {
  children: any;
}
export interface ISpFxCrudState {
  items: [
    {
      "Title": "",
      "Trading": "",
      "Customer": "",
      "Country": "",
      "Trader": "",
      "Date": "",
      "Status": "",
      "Id": ""
    }]
}

