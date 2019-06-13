import React, { Component } from 'react'
import axios from 'axios' 
import Main from '../template/Main'

const headerProps = {
    icon: 'search',
    title: 'Movies',
    subtitle: 'Search Movies by Title'
}

const baseUrl = 'https://localhost:44313/api/movies/search/?title=';
const initialState = {
    titlesearch: '',
    moviesByYear: {year: 0, movies: 0, total: 0 },
    list:[]
}

export default class Movie extends Component {

    state = { ...initialState }

    clear(){
        this.setState({moviesByYear: initialState.moviesByYear})
    }

    get(title = '') {
        const search = title ? `&title__regex=/${title}/` : ''
        axios.get(`${baseUrl}?sort=-createdAt${search}`)
        .then(response => { this.setState({ list: response.data}); })
        .catch(() => { console.log('Error retrieving data'); });    
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.titlesearch}
                            placeholder="Enter the title..."/> 
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.get(this.titlesearch)}>                            
                            Search
                        </button>  

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>                        
                        <th>Year</th>
                        <th>Movies</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(moviesByYear => {
            return (
                <tr>
                    <td>{moviesByYear.year}</td>
                    <td>{moviesByYear.movies}</td>
                    <td>{moviesByYear.total}</td>                    
                </tr>
            )
        })
    }

    render(){

        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}