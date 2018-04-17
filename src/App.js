import React, { Component } from 'react';
import axios from 'axios'
import Results from './components/results.js'
import Next from './components/next.js'
import Meals from './components/meals.js'

const API_URL = 'http://www.recipepuppy.com/api/'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      search:"",
      ingredients:'',
      page:null,
      result:[],
      query:"",
      meals:[]

    }
  }


  query =  async (e) =>{
    e.preventDefault()
    await this.formQuery()
    console.log(`${API_URL}?${this.state.query}`)
    axios.get(`${API_URL}?${this.state.query}`)
    .then(result=>{
      console.log(result)
      return result.data.results
    }).then(result=>{
      this.setState({result, page:1})
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
      if(result.length>1)result+= `&i=${this.state.ingredients}`
      else{result+=`i=${this.state.ingredients}`}
    }
    this.setState({
      query:result

    })
  }

  handleIngredients = ( e ) =>{
    this.setState({ingredients:e.target.value.split(" ")})

  }

  changePage = ( e, pageNumber) =>{
    e.preventDefault()
    this.formQuery()
    this.setState({
      query:`${this.state.query}&p=${this.state.page + 1}`,
      page:this.state.page + 1
    })
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

  addMeal = ( meal )=> {
    if(localStorage.getItem('meals')){
      let arr =  JSON.parse(localStorage.getItem('meals'))
      meal.id = arr.length+1
      arr.push(meal)
      localStorage.setItem('meals', JSON.stringify(arr))
      this.setState({meals:arr})
    }
    else{
      let meals = []
      meal.id=1
      meals.push(meal)
      localStorage.setItem('meals', JSON.stringify(meals))
      this.setState({meals})
    }

  }

  removeMeal = ( meal ) =>{
    let updateMeals = []
    this.state.meals.filter(plate=>{
      if(plate.id !== meal.id){
        updateMeals.push(plate)
      }
      localStorage.setItem('meals', JSON.stringify(updateMeals))
      this.setState({meals: updateMeals})
    })
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
        {this.state.result.length>0 ? <div><Results recipies={this.state.result} addMeal={this.addMeal}/>
        <Next currentPage={this.state.page} changePage={this.changePage}/></div> :null}
        <br/>
        <Meals myMeals={this.state.meals} removeMeal={this.removeMeal} />
      </div>

    );
  }
}

export default App;
