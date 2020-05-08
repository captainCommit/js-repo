import React,{Component} from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Bootstrap from './pages/react-bootstrap';
import Material from './pages/material'
import './App.css';
export default class App extends Component{
	constructor(props)
	{
		super(props)
	}
	render()
	{
		return(
		<div className="App">
			<BrowserRouter>
				<Route exact path='/b' component={Bootstrap}/>
				<Route path='/' component={Material}/>
        	</BrowserRouter>
		</div>)
	}
}
