var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if ((this.state.data.length > 0) && (data.length > 0)) {
          alertify.success("Comments loaded successfully.");
        }
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
    var railsComments = {
      authenticity_token: csrfToken,
      comment: {
        author: comment.author,
        content: comment.content
      }
    };
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'x-www-form-urlencoded',
      type: 'POST',
      data: railsComments,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  refreshButtonClick: function () {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <a onClick={this.refreshButtonClick}>Refresh</a>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

React.render(
  <CommentBox url="/comments" pollInterval={5000} />,
  document.getElementById('content')
);
