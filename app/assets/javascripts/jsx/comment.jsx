var Comment = React.createClass({
  render: function() {
    var content;
    try {
      content = this.props.children.toString();
    } catch (e) {
      content = "";
    }
    var rawMarkup = marked(content, {sanitize: true});
    return (
      <div className="comment">
        <span className="commentAuthor">{this.props.author} said:</span>
        <pre dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});
