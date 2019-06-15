import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'search',
    title: 'Movies',
    subtitle: 'Search Movies by Title'
}

const setting = {
    //headers: {'Access-Control-Allow-Origin': '*'}
    method: 'GET',
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
    },
    crossdomain: true,
    withCredentials: true,
    credentials: 'same-origin'
}

let searchTitle = '';
const baseUrl = 'https://localhost:44313/api/movies/search/?title=';
const initialState = {
    moviesByYear: { year: 0, movies: 0 },
    total: 0,
    responseObj: []
}

export default class Movie extends Component {

    state = { ...initialState }

    handleInputChange = (event) => {
        this.setState({ title: event.target.value });
    }

    clear() {
        this.setState({ moviesByYear: initialState.moviesByYear })
    }

    get(title) {
        const search = title ? `${title}` : ''
        axios.get(baseUrl + search)
            .then(response => { this.setState({ responseObj: response.data }); })
            .catch(() => { console.log('Error retrieving data'); });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" onChange={this.handleInputChange} value={this.searchTitle}
                                placeholder="Enter the title..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.get(this.state.title)}>
                            Search
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
                    </tr>                    
                </thead>
                <tbody>
                    {this.renderRows()}                    
                </tbody>
                <div className="total">
                <p><strong>Total: </strong>{this.state.responseObj.total}</p>
                </div> 
            </table>  
        )
    }

    renderRows() {
        if (this.state.responseObj.length !== 0) {
            return this.state.responseObj.moviesByYear.map(movie => {
                return (
                    <tr>
                        <td>{movie.year}</td>
                        <td>{movie.movies}</td>
                    </tr>
                )
            })
        }
    }

    render() {

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}