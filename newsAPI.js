const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('538773bdc607434db53d5a0f5b1525c4');

newsapi.v2.topHeadlines({
  sources: 'cnn, the-huffington-post, newsweek, msnbc, ' +
           'abc-news, bloomberg, cbs-news, nbc-news, politico, time, the-washington-post, ' +
           'the-american-conservative, fox-news, the-wall-street-journal, the-washington-times, ' +
           'national-review, breitbart-news',
  language: 'en'
}).then(response => {
  if (response.status == 'ok') {
      console.log(response.articles);
  } else {
    console.log('Bad request to NewsAPI');
  }
});

newsapi.v2.sources({
  category: 'business',
  langauge: 'en',
  country: 'us'
}).then(response => {
})
