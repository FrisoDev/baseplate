import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneStudent, deleteStudent } from '../actions/students'
import EvalForm from './EvalForm'
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { push } from 'react-router-redux'
import './StudentEval.css'

const containerStyle = {
  width: '470px',
  height: '550px',
  margin: '20px',
  padding: '2rem',
}

class EvalStudent extends PureComponent {

  componentWillMount() {
    const { student, fetchOneStudent } = this.props
    const { studentId } = this.props.match.params

    if (!student) { fetchOneStudent(studentId) }

  }

  deleteStudent= () => {
    const { deleteStudent, student } = this.props
    deleteStudent(student)
  }

  editStudent = studentId => event => this.props.push(`/students/${studentId}/edit`)

  render() {
    const { student } = this.props
     if (!student) return null
    return(
      <div className="studentpage">
        <Card style={containerStyle}>
        <CardMedia
          overlay={<CardTitle title={student.name}/>}
          >
        <div className="colors">
           {student.evaluations.map(e =>
            <div key={e._id}className={e.color}></div>)}
        </div>
          <img className="studentImage" src={student.photo} alt="student" />
            </CardMedia>
            <Menu>
              <MenuItem primaryText="Edit" onClick={this.editStudent(student._id)} />
              <MenuItem primaryText="Delete" onClick={this.deleteStudent}/>
              <MenuItem primaryText="Back" onClick={() => this.props.push(`/batches/${student.batchId}`)}/>
            </Menu>
        </Card>
        <div>
          <EvalForm studentId={student._id} batchId={student.batchId}/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ students }, { match }) => {
  const student = students.filter((s) => (s._id === match.params.studentId))[0]
  return {
    student
  }
}

  export default connect(mapStateToProps, { fetchOneStudent, deleteStudent, push })(EvalStudent)
