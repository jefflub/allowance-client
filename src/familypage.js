var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Dropdown = require('react-bootstrap').Dropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var $ = require('jquery');

var KidWithBuckets = require('./kidwithbuckets.js')
var AddKidModal = require('./addkidmodal.js')
var AddParentModal = require('./addparentmodal.jsx');
var TokenListModal = require('./tokenlistmodal.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { familyData: null, showAddKidModal: false, showAddParentModal: false, showManageLinksModal: false, refreshing: false }
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
  openAddParentModal: function() {
    this.setState({showAddParentModal: true});
  },
  closeAddParentModal: function() {
    this.setState({showAddParentModal: false});
  },
  onAddParentSuccess: function() {
    this.closeAddParentModal();
  },
  openManageLinksModal: function() {
    this.setState({showManageLinksModal: true});
  },
  closeManageLinksModal: function() {
    this.setState({showManageLinksModal: false});
  },
  refreshDataFromServer: function() {
    this.setState({refreshing: true});
    console.log("Getting family info");
    $.ajax({
      url: '/api/getfamilysummary',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken }),
      success: function(data) {
        this.setState({familyData: data, refreshing: false});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({refreshing: false})
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.refreshDataFromServer();
  },
  render: function() {
    if (this.state.familyData) {
      var kidInfo = <h2>No kids yet</h2>
      if (this.state.familyData.kids) {
        kidInfo = this.state.familyData.kids.map( function(kid) {
          return(<KidWithBuckets key={kid.id} kid={kid} loginToken={this.props.loginToken} refresh={this.refreshDataFromServer}/>);
        }, this);
      }
      var refreshIcon = this.state.refreshing ? <Glyphicon glyph="refresh" /> : '';
      var menuButton = (
          <Dropdown id="family-dropdown">
            <Dropdown.Toggle noCaret>
              <Glyphicon glyph="menu-hamburger" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem eventKey="1" onSelect={this.openAddKidModal}>Add Kid</MenuItem>
              <MenuItem eventKey="2" onSelect={this.openAddParentModal}>Add Parent</MenuItem>
              <MenuItem eventKey="3" onSelect={this.openManageLinksModal}>Manage View Links</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4" onSelect={this.props.onLogout}>Sign Out</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
      );
      return( <div>
                <PageHeader>{menuButton} {this.state.familyData.name} Family Allowances {refreshIcon}</PageHeader>
                <AddKidModal show={this.state.showAddKidModal} onHide={this.closeAddKidModal} loginToken={this.props.loginToken} onSuccess={this.onAddKidSuccess}/>
                <AddParentModal show={this.state.showAddParentModal} onHide={this.closeAddParentModal} loginToken={this.props.loginToken} onSuccess={this.onAddParentSuccess} />
                <TokenListModal show={this.state.showManageLinksModal} onHide={this.closeManageLinksModal} loginToken={this.props.loginToken} />
                {kidInfo}
              </div>
            );
    } else {
      return( <h1>Retrieving Data...</h1>)
    }
  }
});
