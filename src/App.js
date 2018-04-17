import React, { Component } from 'react';
import axios from 'axios'


const API_URL = 'http://www.recipepuppy.com/api/'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      search:"",
      ingredients:'',
      page:1,
      result:[],
      query:""

    }
  }


  query = (e) =>{
    e.preventDefault()
    this.formQuery()
    axios.get(`${API_URL}?${this.state.query}`)
    .then(result=>{
      console.log(result)
      return result.data.results
    }).then(result=>{
      this.setState({result})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleSearchChange = (e) =>{
    this.setState({search: e.target.value})
  }

  formQuery = () => {
    let result = ""
    if(this.state.search.length>0){
      result+=`q=${this.state.search}`
    }
    if(this.state.ingredients.length>0){
      result+=`i=${this.state.ingredients}`
    }
    this.setState({
      query:result
    })
  }

  handleIngredients = ( e ) =>{


  }



  render() {
    return (
      <div>
        <form onSubmit ={ this.query }>
          Ingredients: <br/>
          <input
            placeholder="Ingredients"
            onChange={ this.handleIngredients }>

          </input>
          <br/>
          Search Recipies:<br/>
          <input
            placeholder="Search"
            onChange={ this.handleSearchChange }
            ></input>
            <br/>
            <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default App;
