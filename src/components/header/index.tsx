import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  Container
} from 'reactstrap';
import { renderLogoWhite } from '../../assets/svg';
import { translate } from 'react-i18next';
import { paths } from '../../routes';
import './header.css';

interface IHeaderProps {
  location: {
    pathname: string;
    search: string;
  };
  web3: any;
  match: object;
  history: object;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  t: (key: string) => string;
  background?: string;
}

interface IHeaderStates {
  isOpen: boolean;
  dropdownOpen: boolean;
  color: string;
}

class Header extends React.Component<IHeaderProps, IHeaderStates> {
  public readonly state: IHeaderStates = {
    color: '',
    isOpen: false,
    dropdownOpen: false
  };

  public render(): React.ReactNode {
    const { background } = this.props;
    return (
      <Navbar expand="md" fixed={'top'} color={background ? background : 'black'}>
        <Container fluid={true}>
          <div className="navbar-wrapper">
            <NavbarBrand href={paths.home}>
              <div className="logo-image">{renderLogoWhite()}</div>
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar={true} className="justify-content-end">
            <Nav navbar={true}>{this.renderI18n()}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }

  private renderI18n = () => {
    const i18n = this.props.i18n;

    // const web3 = this.props.web3;
    const useEnglish = (): void => i18n.changeLanguage('en');
    const useKorean = (): void => i18n.changeLanguage('ko');
    const lang: string = i18n.language;
    return (
      <Dropdown nav={true} isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
        <DropdownToggle caret={true} nav={true}>
          <p>{lang}</p>
        </DropdownToggle>
        <DropdownMenu size="lg">
          <DropdownItem onClick={useEnglish}>English</DropdownItem>
          <DropdownItem onClick={useKorean}>Korean</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  private toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: 'transparent'
      });
    } else {
      this.setState({
        color: 'white'
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  private dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
}

export default translate('translations')(Header);
