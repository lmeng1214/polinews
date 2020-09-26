import React, { useState } from 'react';
import firebase from 'firebase'
import { FirestoreDocument, FirestoreCollection, FirestoreProvider } from "@react-firebase/firestore";
import './App.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Header from './Header';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const firebaseConfig = {
    apiKey: "AIzaSyDwRd2MgDikrwyPmuvm0RWAiamDfj_avZc",
    authDomain: "diviread.firebaseapp.com",
    databaseURL: "https://diviread.firebaseio.com",
    projectId: "diviread",
    storageBucket: "diviread.appspot.com",
    messagingSenderId: "727339470173",
    appId: "1:727339470173:web:4638a75eb56d3dbeaaecb4"
  };

  return (
    <FirestoreProvider {...firebaseConfig} firebase={firebase}>
      <div className="App">
        <Header/>
        <FirestoreCollection path="/topics/" limit={1}>
          {d => {
            return d.isLoading ? "Loading" : <pre>{d.value[0].democrat[0]}</pre>;
          }}
        </FirestoreCollection>
        <FirestoreDocument path="/articles/GFKbnFkCHho1btrMXCeI">
          {d => {
            if (typeof(d.isLoading) === "undefined") {
              return "Loading"
            } else {
              return  <pre>{d.value.source}</pre>
            }
          }}
        </FirestoreDocument>
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
    </FirestoreProvider>
  );
}

export default App;
