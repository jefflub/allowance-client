var React = require('react');
var $ = require('jquery');

var BucketTable = require('./buckettable.jsx')
var TransactionTable = require('./transactiontable.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return({ kidData: null });
  },
  componentDidMount: function() {
    console.log("Getting kid info");
    $.ajax({
      url: '/api/kid/' + this.props.token + '/',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({kidData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    if ( this.state.kidData ) {
      return( <div>
                <h2>Allowance for {this.state.kidData.kid.name}</h2>
                <BucketTable kid={this.state.kidData.kid} />
                <h3>Recent transactions:</h3>
                <TransactionTable transactions={this.state.kidData.transactions} />
              </div>
              );
    } else {
      return(<h1>Retrieving data...</h1>);
    }
  }
});
