var React = require('react');
var $ = require('jquery');

var KidWithBuckets = require('./kidwithbuckets.js')
var AddKidModal = require('./addkidmodal.js')

module.exports = React.createClass({
  getInitialState: function() {
    return { familyData: null, showAddKidModal: false }
  },
  openAddKidModal: function() {
    this.setState({showAddKidModal: true});
  },
  closeAddKidModal: function() {
    this.setState({showAddKidModal: false});
  },
  onAddKidSuccess: function() {
    this.closeAddKidModal();
    this.refreshDataFromServer();
  },
  refreshDataFromServer: function() {
    this.setState({familyData: null});
    console.log("Getting family info");
    $.ajax({
      url: '/api/getfamilysummary',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken }),
      success: function(data) {
        this.setState({familyData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.refreshDataFromServer();
  },
  render: function() {
    if (this.state.familyData) {
      var kidInfo = this.state.familyData.kids.map( function(kid) {
        return(<KidWithBuckets key={kid.id} kid={kid} loginToken={this.props.loginToken} refresh={this.refreshDataFromServer}/>);
      }, this);
      return( <div>
                <h1>The {this.state.familyData.name} Family Info</h1>
                <AddKidModal show={this.state.showAddKidModal} onHide={this.closeAddKidModal} loginToken={this.props.loginToken} onSuccess={this.onAddKidSuccess}/>
                <a href="#" onClick={this.openAddKidModal}>Add Kid</a>
                {kidInfo}
              </div>
            );
    } else {
      return( <h1>Retrieving Data...</h1>)
    }
  }
});
