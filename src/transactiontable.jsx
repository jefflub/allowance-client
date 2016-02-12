var React = require('react');
var Table = require('react-bootstrap').Table
var numeral = require('numeral');
var moment = require('moment');

module.exports = React.createClass({
  render: function() {
    var rows = this.props.transactions.map(function(t) {
      return(
        <tr key={t.id}>
          <td>{moment(t.createDate).format('l')}</td>
          <td>{t.bucketId}</td>
          <td>{numeral(t.amount).format('$0,0.00')}</td>
          <td>{t.note}</td>
        </tr>
      )
    }, this);
    return( <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bucket</th>
                  <th>Amount</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          );
  }
});
