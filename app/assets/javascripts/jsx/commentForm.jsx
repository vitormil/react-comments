var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var content = React.findDOMNode(this.refs.content).value.trim();
    if (!content || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, content: content});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.content).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="content" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
