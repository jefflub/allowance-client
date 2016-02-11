var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var $ = require('jquery');

module.exports = React.createClass({
 getInitialState: function() {
   return {name: '', email: ''};
 },
 handleEmailChange: function(e) {
   this.setState( {email: e.target.value});
 },
 handleNameChange: function(e) {
   this.setState( {name: e.target.value} );
 },
 handleSubmit: function() {
   $.ajax({
     url: '/api/createkid',
     dataType: 'json',
     type: 'POST',
     cache: false,
     data: JSON.stringify({ token: this.props.loginToken, name: this.state.name, email: this.state.email }),
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
               <Modal.Title>Add kid</Modal.Title>
             </Modal.Header>
             <Modal.Body>
             <form onSubmit={this.handleSubmit}>
               <Input type="text" label="Name" value={this.state.name} onChange={this.handleNameChange} />
               <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
               <ButtonInput type="submit" value="Add Kid" />
               <Button onClick={this.props.onHide}>Close</Button>
             </form>
             </Modal.Body>
           </Modal>
   );
 }
});
