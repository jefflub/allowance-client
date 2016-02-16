var React = require('react');
var Table = require('react-bootstrap').Table
var numeral = require('numeral');

module.exports = React.createClass({
  render: function() {
    var bucketRows = this.props.kid.buckets.map(function(bucket) {
      return(
        <tr key={bucket.id}>
          <td>{bucket.name}</td>
          <td className="text-right">{numeral(bucket.total).format('$0,0.00')}</td>
        </tr>
      )
    }, this);
    return( <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Bucket</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bucketRows}
              </tbody>
            </Table>
          );
  }
});
