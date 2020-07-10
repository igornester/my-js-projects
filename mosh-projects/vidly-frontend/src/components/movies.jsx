import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.addLike = () => {
      let movies = getMovies();
      movies.forEach((element, index) =>
        index % 2 === 0 ? (element.liked = false) : (element.liked = true)
      );
      return movies;
    };
    this.state = {
      movies: this.addLike(),
    };
  }

  deleteButton = (movie_id) => {
    this.setState({
      movies: this.state.movies.filter((movie) => movie._id !== movie_id),
    });
  };

  handleLike = (id) => {
    let newMovies = this.state.movies.reduce((acc, element) => {
      let genre = { ...element.genre };
      let newElement = { ...element, genre };
      if (newElement._id === id) newElement.liked = !newElement.liked;
      acc.push(newElement);
      return acc;
    }, []);

    this.setState({ movies: newMovies });
  };

  render() {
    return (
      <div className="App">
        <span>
          {this.state.movies.length > 0
            ? `Showing ${this.state.movies.length} movies in database`
            : "There are no movies in the database"}
        </span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stork</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((element) => (
              <tr key={element._id}>
                <td>{element.title}</td>
                <td>{element.genre.name}</td>
                <td>{element.numberInStock}</td>
                <td>{element.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={element.liked}
                    id={element._id}
                    onLiked={() => this.handleLike(element._id)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteButton(element._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            ;
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
