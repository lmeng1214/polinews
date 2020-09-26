import React, { useState } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Header from './Header';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Header></Header>
      <Button variant="primary" onClick={handleShow} className="settings-button">
        Settings
      </Button>
      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Filter news sources here
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Apply</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
