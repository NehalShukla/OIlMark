import * as React from 'react';
import { IOilMarkProjectProps } from './IOilMarkProjectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Router from './Router/Router';
import "../components/Main.scss";
import { Supplier } from './ComponentPages/Supplier';

export default class OilMarkProject extends React.Component<IOilMarkProjectProps,{}> {
  constructor(props: IOilMarkProjectProps) {
    super(props);
  }
  public render(): React.ReactElement<IOilMarkProjectProps> {
    return (
      // <Router></Router>
      // <Router />
    <Router context={this.props.context} siteUrl={this.props.siteUrl} description={""} spHttpClient={this.props.spHttpClient} pageContext={this.props.pageContext} ></Router>
    // <Router siteUrl={} description={""} ></Router>
    );
  }
}
