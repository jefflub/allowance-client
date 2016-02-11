var React = require('react');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
      return {email: '', password: ''};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      return;
    }
    $.ajax({
      url: '/api/login',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ email: this.state.email, password: this.state.password }),
      success: function(data) {
        this.props.onLoginSuccess(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
      return (
        <div className="loginBox">
        <form onSubmit={this.handleSubmit}>
        <h2>Please log in:</h2>
        <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
        <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} label="Password" />
        <ButtonInput type="submit" value="Login"  />
        </form>
        </div>
      );
    }
});
