import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'OilMarkProjectWebPartStrings';
import OilMarkProject from './components/OilMarkProject';
import { IOilMarkProjectProps } from './components/IOilMarkProjectProps';

export interface IOilMarkProjectWebPartProps {
  description: string;
  siteUrl: string;  
  context:any;

}

export default class OilMarkProjectWebPart extends BaseClientSideWebPart<IOilMarkProjectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IOilMarkProjectProps> = React.createElement(
      OilMarkProject,
      {
        description: this.properties.description,

        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
      // siteUrl:'https://moreyahs.sharepoint.com/sites/OilmarkComm',
        pageContext: this.context.pageContext,
        context: this.context
        

     }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
