import React, {Component} from 'react';
import marked from 'marked';

class MarkdownPreview extends Component {
    state = {
        markdown: ""
    };

    updateMarkdown = function(markdown) {
        this.setState({markdown});
    };
    render() {
        let { markdown } = this.state;
        console.log(markdown);
        return (
            <div>
                <h1>React Markdown Previewer</h1>
                <div className="grid">
                    <div>
                        <textarea rows="4" cols="100" placeholder="Write your markdown here!" value={markdown} onChange={(event)=>this.updateMarkdown(event.target.value)}>Text</textarea>
                    </div>
                    <div className="preview" dangerouslySetInnerHTML={{__html: marked(markdown)}}/>
                </div>
                <button type="button" className="success button">Export</button>
                <button type="button" className="alert button">Import</button>
            </div>
        );
    }
}
export default MarkdownPreview;