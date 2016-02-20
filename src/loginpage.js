var React = require('react');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
      return {email: '', password: '', familyName: '', parentName: '', registering: false, loginError: false};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleFamilyNameChange: function(e) {
    this.setState({familyName: e.target.value});
  },
  handleParentNameChange: function(e) {
    this.setState({parentName: e.target.value});
  },
  handleLoginSubmit: function(e) {
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
        this.setState({loginError: true})
      }.bind(this)
    });
  },
  handleRegistrationSubmit: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    var parentName = this.state.parentName.trim();
    var familyName = this.state.familyName.trim();
    if (!email || !password || !parentName || !familyName) {
      return;
    }
    $.ajax({
      url: '/api/createfamily',
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: JSON.stringify({ parentEmail: email, parentPassword: password, familyName: familyName, parentName: parentName }),
      success: function(data) {
        this.props.onLoginSuccess(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('Error', status, err.toString());
      }.bind(this)
    });
  },
  showRegistration: function() {
    this.setState({registering: true});
  },
  showLogin: function() {
    this.setState({registering: false});
  },
  render: function() {
      var errMsg = '';
      if (this.state.loginError) {
        errMsg = (<p className="bg-danger">Invalid email or password.</p>)
      }
      if (this.state.registering == false) {
        return (
          <div className="loginBox">
          <form onSubmit={this.handleLoginSubmit}>
          <h2>Log in or <a href="#" onClick={this.showRegistration}>register</a></h2>
          {errMsg}
          <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
          <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} label="Password" />
          <ButtonInput type="submit" value="Login"  />
          </form>
          </div>
        );
      } else {
        return(
          <div className="registrationBox">
          <form onSubmit={this.handleRegistrationSubmit}>
          <h2><a href="#" onClick={this.showLogin}>Log in</a> or register</h2>
          <Input type="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
          <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} label="Password" />
          <Input type="text" placeholder="Trump" label="Family Name" value={this.state.familyName} onChange={this.handleFamilyNameChange} />
          <Input type="text" placeholder="Donald" label="Parent Name" value={this.state.parentName} onChange={this.handleParentNameChange} />
          <ButtonInput type="submit" value="Register"  />
          </form>
          </div>
        );
      }
    }
});
