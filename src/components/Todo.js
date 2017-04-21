import React, { PropTypes } from 'react'
var {
  createFragmentContainer,
  graphql,
} = require('react-relay/compat')
import Relay from 'react-relay/classic'
import classnames from 'classnames'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import RenameTodoMutation from '../mutations/RenameTodoMutation'
import TodoTextInput from './TodoTextInput'

class Todo extends React.Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
  }

  state = {
    isEditing: false,
  }

  _handleCompleteChange = (e) => {
    const complete = e.target.checked
    ChangeTodoStatusMutation.commit(
      this.props.relay.environment,
      this.props.todo,
      complete,
      this.props.viewer.id
    )
  }

  _handleDestroyClick = () => {
    this._removeTodo()
  }

  _handleLabelDoubleClick = () => {
    this._setEditMode(true)
  }

  _handleTextInputCancel = () => {
    this._setEditMode(false)
  }

  _handleTextInputDelete = () => {
    this._setEditMode(false)
    this._removeTodo()
  }

  _handleTextInputSave = (text) => {
    this._setEditMode(false)
    // Relay.Store.commitUpdate(
    //   new RenameTodoMutation({todo: this.props.todo, text})
    // )
    RenameTodoMutation.commit(
      this.props.relay.environment,
      this.props.todo,
      text,
      this.props.viewer.id
    )
  }

  _removeTodo () {
    // Relay.Store.commitUpdate(
    //   new RemoveTodoMutation({todo: this.props.todo, viewer: this.props.viewer})
    // )
    RemoveTodoMutation.commit(
      this.props.relay.environment,
      this.props.todo.id,
      this.props.viewer.id
    )
  }

  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit})
  }

  renderTextInput () {
    return (
      <TodoTextInput
        className='edit'
        commitOnBlur
        initialValue={this.props.todo.text}
        onCancel={this._handleTextInputCancel}
        onDelete={this._handleTextInputDelete}
        onSave={this._handleTextInputSave}
      />
    )
  }

  render () {
    return (
      <li
        className={classnames({
          completed: this.props.todo.complete,
          editing: this.state.isEditing,
        })}>
        <div className='view'>
          <input
            checked={this.props.todo.complete}
            className='toggle'
            onChange={this._handleCompleteChange}
            type='checkbox'
          />
          <label onDoubleClick={this._handleLabelDoubleClick}>
            {this.props.todo.text}
          </label>
          <button
            className='destroy'
            onClick={this._handleDestroyClick}
          />
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    )
  }
}

export default createFragmentContainer(Todo, {
  todo: graphql`
    fragment Todo_todo on Todo {
      complete,
      id,
      text,
#      ...ChangeTodoStatusMutation_todo,
#      ...RemoveTodoMutation_todo,
#      ...RenameTodoMutation_todo,
    }
  `,
  viewer: graphql`
    fragment Todo_viewer on Viewer {
      id,
#      ...ChangeTodoStatusMutation_viewer,
#      ...RemoveTodoMutation_viewer,
     }
  `,
})
