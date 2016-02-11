var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var $ = require('jquery');

module.exports = React.createClass({
 getInitialState: function() {
   return {amount: '', note: ''};
 },
 handleAmountChange: function(e) {
   this.setState( {amount: e.target.value});
 },
 handleNoteChange: function(e) {
   this.setState( {note: e.target.value} );
 },
 handleSubmit: function() {
   $.ajax({
     url: '/api/addmoney',
     dataType: 'json',
     type: 'POST',
     cache: false,
     data: JSON.stringify({ token: this.props.loginToken, kidId: this.props.kid.id, amount: Number(this.state.amount), note: this.state.note }),
     success: function(data) {
       this.props.onSuccess();
     }.bind(this),
     error: function(xhr, status, err) {
       console.error('Error', status, err.toString());
     }.bind(this)
   });
 },
 render: function() {
   return( <Modal show={this.props.show} onHide={this.props.onHide}>
             <Modal.Header closeButton>
               <Modal.Title>Add money for {this.props.kid.name}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
             <form onSubmit={this.handleSubmit}>
               <Input type="number" label="Amount" value={this.state.amount} onChange={this.handleAmountChange} placeholder="0.0" />
               <Input type="text" label="Note" value={this.state.note} onChange={this.handleNoteChange} />
               <ButtonInput type="submit" value="Add"  />
               <Button onClick={this.props.onHide}>Close</Button>
             </form>
             </Modal.Body>
           </Modal>
   );
 }
});
