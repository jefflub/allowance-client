var React = require('react')
var $ = require('jquery');
var PageItem = require('react-bootstrap').PageItem
var Pager = require('react-bootstrap').Pager

var TransactionTable = require('./transactiontable.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      page: 0,
      pageSize: this.props.pageSize,
      hasNextPage: false,
      hasPreviousPage: false,
      transactions: []
    };
  },
  getPageData: function() {
    var offset = this.state.page * this.state.pageSize;
    var limit = this.state.pageSize;
    $.ajax({
      url: '/api/gettransactions',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken, kidId: this.props.kidId, offset: offset, count: limit }),
      success: function(data) {
        this.setState( {hasPreviousPage: this.state.page == 0 ? false : true, hasNextPage: data.hasNextPage, transactions: data.transactions})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  gotoNextPage: function() {
    var newPage = this.state.page + 1
    this.setState({page: newPage}, this.getPageData);
    this.getPageData();
  },
  gotoPreviousPage: function() {
    if (this.state.page == 0)
      return;
    var newPage = this.state.page - 1
    this.setState({page: newPage}, this.getPageData);
  },
  componentDidMount: function() {
    this.getPageData();
  },
  render: function() {
    return (
      <div>
      <TransactionTable transactions={this.state.transactions} />
        <Pager>
          <PageItem onSelect={this.gotoPreviousPage} disabled={!this.state.hasPreviousPage} previous href="#">&larr; Previous</PageItem>
          <PageItem onSelect={this.gotoNextPage} disabled={!this.state.hasNextPage} next href="#">Next &rarr;</PageItem>
        </Pager>
      </div>
    );
  }
});
