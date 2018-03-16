import React, { PureComponent } from 'react'
import { fetchBatches } from '../actions/batches'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SignIn from './SignIn'
import PropTypes from 'prop-types'
import BatchForm from './BatchForm'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 823,
    height: 500,
  },
  titleStyle: {
  color: 'black',
  fontSize: '30px',
},
subtitleStyle: {
color: 'black',
},
};

class Batches extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
}
  componentWillMount() {
    this.props.fetchBatches()
  }

 goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

  render() {
    if (!this.props.signedIn) return <SignIn />

    return(
      <div style={styles.root}>
        <Menu
         cellHeight={150}
         style={styles.gridList}
        >
     {this.props.batches.map((batch) => (
       <MenuItem
         className= "menuBatch"
         key={batch._id}
         primaryText= {"Batch " + batch.batchNumber}
         titleStyle={styles.titleStyle}
         secondaryText={<span>{batch.startDate.substr(0,10) + " / " + batch.endDate.substr(0,10)}</span>}
         subtitleStyle={styles.subtitleStyle}
         onClick={this.goToBatch(batch._id)}
        />
     ))}
   </Menu>
   <BatchForm />
 </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, signedIn: !!currentUser && !!currentUser._id, })
const mapDispatchToProps = { fetchBatches, push }

export default connect(mapStateToProps, mapDispatchToProps)(Batches)
