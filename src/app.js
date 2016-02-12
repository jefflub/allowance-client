var React = require('react');
var $ = require('jquery');

// My components
var LoginPage = require('./loginpage.js');
var FamilyPage = require('./familypage.js');
var KidHashDisplay = require('./kidhashdisplay.jsx');

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
    return { hash: window.location.hash.substr(1), loginToken: sessionStorage.getItem('loginToken') }
  },
  componentWillMount: function() {
    if (this.state.hash.length == 8) {
      return;
    }
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
    var hash = window.location.hash.substr(1);
    if (hash.length == 8) {
      return( <KidHashDisplay token={hash} /> );
    }
    else if (this.state.loginToken) {
        return ( <FamilyPage loginToken={this.state.loginToken} /> );
    }
    else {
      return( <LoginPage onLoginSuccess={this.handleLogin} /> );
    }
  }
});
