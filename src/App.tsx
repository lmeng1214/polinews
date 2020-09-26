import React, { useState } from 'react';
import firebase from 'firebase'
import { FirestoreDocument, FirestoreCollection, FirestoreProvider } from "@react-firebase/firestore";
import './App.css';
import TopicBox from './Components/TopicBox';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Header from './Header';
import ArticleComponent from './Components/Article';

const firebaseConfig = {
  apiKey: "AIzaSyDwRd2MgDikrwyPmuvm0RWAiamDfj_avZc",
  authDomain: "diviread.firebaseapp.com",
  databaseURL: "https://diviread.firebaseio.com",
  projectId: "diviread",
  storageBucket: "diviread.appspot.com",
  messagingSenderId: "727339470173",
  appId: "1:727339470173:web:4638a75eb56d3dbeaaecb4"
};

// const app = firebase.initializeApp(firebaseConfig);
// const fs = app.firestore();

// var demArticles = [];
// var repArticles = [];

// var articles = fs.collection("articles").get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     // console.log(doc.id, " => ", doc.data());
//     // console.log(doc.id, " => ", doc.data().side);
//     if (doc.data().side === "d") {
//       // const article = <ArticleComponent title={"Title " + j} date={"09/2" + j + "/2020"} source={"Source " + j} description={"Description " + j}
//       demArticles.push( <ArticleComponent title={"" + doc.data().title} date={"" + doc.data().date} source={"" + doc.data().source} description={"" + doc.data().link}/> );
//     } else {
//       repArticles.push( <ArticleComponent title={"" + doc.data().title} date={"" + doc.data().date} source={"" + doc.data().source} description={"" + doc.data().link}/> );
//     }
//   });
// });

// function demGet() {
//   return this.demArticles;
// }

// function repGet() {
//   return this.repArticles;
// }

// console.log(demArticles);

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(articles.get());

  return (
    <FirestoreProvider {...firebaseConfig} firebase={firebase}>
      <div className="App">
        <Header/>
        
        {/* <FirestoreCollection path="/topics/" limit={1}>
          {d => {
            return d.isLoading ? "Loading" : <pre>{d.value[0].democrat[0]}</pre>;
          }}
        </FirestoreCollection> */}

          <FirestoreCollection path ="/articles/">
            {d => {
              return d.isLoading ? "Loading" : <pre>{d.value[0].title}</pre>
            }}
            </FirestoreCollection> 
        {/* <FirestoreDocument path="/articles/" limit={5}>
          {d => {
            if (typeof(d.isLoading) === "undefined") {
              return "Loading"
            } else {
              return  <pre>{d.value}</pre>;
            }
          }}
        </FirestoreDocument> */}

        <Button variant="primary" onClick={handleShow} className="settings-button">
          Settings
        </Button>

        <header className="App-header">
          <TopicBox title="Local Politics" />
          <TopicBox title="Regional Politics"/>
          <TopicBox title="Global Politics" />
        </header>

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