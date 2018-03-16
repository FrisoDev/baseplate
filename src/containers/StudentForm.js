import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../actions/students'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const dialogS = {
  width: '300px',
  margin: '50px',
  padding: '3rem',
}

const buttonS = {
  float: 'left',
  marginLeft: '2rem',
}

class StudentForm extends PureComponent {
  static propTypes = {
    createStudent: PropTypes.func.isRequired,
    batchId: PropTypes.string
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
      const { batchId } = this.props
      const student = {
        name: this.refs.name.getValue(),
        photo: this.refs.photo.getValue(),
        batchId: batchId,
        evaluations: [{}],
      }
      this.props.createStudent(student, batchId)
      this.refs.form.reset()
    }

  render() {
    return (

      <Paper style={ dialogS }>
        <Title content="Add New Student" level={2} />

        <form onSubmit={this.submitForm.bind(this)} ref="form">
          <div className="input">
            <h4>Full name: </h4>
            <TextField ref="name" type="text" placeholder="Student Name" />
          </div>
          <div className="input">
            <h4>Photo: </h4>
            <TextField ref="photo" type="text" placeholder='link' />
         </div>
        </form>
        <RaisedButton
          style={ buttonS }
          onClick={ this.submitForm.bind(this) }
          label="Add"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ student }) => ({ student })

export default connect(mapStateToProps, { createStudent })(StudentForm)
