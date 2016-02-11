var React = require('react');
var $ = require('jquery');

// My components
var LoginPage = require('./loginpage.js');
var FamilyPage = require('./familypage.js');

module.exports = React.createClass({
  handleLogin: function(response) {
    if ( response ) {
      this.setState( {loginToken: response.token} );
      sessionStorage.setItem('loginToken', response.token);
    } else {
      sessionStorage.removeItem('loginToken');
      this.setState( {loginToken: null} );
    }
  },
  getInitialState: function() {
    return { loginToken: sessionStorage.getItem('loginToken') }
  },
  componentWillMount: function() {
    console.log("Checking login token")
    $.ajax({
      url: '/api/logincheck',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ token: this.state.loginToken }),
      success: function(data) {
        // this.setState({familyData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.handleLogin(null);
      }.bind(this)
    });
  },
  render: function() {
    if (this.state.loginToken) {
        return ( <FamilyPage loginToken={this.state.loginToken} /> );
    }
    else {
      return( <LoginPage onLoginSuccess={this.handleLogin} /> );
    }
  }
});
