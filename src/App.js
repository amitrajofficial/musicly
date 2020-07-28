import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage';
import Playlist from './components/PlaylistsComponent';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/songs" component={HomePage} exact={true} />
            <Route path="/playlists" component={Playlist} exact={true} />
            <Route path="/playlists/:playlistName" component={Playlist} exact={true} />
            <Route path="/" component={HomePage} />
        </Switch>
    </Router>
, document.getElementById('app'))