import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Row, Progress, Button } from 'antd';
import Search from './Search';
import { PlayCircleOutlined } from '@ant-design/icons';

class Songs extends Component {
    state={
        currentlyPlaying: null,
        search: null
    }

    playSong(songId) {
        let selectedSong = this.props.songs.filter(
            song => (song.id === songId)
        )
        this.setState({currentlyPlaying: selectedSong[0].id});
        console.log("PLAYING ", selectedSong[0].title);
        alert("Now Playing: " + selectedSong[0].title);
    }

    searchSong=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }

    render(){
        console.log("Inside SongComponent: ",this.props, this.state);
        return (
            <>
            <Search onChange={(e)=>this.searchSong(e)} />
            {
                Object.keys(this.props.songs).length !== 0 && 
                    this.props.songs.filter((data)=>{
                        if(this.state.search == null)
                            return data
                        else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) ){
                            return data
                        }
                      }).map((song, index)=> {
                        return(
                            <Card className="song-card" key={index} hoverable="true">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <img src={song.thumbnailUrl} className="thumbnail"/>
                                    </Col>
                                    <Col span={16}>
                                        <p>Song Title: {song.title}</p>
                                        <p>Singer: </p>
                                        <p>Album: { this.props.albums.filter(album=>{if(album.id === song.albumId) return album.title})[0].title }</p>
                                        <Button onClick={() => this.playSong(song.id)} icon={<PlayCircleOutlined/>}>
                                            Play
                                        </Button>
                                        {(this.state.currentlyPlaying === song.id || this.props.currentlyPlaying === song.id) && 
                                            // TODO: We can change this to show the progress of the song using counter function.
                                            <Progress percent={Math.random() * (100 - 0) + 0} showInfo={false} />
                                        }
                                    </Col>
                                    
                                </Row>
                            </Card>
                        )
                    })
            }
            </>
        );
    }
}

export default Songs;
