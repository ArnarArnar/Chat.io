import React from 'react';
import Button from 'react-bootstrap/Button';

class RoomList extends React.Component {
  render() {
    return (
      <>
        <Button variant="primary" size="lg" block>
          Room 1
        </Button>
        <Button variant="primary" size="lg" block>
          Room 2
        </Button>
      </>
    );
  }
}
export default RoomList;
