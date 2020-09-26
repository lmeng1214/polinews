import React from 'react';
import ArticleComponent from '../Components/Article'

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

const demObjs = [];
const repObjs = [];

// If you are importing news articles, bode below but before the if (helper) line

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
            </div>
            <div className="repArticle">
                {/* {reps} */}
                {repObjs}
            </div>
        </div>
    );
}

export default TopicBox;