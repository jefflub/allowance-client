var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var Alert = require('react-bootstrap').Alert;
var $ = require('jquery');

module.exports = React.createClass({
 getInitialState: function() {
   return {name: this.props.kid.name, email: this.props.kid.email, allowance: this.props.kid.weeklyAllowance, errorMsg: ''};
 },
 handleEmailChange: function(e) {
   this.setState( {email: e.target.value});
 },
 handleNameChange: function(e) {
   this.setState( {name: e.target.value} );
 },
 handleAllowanceChange: function(e) {
   this.setState( {allowance: e.target.value} );
 },
 handleSubmit: function(e) {
   e.preventDefault();
   $.ajax({
     url: '/api/editkid',
     dataType: 'json',
     type: 'POST',
     cache: false,
     data: JSON.stringify({ token: this.props.loginToken, kidId: this.props.kid.id, name: this.state.name, email: this.state.email, weeklyAllowance: Number(this.state.allowance) }),
     success: function(data) {
       this.props.onSuccess();
       this.setState( {errorMsg: ''} )
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
   return( <Modal show={this.props.show} onHide={this.props.onHide}>
            <form onSubmit={this.handleSubmit}>
             <Modal.Header closeButton>
               <Modal.Title>Edit {this.props.kid.name}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               {errAlert}
               <Input type="text" label="Name" value={this.state.name} onChange={this.handleNameChange} />
               <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
               <Input type="number" addonBefore="$" label="Weekly Allowance" value={this.state.allowance} step=".01" onChange={this.handleAllowanceChange} placeholder="0.00" />
             </Modal.Body>
             <Modal.Footer>
               <Button type="submit" bsStyle="primary">Save</Button>
               <Button onClick={this.props.onHide}>Cancel</Button>
             </Modal.Footer>
           </form>
           </Modal>
   );
 }
});
