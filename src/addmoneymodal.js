var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Modal = require('react-bootstrap').Modal;
var $ = require('jquery');

module.exports = React.createClass({
 getInitialState: function() {
   return {amount: '', note: '', bucketId: '-1'};
 },
 handleAmountChange: function(e) {
   this.setState( {amount: e.target.value});
 },
 handleNoteChange: function(e) {
   this.setState( {note: e.target.value} );
 },
 handleBucketChange: function(e) {
   this.setState( {bucketId: e.target.value} );
 },
 handleSubmit: function(e) {
   e.preventDefault();
   var bucketId = Number(this.state.bucketId)
   var allocations = []
   if (bucketId >= 0) {
     allocations = [{ bucketId: bucketId, allocation: 100 }]
   }
   $.ajax({
     url: '/api/addmoney',
     dataType: 'json',
     type: 'POST',
     cache: false,
     data: JSON.stringify({ token: this.props.loginToken, kidId: this.props.kid.id, amount: Number(this.state.amount), note: this.state.note, allocations: allocations }),
     success: function(data) {
       this.props.onSuccess();
     }.bind(this),
     error: function(xhr, status, err) {
       console.error('Error', status, err.toString());
     }.bind(this)
   });
 },
 render: function() {
   var bucketOptions = this.props.kid.buckets.map(function(bucket) {
     return (<option key={bucket.id} value={bucket.id}>{bucket.name}</option>);
   }, this);
   return( <Modal show={this.props.show} onHide={this.props.onHide}>
              <form onSubmit={this.handleSubmit}>
             <Modal.Header closeButton>
               <Modal.Title>Add money for {this.props.kid.name}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <Input type="number" addonBefore="$" label="Amount" value={this.state.amount} onChange={this.handleAmountChange} step=".01" placeholder="0.00" />
               <Input type="text" label="Note" value={this.state.note} onChange={this.handleNoteChange} />
               <Input type="select" label="Bucket" value={this.state.bucketId} onChange={this.handleBucketChange}>
                  <option key="-1" value="-1">Default allocation</option>
                  {bucketOptions}
               </Input>
             </Modal.Body>
             <Modal.Footer>
               <Button type="submit" bsStyle="primary">Add</Button>
               <Button onClick={this.props.onHide}>Cancel</Button>
             </Modal.Footer>
           </form>
           </Modal>
   );
 }
});
