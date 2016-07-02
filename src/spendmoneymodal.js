var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var Alert = require('react-bootstrap').Alert;
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {amount: '', note: '', bucketId: this.props.kid.buckets[0].id, errorMsg: ''};
  },
  handleAmountChange: function(e) {
    this.setState( {amount: e.target.value});
  },
  handleNoteChange: function(e) {
    this.setState( {note: e.target.value} );
  },
  handleBucketChange: function(e) {
    console.log( 'Changing bucket ID: ' + e.target.value );
    this.setState( {bucketId: e.target.value} );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/spendmoney',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken, bucketId: Number(this.state.bucketId), amount: Number(this.state.amount), note: this.state.note }),
      success: function(data) {
        this.props.onSuccess();
        this.setState( {amount: '', note: '', errorMsg: ''} )
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
        if (xhr.responseText) {
          this.setState( {errorMsg: JSON.parse(xhr.responseText).errorMsg } )
        }
        else {
          this.setState( {errorMsg: err.toString()} )
        }
      }.bind(this)
    });
  },
  render: function() {
    var errAlert = this.state.errorMsg ? (<Alert bsStyle="danger">{this.state.errorMsg}</Alert>) : ''
    var bucketOptions = this.props.kid.buckets.map(function(bucket) {
      return (<option key={bucket.id} value={bucket.id}>{bucket.name}</option>);
    }, this);
    return( <Modal show={this.props.show} onHide={this.props.onHide}>
              <form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Spend money for {this.props.kid.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {errAlert}
                <Input type="number" addonBefore="$" label="Amount" value={this.state.amount} onChange={this.handleAmountChange} step="0.01" placeholder="0.00" />
                <Input type="text" label="Note" value={this.state.note} onChange={this.handleNoteChange} />
                <Input type="select" label="Bucket" value={this.state.bucketId} onChange={this.handleBucketChange}>
                  {bucketOptions}
                </Input>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" bsStyle="primary">Spend</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
              </Modal.Footer>
            </form>
            </Modal>
    );
  }
});
