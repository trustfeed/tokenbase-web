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
  match: any;
  history: any;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  t: (key: string) => string;
  background?: string;
  platform: string;
  setPlatform: (platform: string) => void;
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

    const lang: string = i18n.language;
    return (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle caret={true} nav={true}>
          <p>{lang}</p>
        </DropdownToggle>
        <DropdownMenu size="sm">
          <DropdownItem onClick={() => i18n.changeLanguage('en')}>{'English'}</DropdownItem>
          <DropdownItem onClick={() => i18n.changeLanguage('ko')}>{'한국어'}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  private renderBlockchainPlatformDropdown = () => {
    const { platform } = this.props;
    return (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle caret={true} nav={true}>
          <p>{platform}</p>
        </DropdownToggle>
        <DropdownMenu size="sm">
          <DropdownItem onClick={() => this.changePlatform('ethereum')}>{'ethereum'}</DropdownItem>
          <DropdownItem onClick={() => this.changePlatform('eos')}>{'EOS'}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  private changePlatform = (platform) => {
    if (platform === 'ethereum') {
      this.props.setPlatform('ethereum');
    } else if (platform === 'eos') {
      this.props.setPlatform('eos');
    }
    location.reload(true);
  };
}

export default translate('translations')(Header);
