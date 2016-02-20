var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var $ = require('jquery');
var url = require('url');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      linkToken: null
    };
  },
  onCreateLink: function() {
    $.ajax({
      url: '/api/createkidtoken',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken, kidId: this.props.kid.id }),
      success: function(data) {
        this.setState({linkToken: data.kidToken});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  getFullUrl: function() {
      var myUrl = url.parse( window.location.href );
      console.log( myUrl )
      myUrl.hash = "#" + this.state.linkToken;
      console.log(url.format(myUrl));
      return url.format(myUrl);
  },
  render: function() {
    var body
    if (this.state.linkToken) {
      body = <div>Here is the link: <a href={this.getFullUrl()} target="_blank">{this.getFullUrl()}</a></div>
    } else {
      body = <div>This will create a link that can be used by {this.props.kid.name} to see current
            balances and recent transactions without being able to make any changes.</div>
    }
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create view link for {this.props.kid.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.onCreateLink} bsStyle="primary" disabled={this.state.linkToken}>Create Link</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
