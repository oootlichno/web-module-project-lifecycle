import React, { Component } from "react";
 import axios from 'axios'

const URL = 'http://localhost:9000/api/todos';

export default class App extends Component {
  state ={
    todos: [],
    error: '',
    todoNameInput:'',
  }

  onTodoNameInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

resetForm = () => this.setState({...this.state, todoNameInput:''})

setAxiosResponseError = err => this.setState({...this.state, error: err.response.data.message})

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllTodos()
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
axios.get(URL)
.then(res => {
this.setState({...this.state, todos: res.data.data})})
.catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div id="error">Error: {this.state.error}</div>
        <h2>Todos:</h2>
        {this.state.todos.map(tod => (
          <div key={tod.id}>
            {tod.name}
          </div>
        ))}
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
<input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type todo"></input>
<button>Submit</button>
<button>Hide Completed</button>

        </form>
      </div>
    );
  }
}


//ReactDOM.render(<App />, document.getElementById('root'));  