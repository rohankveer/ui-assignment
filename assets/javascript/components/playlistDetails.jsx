"use strict";

import SongsStore from '../store/songstore.jsx';
import * as SongsActions from '../actions/actions.js';
import { Link } from 'react-router'

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
}

let playlistDetails = React.createClass({

        
    /* Set initial state to null */
    
     getInitialState: function() {
        return {
            playlist_data: null,
        }
      },
    
    /* Call api to get the data as soon as component is mounted */
    
    componentDidMount: function(){
        
        SongsActions.getPlaylistDetails(this.props.params.playlistId);

    },
    
    /* Reset previous data */
    
    componentWillUnmount() {
        SongsStore.resetPlaylist();
        if(this.isMounted()){
                this.setState({
                  playlist_data: null,
                });     
            }
        
    },
    
    
    /* Update state variables as soon as store is updated */
    
    componentWillMount: function(){
        
        SongsStore.on("playlistdetails_received", () => {
            if(this.isMounted()){
                this.setState({
                  playlist_data: SongsStore.getPlaylistData(),
                });     
            }
        });
    },
    
    /* Function to generate Playlist details template */
    
    generatePlaylistTemplate: function(){
        if( this.state.playlist_data != null ) {
            
            let album_avatar;
                if( this.state.playlist_data.artwork_url !== null ){
                    album_avatar = this.state.playlist_data.artwork_url.replace('large','t300x300'); 
                } else {
                    album_avatar = "https://a1.sndcdn.com/images/default_avatar_large.png";   
                }
            
            return (
                <div className="media">
                <div className="media-left rv-userdata-left"> 
                    <img className="media-object" src={album_avatar} /> 
                </div> 
                    <div className="media-body rv-userdata-right"> 
                        <h3 className="media-heading">{this.state.playlist_data.title}</h3> 
                        <p className="user-description">{this.state.playlist_data.description}</p>
                    </div> 
                </div>
            );
        } else {
            return (
                <div className="rv-loader"></div>
            );
        }
    },
    
    /* Function to generate playlist tracks template */
    
    generatePlaylistTracksTemplate: function(){
        
        if( this.state.playlist_data != null ) {
            if( this.state.playlist_data.tracks.length < 1 ){
                return (
                    <div className="rv-user-albums-wrapper">
                        <div className="list-group">
                             No Tracks Found.
                        </div>
                    </div>
                );
            } else {

                /* Create a list-group for each track */

                let resultTemplate = this.state.playlist_data.tracks.map((item, index) => {
                    let user_avatar;
                    if( item.artwork_url !== null ){
                        user_avatar = item.artwork_url.replace('large','t300x300');   
                    } else {
                        user_avatar = "https://a1.sndcdn.com/images/default_avatar_large.png";   
                    }
                        return (
                            
                        <div key={index} className="list-group">
                                <div className="rv-album-left">
                                    <div className="rv-album-art" style={{"backgroundImage":'url(' + user_avatar + ')'}}></div>
                                </div>
                                <div className="rv-album-right">
                                    <b>
                                        {item.title}
                                    </b>
                                    <div className="rv-album-description">
                                        {item.description}
                                    </div>
                                </div>
                        </div>
                    );
              });
                
                return(
                    <div className="rv-user-albums-wrapper">
                        <p style={{"marginBottom":"20px"}}><b>Tracks : </b></p>
                        {resultTemplate}
                    </div>
                );
            }
        }
    },
    
    render: function() {
        
        let playlistTemplate = this.generatePlaylistTemplate();
        let tracksTemplate = this.generatePlaylistTracksTemplate();
        return (
            <div className="rv-user-wrapper">
                <div className="rv-userdata-wrapper">
                        {playlistTemplate}
                        {tracksTemplate}
                </div>
            </div>
        );
  }
});

if (typeof exports !== "undefined") {
  module.exports = playlistDetails;
}
