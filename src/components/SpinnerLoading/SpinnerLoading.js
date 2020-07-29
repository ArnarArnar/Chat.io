import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function SpinnerLoading() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </div>
  );
}
