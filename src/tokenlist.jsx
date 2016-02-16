var React = require('react');
var Table = require('react-bootstrap').Table
var Button = require('react-bootstrap').Button;
var $ = require('jquery')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tokenList: null
    };
  },
  componentWillMount: function() {
    $.ajax({
      url: '/api/getlinktokeninfo',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken }),
      success: function(data) {
        console.log('Got tokens: ' + data.linkTokens.length)
        this.setState( {tokenList: data.linkTokens} )
      }.bind(this),
      error: function(xhr, status, err) {
        //this.handleLogin(null);
      }.bind(this)
    });
  },
  onDeleteLinkToken: function(linkToken) {
    $.ajax({
      url: '/api/deletelinktoken',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.props.loginToken, linkToken: linkToken}),
      success: function(data) {
        console.log('Delete got tokens: ' + data.linkTokens.length)
        this.setState( {tokenList: data.linkTokens} )
      }.bind(this),
      error: function(xhr, status, err) {
        //this.handleLogin(null);
      }.bind(this)
    })
  },
  render: function() {
    var rows
    if (this.state.tokenList) {
      rows = this.state.tokenList.map(function(t) {
        return(
          <tr>
            <td>{t.linkToken}</td>
            <td>{t.kidName}</td>
            <td><Button onClick={this.onDeleteLinkToken.bind(this, t.linkToken)}>Delete</Button></td>
          </tr>
        )
      }, this);
    }

    return(
      <Table bordered condensed hover striped>
        <thead>
          <tr>
            <td>Link</td>
            <td>Kid</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }
})
