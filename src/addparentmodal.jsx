var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var $ = require('jquery');

module.exports = React.createClass({
 getInitialState: function() {
   return {name: '', email: '', password: '', success: false};
 },
 handleEmailChange: function(e) {
   this.setState( {email: e.target.value});
 },
 handleNameChange: function(e) {
   this.setState( {name: e.target.value} );
 },
 handlePasswordChange: function(e) {
   this.setState({password: e.target.value});
 },
 onHide: function() {
   this.setState(this.getInitialState());
   this.props.onHide();
 },
 handleSubmit: function() {
   $.ajax({
     url: '/api/addparent',
     dataType: 'json',
     type: 'POST',
     cache: false,
     data: JSON.stringify({ token: this.props.loginToken, parentName: this.state.name, parentEmail: this.state.email, parentPassword: this.state.password }),
     success: function(data) {
       this.setState({success: true});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error('Error', status, err.toString());
     }.bind(this)
   });
 },
 render: function() {
   var body;

   if (this.state.success) {
     var mailto = "mailto:" + this.state.email + "?subject=You've been added to allowance manager&body=Visit " + window.location.href + " to get started!";
     body = <div>New parent {this.state.name} added successfully. <a href={mailto}>Send an email</a> to let them know!
              <Button onClick={this.onHide}>Close</Button>
            </div>
   } else {
      body = <form onSubmit={this.handleSubmit}>
              <Input type="text" label="Parent Name" value={this.state.name} onChange={this.handleNameChange} />
              <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
              <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} label="Password" />
              <ButtonInput type="submit" value="Add Parent" />
              <Button onClick={this.onHide}>Close</Button>
            </form>
   }
   return( <Modal show={this.props.show} onHide={this.onHide}>
             <Modal.Header closeButton>
               <Modal.Title>Add Parent</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               {body}
             </Modal.Body>
           </Modal>
   );
 }
});
