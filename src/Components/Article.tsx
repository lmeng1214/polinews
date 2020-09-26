import React from 'react'
import Collapsible from 'react-collapsible';

interface Article {
    title: string;
    date: string;
    source: string;
    description: string;
}

class ArticleComponent extends React.Component<Article, {}> {
    // const text = "" + {this.props.title} + "|" + {this.props.date} + "|" + {this.props.source} + "";
    render() {
        return (
            <Collapsible trigger = {this.props.title + " | " + this.props.date + " | " + this.props.source} >
                <p className="CollapsibleParagraph">{this.props.description}</p>
            </Collapsible>
        );
    }
};

export default ArticleComponent;