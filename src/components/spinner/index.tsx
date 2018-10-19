import * as React from 'react';
import './spinner.css';

const Spinner: React.SFC<{}> = () => (
  <div className="py-5 text-center">
    <div className="lds-default">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
