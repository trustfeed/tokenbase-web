import React from 'react';
import './footer.css';

const copyright: string = 'Copyright © TrustFeed 2018';

const Footer: React.SFC<{}> = () => (
  <footer className="footer text-center">
    <span className="text-center copyright">{copyright}</span>
  </footer>
);

export default Footer;
