import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneStudent } from '../actions/students'
import Title from '../components/UI/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { updateStudent } from '../actions/students'
import { push } from 'react-router-redux'
import Drawer from 'material-ui/Drawer';


  const dialogS = {
    width: '275px',
    margin: '25px',
    padding: '2rem',
  }

  const buttonS = {
    float: 'right',
    marginLeft: '2rem',
  }

class EditStudent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {open: true,
      value: ""};
  }
    state = {}
  componentWillMount() {
    // eslint-disable-next-line
    const { student, fetchOneStudent, updateStudent } = this.props
    const { studentId } = this.props.match.params

    if (!student) { fetchOneStudent(studentId) }

  }
    submitForm(event) {
      event.preventDefault()

        const { student } = this.props
        const evaluations = this.props.student.evaluations
        const evaluation = {
         color: this.state.value,
         date: this.refs.date.getValue(),
         note: this.refs.note.getValue()
       }
       evaluations.push(evaluation)
        const updatedStudent = {
          name: this.refs.name.getValue(),
          photo: this.refs.photo.getValue(),
          evaluations: evaluations
      }
        this.props.updateStudent(updatedStudent, student._id)
        this.props.push(`/students/${student._id}`)
      }

      handler = (value) => {
        this.setState({value: value})
        }

    render() {
    const  { student } = this.props
     if (!student) return null
      return (
        <div>
          <Drawer width={600} openSecondary={true} open={this.state.open}>
          <Paper style={ dialogS }>
          <Title content="Edit" level={2} />

          <form onSubmit={this.submitForm.bind(this)} ref="form">

            <div className="input">

              <h4>Full name: </h4>
              <TextField ref="name" type="text" defaultValue={student.name} />

            </div>


            <div className="input">

              <h4>Photo: </h4>
              <TextField ref="photo" type="text" placeholder='url' defaultValue={student.photo} />

            </div>


            <div className="input">

              <div className="colors" >

                <div className="green1" primaryText="Green" onClick={this.handler("green")}></div>
                <div className="yellow1" value={"yellow"} primaryText="Yellow" onClick={this.handler("yellow")}></div>
                <div className="red1" value={"red"} primaryText="Red" onClick={this.handler("red")}></div>

              </div>

            </div>


            <div className="input">

              <h4>Date: </h4>
              <TextField ref="date" type="date" placeholder='Date' defaultValue={student.evaluations[student.evaluations.length-1].date}/>

           </div>


          <div className="input">

            <h4>Remarks: </h4>
            <TextField ref="note" type="text" placeholder='Remarks' defaultValue={student.evaluations[student.evaluations.length-1].note}  multiLine={true}
              rows={2}
              rowsMax={4} />

          </div>


          </form>


        <RaisedButton
          style={ buttonS }
          onClick={ this.submitForm.bind(this) }
          label="Change"
          primary={true} />


      </Paper>
      </Drawer>
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

  export default connect(mapStateToProps, { fetchOneStudent, updateStudent, push })(EditStudent)
