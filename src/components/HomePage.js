import React, { Component } from 'react';
import Header from './Header';
// import Search from './Search';
import Songs from './SongsComponent';

class HomePage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            songs: {},
            albums: {}
        };
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("Inside componentDidMount");
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(songs => {
                // console.log("songs",songs);
                songs = songs.slice(0,100);
                if (this._isMounted) {
                    this.setState({songs: songs});
                }
            })
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(albums => {
                albums = albums.slice(0,10);
                // console.log("albums",albums);
                if (this._isMounted) {
                    this.setState({albums: albums});
                }
            })
            
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        console.log("RENDER", this.state.songs);
        return (
            <div className="header">
                <Header />
                {/* <Search /> */}
                {Object.keys(this.state.songs).length !== 0 && Object.keys(this.state.albums).length !== 0 && 
                    <Songs songs={this.state.songs} albums={this.state.albums} />}
            </div>
        );
    }
}

export default HomePage;