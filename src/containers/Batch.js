import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import {GridList, GridTile} from 'material-ui/GridList';
import StudentForm from './StudentForm'
import { push } from 'react-router-redux'
import { selectStudent } from '../actions/batches'
import RaisedButton from 'material-ui/RaisedButton'
import Percentage from '../components/Percentage'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginLeft: '0px',
  },
  gridList: {
    width: 600,
    height: 450,
    marginTop: '10px',
  },
};

const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      batchNumber: PropTypes.number,
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      })
  }

  componentWillMount() {
    const { batchId } = this.props.match.params

   this.props.fetchOneBatch(batchId)

  }

   goStudent = studentId => event => this.props.push(`/students/${studentId}`)

   selectStudent() {
     const { batch } = this.props
     this.props.selectStudent(batch)
   }


  render() {
    const { batch } = this.props
    if (!batch) return null
    return(
      <div style={styles.root}>
        <Percentage batch={batch}/>
      <div>
      </div>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
         {batch.students.map((student) => (
            <GridTile
              cols={1}
              key={student._id}
              title={student.name}
              onClick={this.goStudent(student._id)}
              actionIcon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="1 0 24 23">
               <circle fill={student.evaluations[student.evaluations.length-1].color} cx="12" cy="12" r="50"/></svg>}
            >
              <img className="studentPhoto" src={student.photo} alt="studento"  onClick={this.goStudent(student._id)}/>
        </GridTile>
    ))}
  </GridList>
  <div>
    <StudentForm batchId= { batch._id}/>
    <RaisedButton
      label="Ask A Question"
      className="selectStudent"
      primary={true}
      onClick={ this.selectStudent.bind(this)} />
  </div>
</div>
    )
  }
}

  const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
    return {
      batch
    }
  }

  export default connect(mapStateToProps, { fetchOneBatch, selectStudent, push })(Batch)
