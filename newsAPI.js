const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('538773bdc607434db53d5a0f5b1525c4');

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDwRd2MgDikrwyPmuvm0RWAiamDfj_avZc",
  authDomain: "diviread.firebaseapp.com",
  databaseURL: "https://diviread.firebaseio.com",
  projectId: "diviread",
  storageBucket: "diviread.appspot.com",
  messagingSenderId: "727339470173",
  appId: "1:727339470173:web:4638a75eb56d3dbeaaecb4"
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://diviread.firebaseio.com"
});

const db = admin.firestore();

var http = require('http');
var options = {
  host: 'www.us-central1-title-similarity-api.cloudfunctions.net',
  path: '/',
  port: '80',
  method: 'POST'
};

//"MAIN" FUNC 3600000
setInterval(() => getDemSources(), 60);
setInterval(() => getRepSources(), 60);

//Democratic news sources
function getDemSources() {
  newsapi.v2.topHeadlines({
    sources: 'cnn, the-huffington-post, newsweek, msnbc, ' +
             'abc-news, bloomberg, cbs-news, nbc-news, politico, time, the-washington-post, ',
    language: 'en'
  }).then(response => {
    const req = http.request(options, res => {
      parseFirestore(response, res, 'd')
    });

    req.write(JSON.stringify(jsonArticles(response)));
  });
}

//Republican news sources
function getRepSources() {
  newsapi.v2.topHeadlines({
    sources: 'the-american-conservative, fox-news, the-wall-street-journal, the-washington-times, ' +
             'national-review, breitbart-news',
    language: 'en'
  }).then(response => {
    const req = http.request(options, res => {
      parseFirestore(response, res, 'r')
    })

    req.write(JSON.stringify(jsonArticles(response)));
  });
}

function jsonArticles(response) {
  var o = {};
  o['articles'] = [];

  for (i = 0; i < response.totalResults; i++) {
    if (response.articles[i] != null) {
      var data = {
        ID: i.toString(),
        title: response.articles[i].title,
        body: response.articles[i].content
      };
      o['articles'].push(data);
    }
  }

  return o;
}

async function parseFirestore(newsAPIres, pythonRes, side) {
  if (newsAPIres.status == 'ok') {
    for (i = 0; i < pythonRes.like_articles.length; i++) {
      var id = newsAPIres.articles[pythonRes[i][x]].url.substring(newsAPIres.articles[pythonRes[i][x]].url.indexOf(".") + 1).replace(/\//g, "-")

      if (side == 'd') {
        const res = await db.collection('topics').doc(i).set({
          democrat: id
        }, {merge: true});
      } else {
        const res = await db.collection('topics').doc(i).set({
          republican: id
        }, {merge: true});
      }

      for (x = 0; x < pythonRes.like_articles[i].length; x++) {
        const res = await db.collection('articles').doc(id).set({
          date: newsAPIres.articles[pythonRes[i][x]].publishedAt,
          image: newsAPIres.articles[pythonRes[i][x]].urlToImage,
          link: newsAPIres.articles[pythonRes[i][x]].url,
          side: side,
          source: newsAPIres.articles[pythonRes[i][x]].source.name,
          title: newsAPIres.articles[pythonRes[i][x]].title,
          tldr: newsAPIres.articles[pythonRes[i][x]].description
        }, {merge: true});
      }
    }
  }
}
