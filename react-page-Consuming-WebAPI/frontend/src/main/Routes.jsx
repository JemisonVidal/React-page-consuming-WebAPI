import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import Movie from '../components/movie/Movie'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/searchMovies' component={Movie}/>
        <Redirect from='*' to='/'/>
    </Switch>