import * as React from 'react';
import {
  // Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
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
  color: string;
}

class Header extends React.Component<IHeaderProps, IHeaderStates> {
  public readonly state: IHeaderStates = {
    color: '',
    isOpen: false
  };

  public render(): React.ReactNode {
    const { background } = this.props;
    return (
      <Navbar expand="sm" fixed={'top'} color={background ? background : 'black'}>
        <Container fluid={true}>
          <div className="navbar-wrapper">
            <NavbarBrand href={paths.home}>
              <div className="logo-image">{renderLogoWhite()}</div>
            </NavbarBrand>
          </div>

          <Nav navbar={true}>
            {this.renderBlockchainPlatformDropdown()}
            {this.renderI18nDropdown()}
          </Nav>
        </Container>
      </Navbar>
    );
  }

  private renderI18nDropdown = () => {
    const i18n = this.props.i18n;

    // const web3 = this.props.web3;
    const useEnglish = (): void => i18n.changeLanguage('en');
    const useKorean = (): void => i18n.changeLanguage('ko');
    const lang: string = i18n.language;
    return (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle caret={true} nav={true}>
          <p>{lang}</p>
        </DropdownToggle>
        <DropdownMenu size="sm">
          <DropdownItem onClick={useEnglish}>{'English'}</DropdownItem>
          <DropdownItem onClick={useKorean}>{'한국어'}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  private renderBlockchainPlatformDropdown = () => {
    return (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle caret={true} nav={true}>
          <p>{'platform'}</p>
        </DropdownToggle>
        <DropdownMenu size="sm">
          <DropdownItem>{'ethereum'}</DropdownItem>
          <DropdownItem>{'EOS'}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
}

export default translate('translations')(Header);
