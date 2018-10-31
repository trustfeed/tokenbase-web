import * as React from 'react';
import './sidebar.css';
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as H from 'history';

interface IRoutes {
  path: string;
  component: React.ReactNode;
  label: string | undefined;
}

interface IProps {
  routeList: IRoutes[];
  history: H.History;
  location: H.Location;
}

class Sidebar extends React.Component<IProps, {}> {
  public render(): React.ReactNode {
    const { routeList = [] } = this.props;
    const { pathname } = this.props.location;
    // const links = routeList.filter((item) => item.label).map((item) => (
    const links = routeList.map((item) => (
      <NavItem key={item.path}>
        <Link to={item.path} className={`nav-link ${pathname === item.path ? 'active' : ''}`}>
          {item.label}
        </Link>
      </NavItem>
    ));

    return (
      <div className="sidebar-background">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <div style={{ marginTop: 20 }} />
            {links}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
