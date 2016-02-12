var React = require('react');
var Table = require('react-bootstrap').Table;

var AddMoneyModal = require('./addmoneymodal.js');
var SpendMoneyModal = require('./spendmoneymodal.js');
var BucketTable = require('./buckettable.jsx')

module.exports = React.createClass({
    getInitialState: function() {
      return { showAddModal: false, showSpendModal: false };
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
                <h3>Kid: {this.props.kid.name}</h3>
                <BucketTable kid={this.props.kid} />
                <a href="#" onClick={this.openAddModal}>Add Money</a><br />
                <a href="#" onClick={this.openSpendModal}>Spend Money</a>
              </div>
            );
    }
});
