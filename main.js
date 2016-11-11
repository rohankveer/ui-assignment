import React from 'react';
import ReactDOM from 'react-dom';
import App from './assets/javascript/App.jsx';
import userDetails from './assets/javascript/components/userDetails.jsx';
import albumDetails from './assets/javascript/components/albumDetails.jsx';
import playlistDetails from './assets/javascript/components/playlistDetails.jsx';
import { Router, Route, Link, hashHistory,IndexRoute  } from 'react-router';

require('./assets/css/custom.scss');

ReactDOM.render((
   <Router history = {hashHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {App} />
      </Route>
        <Route path="users">
          <Route path=":userId" component={userDetails} />
        </Route>
        <Route path="albums">
          <Route path=":albumId" component={albumDetails} />
        </Route>
        <Route path="playlist">
          <Route path=":playlistId" component={playlistDetails} />
        </Route>
   </Router>
	
), document.getElementById('app'))
