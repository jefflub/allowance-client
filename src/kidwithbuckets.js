var React = require('react');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AddMoneyModal = require('./addmoneymodal.js');
var SpendMoneyModal = require('./spendmoneymodal.js');
var BucketTable = require('./buckettable.jsx');
var KidTokenModal = require('./kidtokenmodal.jsx');

module.exports = React.createClass({
    getInitialState: function() {
      return { showAddModal: false, showSpendModal: false, showLinkModal: false };
    },
    openAddModal: function() {
      this.setState( {showAddModal: true} );
    },
    closeAddModal: function() {
      this.setState( {showAddModal: false} );
    },
    openSpendModal: function() {
      this.setState( {showSpendModal: true} );
    },
    closeSpendModal: function() {
      this.setState( {showSpendModal: false} );
    },
    openLinkModal: function() {
      this.setState( {showLinkModal: true} );
    },
    closeLinkModal: function() {
      this.setState( {showLinkModal: false} );
    },
    onAddSuccess: function() {
      this.closeAddModal();
      this.props.refresh();
    },
    onSpendSuccess: function() {
      this.closeSpendModal();
      this.props.refresh();
    },
    render: function() {
      return( <div>
                <AddMoneyModal show={this.state.showAddModal} onHide={this.closeAddModal} onSuccess={this.onAddSuccess} kid={this.props.kid} loginToken={this.props.loginToken} />
                <SpendMoneyModal show={this.state.showSpendModal} onHide={this.closeSpendModal} onSuccess={this.onSpendSuccess} kid={this.props.kid} loginToken={this.props.loginToken} />
                <KidTokenModal show={this.state.showLinkModal} onHide={this.closeLinkModal} kid={this.props.kid} loginToken={this.props.loginToken} />
                <h3>{this.props.kid.name}&nbsp;&nbsp;
                  <ButtonGroup bsSize="large">
                      <Button onClick={this.openAddModal}><Glyphicon glyph="usd"/><Glyphicon glyph="arrow-up"/></Button>
                      <Button onClick={this.openSpendModal}><Glyphicon glyph="usd"/><Glyphicon glyph="arrow-down"/></Button>
                      <Button onClick={this.openLinkModal}><Glyphicon glyph="eye-open"/></Button>
                  </ButtonGroup>
                </h3>
                <BucketTable kid={this.props.kid} />
              </div>
            );
    }
});
