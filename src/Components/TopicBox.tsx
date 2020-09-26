import React from 'react';
import ArticleComponent from '../Components/Article'
// import demGet from '../App'
// import repGet from '../App'
import Collapsible from 'react-collapsible'
import firebase, { firestore } from 'firebase';
import admin from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDwRd2MgDikrwyPmuvm0RWAiamDfj_avZc",
    authDomain: "diviread.firebaseapp.com",
    databaseURL: "https://diviread.firebaseio.com",
    projectId: "diviread",
    storageBucket: "diviread.appspot.com",
    messagingSenderId: "727339470173",
    appId: "1:727339470173:web:4638a75eb56d3dbeaaecb4"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const fs = app.firestore();
  
  var demArticles = [];
  var repArticles = [];
  
  var articles = fs.collection("articles").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      // console.log(doc.id, " => ", doc.data().side);
      const articlePush = <ArticleComponent title={"" + doc.data().title} date={"" + doc.data().date} source={"" + doc.data().source} description={"" + doc.data().link} />
      if (doc.data().side.toString().toLowerCase() === 'd') {
        // const article = <ArticleComponent title={"Title " + j} date={"09/2" + j + "/2020"} source={"Source " + j} description={"Description " + j}
        demArticles.push( articlePush );
      } else {
        repArticles.push( articlePush );
      }
    });
  });
  console.log(demArticles);

/*NOTE: When Importing the Democratic/Republican News Sources:

Use this template to make an article FIRST:
 <ArticleComponent title={x} date={y} source={z} description={a}/>
x, y, z, and a MUST BE STRINGS

IF THERE ARE MULTIPLE ARTICLES:
    Make sure that the multiple articles are in an array such that:
    for (var i = 0; i < arrayName.length; i++) {
        const article = <ArticleComponent title={x} date={y} source={z} description={a}/>;
        demObjs.push(article); // If it is a democratic-biased article
        repObjs.push(article); // If it is a republican-biased article
    }

Also, set 'helper' to false if you are importing news articles from the API.
*/

const helper = true;

var demObjs = [];
var repObjs = [];

if (helper) {
    for (var i = 0; i < 6; i++) {
        const article = <ArticleComponent title={"Title " + i} date={"09/2" + i + "/2020"} source={"Source " + i} description={"Description " + i }/>
        demObjs.push(article);
    }
    // console.log(demObjs.length);

    for (var j = 3; j < 6; j++) {
        const article2 = <ArticleComponent title={"Title " + j} date={"09/2" + j + "/2020"} source={"Source " + j} description={"Description " + j}/>
        repObjs.push(article2);
    }
}

function TopicBox(topicObj) {
    // const dems = [];
    // const reps = [];

    // if (demObjs instanceof Array && demObjs.length > 0) {
    //     for (const dem of demObjs) {
    //         // dems.push(<h3>{dem.title} | {dem.date} | {dem.source}</h3>);
    //         dems.push(dem);
    //     }
    // }
    // if (repObjs instanceof Array && repObjs.length > 0) {
    //     for (const rep of repObjs) {
    //         // reps.push(<h3>{rep.title} | {rep.date} | {rep.source}</h3>);
    //         reps.push(rep);
    //     }
    // }

    return (
        <div className="TopicComp">
            <div className="topicTitle"><h2>{topicObj.title}</h2></div>
            <div className="demArticle">
                {/* {dems} */}
                {demObjs}
                {/* {demArticles} */}
            </div>
            <div className="repArticle">
                {repObjs}
                {/* {repArticles} */}
            </div>
        </div>
    );
}

export default TopicBox;