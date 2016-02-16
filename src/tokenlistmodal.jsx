var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var TokenList = require('./tokenlist.jsx')

module.exports = React.createClass({
    render: function() {
      return(
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Manage view links</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TokenList loginToken={this.props.loginToken} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
});
