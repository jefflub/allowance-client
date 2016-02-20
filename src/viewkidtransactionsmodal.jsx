var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var KidTransactions = require('./kidtransactions.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      pageSize: this.props.pageSize
    };
  },
  render: function() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Transactions for {this.props.kid.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <KidTransactions loginToken={this.props.loginToken} kidId={this.props.kid.id} pageSize={this.state.pageSize} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
