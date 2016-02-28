var React = require('react');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Dropdown = require('react-bootstrap').Dropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var NavBar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;

var AddMoneyModal = require('./addmoneymodal.js');
var SpendMoneyModal = require('./spendmoneymodal.js');
var BucketTable = require('./buckettable.jsx');
var KidTokenModal = require('./kidtokenmodal.jsx');
var ViewKidTransactionsModal = require('./viewkidtransactionsmodal.jsx');
var EditKidModal = require('./editkidmodal.jsx');
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
    openTransactionsModal: function() {
      this.setState( {showTransactionsModal: true} );
    },
    closeTransactionsModal: function() {
      this.setState( {showTransactionsModal: false} );
    },
    openEditModal: function() {
      this.setState( {showEditModal: true} );
    },
    closeEditModal: function() {
      this.setState( {showEditModal: false} );
    },
    onAddSuccess: function() {
      this.closeAddModal();
      this.props.refresh();
    },
    onSpendSuccess: function() {
      this.closeSpendModal();
      this.props.refresh();
    },
    onEditSuccess: function() {
      this.closeEditModal();
      this.props.refresh();
    },
    render: function() {
      var oldNav = (<h3>{this.props.kid.name}&nbsp;&nbsp;
        <ButtonGroup bsSize="large">
            <Button onClick={this.openAddModal}><Glyphicon glyph="plus-sign"/><Glyphicon glyph="usd"/></Button>
            <Button onClick={this.openSpendModal}><Glyphicon glyph="minus-sign"/><Glyphicon glyph="usd"/></Button>
            <Dropdown pullRight id={`kid-dropdown-${this.props.kid.id}`}>
              <Dropdown.Toggle noCaret bsSize="large">
                <Glyphicon glyph="option-vertical" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onSelect={this.openTransactionsModal}>Transaction History</MenuItem>
                <MenuItem eventKey="2" onSelect={this.openEditModal}>Edit Kid</MenuItem>
                <MenuItem eventKey="3" onSelect={this.openLinkModal}>Create View Link</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
        </ButtonGroup>
      </h3>)
      var newNav = (
        <NavBar inverse>
          <NavBar.Header>
            <NavBar.Brand>{this.props.kid.name}</NavBar.Brand>
            <NavBar.Toggle />
          </NavBar.Header>
          <NavBar.Collapse>
            <Nav>
              <NavItem eventKey="1" onSelect={this.openAddModal}>Add $</NavItem>
              <NavItem eventKey="2" onSelect={this.openSpendModal}>Spend $</NavItem>
              <NavItem eventKey="1" onSelect={this.openTransactionsModal}>Transaction History</NavItem>
              <NavItem eventKey="2" onSelect={this.openEditModal}>Edit Kid</NavItem>
              <NavItem eventKey="3" onSelect={this.openLinkModal}>Create View Link</NavItem>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      )
      return( <div>
                <AddMoneyModal show={this.state.showAddModal} onHide={this.closeAddModal} onSuccess={this.onAddSuccess} kid={this.props.kid} loginToken={this.props.loginToken} />
                <SpendMoneyModal show={this.state.showSpendModal} onHide={this.closeSpendModal} onSuccess={this.onSpendSuccess} kid={this.props.kid} loginToken={this.props.loginToken} />
                <KidTokenModal show={this.state.showLinkModal} onHide={this.closeLinkModal} kid={this.props.kid} loginToken={this.props.loginToken} />
                <ViewKidTransactionsModal show={this.state.showTransactionsModal} onHide={this.closeTransactionsModal} kid={this.props.kid} loginToken={this.props.loginToken} pageSize={10}/>
                <EditKidModal show={this.state.showEditModal} onHide={this.closeEditModal} kid={this.props.kid} loginToken={this.props.loginToken} onSuccess={this.onEditSuccess} />
                {newNav}
                <BucketTable kid={this.props.kid} />
              </div>
            );
    }
});
