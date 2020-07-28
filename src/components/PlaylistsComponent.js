import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';
import { Card, Col, Row, Button, Input, Typography, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import Songs from './SongsComponent';

const { Text } = Typography;

class Playlists extends Component {
    state = {
        playlists: [],
        buttonClicked: false,
        playlistName: "",
        noOfPlaylists: null,
        songs: {},
        albums: {},
        currentlyPlaying: null,
        search: "",
        allSongs: {},
        visible: false
    }

    componentDidMount() {
        console.log("PROPS", this.props);
        localStorage.setItem('playlist0', "Favourites");
        localStorage.setItem('playlist1', "My Second Playlist");

        let i = 0;
        let listOfPlaylists = [];
        while(localStorage.getItem('playlist'+i) !== null){
            listOfPlaylists.push(localStorage.getItem('playlist'+i));
            i++;
        }
        this.setState({noOfPlaylists: i});
        console.log("READING PLAYLISTS: ",listOfPlaylists);
        this.setState({playlists: [...this.state.playlists, ...listOfPlaylists]})

        if(Object.keys(this.state.songs).length === 0 || Object.keys(this.state.albums).length === 0) {
            fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(songs => {
                    console.log("songs",songs);
                    songs = songs.slice(100,120);
                    let slicedSongList = songs.slice(10,15);
                    this.setState({songs: slicedSongList, allSongs: songs});
                })
            fetch('https://jsonplaceholder.typicode.com/albums')
                .then(response => response.json())
                .then(albums => {
                    albums = albums.slice(0,4);
                    console.log("albums",albums);
                    this.setState({albums: albums});
                })
        }
    }
    
    handleClick(){
        let {buttonClicked, playlistName, noOfPlaylists} = this.state;

        if(buttonClicked && playlistName) {
            localStorage.setItem("playlist" + noOfPlaylists, playlistName);
            this.setState({playlists: [...this.state.playlists, playlistName]});
        }
        if(!buttonClicked){
            this.setState({nameOfPlaylist: ""});
        }
        this.setState({buttonClicked: !buttonClicked})
    }

    savePlaylist(event) {
        this.setState({playlistName: event.target.value});
    }

    shuffleMusic() {
        let {songs} = this.state;
        let randomSong = songs[Math.floor(Math.random() * songs.length)];
        console.log("Playing Random Song: ",randomSong.id);
        this.setState({currentlyPlaying: randomSong.id});
    }

    searchPlaylist(event) {
        let keyword = event.target.value;
        this.setState({search:keyword})
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    addToPlaylist(song, playlistName){
        console.log("addToPlaylist CALLED", song, playlistName);
        this.setState({songs: [...this.state.songs, song]});
    }

    handleReturn = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

    render() {
        let d = new Date();
        let date = d. getDate();
        let month = d. getMonth();
        let year = d. getFullYear();
        let monthStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dateStr = date + " " + monthStr[month] + " " + year;
        console.log("Inside Playlist Component", this.props);
        const {match: { params: { playlistName } } } = this.props;
        return (
            <div className="header">
                <Header />
                {playlistName ? 
                    <>
                        <div  style={{margin: "10px"}}>
                            <Text strong>Playlist: {playlistName}</Text>
                        </div>
                        <Col className="align-center" >
                            <Button onClick={this.shuffleMusic.bind(this)}>Shuffle Play</Button>
                            <Button span={8} onClick={this.showModal} style={{marginLeft: "10px"}}>Add Song</Button>
                            <Modal
                                title="Basic Modal"
                                visible={this.state.visible}
                                width="750px"
                                onOk={this.handleReturn}
                                onCancel={this.handleReturn}
                                cancelText={"Return to "+playlistName}
                                okText=""
                            >
                                {
                                    Object.keys(this.state.allSongs).length !== 0 && 
                                        <Songs 
                                            songs={this.state.allSongs} 
                                            listView={true} 
                                            playlistName={playlistName} 
                                            addToPlaylist={this.addToPlaylist.bind(this)} 
                                        />
                                }
                            </Modal>
                        </Col>
                        {Object.keys(this.state.songs).length !== 0 && Object.keys(this.state.albums).length !== 0 && 
                            <Songs songs={this.state.songs} albums={this.state.albums} currentlyPlaying={this.state.currentlyPlaying}/>}
                    </>
                :
                <React.Fragment>
                    <Search onChange={(e)=>this.searchPlaylist(e)} placeholder="search for playlist..."/>
                    {this.state.playlists.filter((data)=>{
                        if(this.state.search == null)
                            return data
                        else if(data.toLowerCase().includes(this.state.search.toLowerCase()) ){
                            return data
                        }
                      })
                    .map((playlist, index)=>{
                        return (
                            <NavLink to={{
                                pathname: "/playlists/"+encodeURI(playlist)
                            }} key={index} >
                                <Card className="song-card" hoverable="true" >
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            <p>{playlist}</p>
                                        </Col>
                                        <Col span={8}>
                                            {/* Showing today's date as of now. Creation Date should be stored in the DB. */}
                                            <p style={{color: "grey"}}>Created on: {dateStr}</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </NavLink>
                        )
                    })
                    }
                    <Row span={8}>
                        {this.state.buttonClicked && 
                            <Input className="playlist-input-box" onChange={(e)=>this.savePlaylist(e)} onPressEnter={this.handleClick.bind(this)} />}
                    </Row>
                    <Row>
                        <Button type="default" onClick={this.handleClick.bind(this)} className="align-center">
                            {this.state.buttonClicked ? "Confirm" : "Create Playlist" }
                        </Button>
                    </Row>
                </React.Fragment>
                }
            </div>
        )
    }
}

export default Playlists;