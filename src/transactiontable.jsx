var React = require('react');
var Table = require('react-bootstrap').Table
var numeral = require('numeral');
var moment = require('moment');

module.exports = React.createClass({
  render: function() {
    var rows = this.props.transactions.map(function(t) {
      return(
        <tr className={t.amount < 0 ? 'danger' : ''} key={t.id}>
          <td>{moment(t.createDate).format('l')}</td>
          <td>{t.bucketName}</td>
          <td>{t.note}</td>
          <td className="text-right">{numeral(t.amount).format('$0,0.00')}</td>
        </tr>
      )
    }, this);
    return( <Table bordered condensed hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bucket</th>
                  <th>Note</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          );
  }
});
