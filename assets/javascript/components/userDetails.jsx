"use strict";

import SongsStore from '../store/songstore.jsx';
import * as SongsActions from '../actions/actions.js';
import { Link } from 'react-router'

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
}

let userDetails = React.createClass({

        
    /* Function to set initial state */
    
     getInitialState: function() {
        return {
            user_data: [],
            user_albums: undefined
        }
      },
    
    /*  Fetch user data and user albums as soon as the component is mounted */
    
    componentDidMount: function(){
        SongsActions.getUserData(this.props.params.userId);
        SongsActions.getUserAlbums(this.props.params.userId);
    },
    
    /* Reset previous data */
    
    componentWillUnmount() {
        SongsStore.resetUserAlbums();
        if(this.isMounted()){
                this.setState({
                  user_data: [],
                  user_albums: undefined,
                });     
            }
        
    },
    
    
    /* Update the state as soon as data is received */
    
    componentWillMount: function(){
        SongsStore.on("userdata_received", () => {
            if(this.isMounted()){
                this.setState({
                  user_data: SongsStore.getUserData(),
                  user_albums: SongsStore.getUserAlbums(),
                });
            }
            
        });
        SongsStore.on("useralbums_received", () => {
                if(this.isMounted()){
                    this.setState({
                      user_data: SongsStore.getUserData(),
                      user_albums: SongsStore.getUserAlbums(),
                    });
                }  
        });
    },
    
    /* Function to generate user details template */
      
    generateUserTemplate: function(){
        
        if( this.state.user_data.length != 0 ){
            let img_url;
                if( this.state.user_data.avatar_url !== null ){
                    img_url = this.state.user_data.avatar_url.replace('large','t300x300');  
                } else {
                    img_url = "https://a1.sndcdn.com/images/default_avatar_large.png";   
                }
            return (
                <div className="media">
                <div className="media-left rv-userdata-left"> 
                    <img className="media-object" src={img_url} /> 
                </div> 
                    <div className="media-body rv-userdata-right"> 
                        <h3 className="media-heading">{this.state.user_data.username}</h3> 
                        <p className="user-country"><i className="fa fa-map-marker" aria-hidden="true"></i>  {this.state.user_data.country}  <span className="user-city">({this.state.user_data.city})</span></p>
                        <p className="user-followers">{this.state.user_data.followers_count} followers</p>
                        <p className="user-description">{this.state.user_data.description}</p>
                    </div> 
                </div>
            );
        }
    },
    
    /* Function to generate user albums template */
    
    generateUserAlbumsTemplate: function(){
        
         /* Show loader if data is not received */
        
        if( typeof this.state.user_albums == 'undefined' ){
            return (
                <div className="rv-loader"></div>
            );
        } else if( this.state.user_albums.length > 0 ){
            
            /* Create a list-group for each album */
            
            let resultTemplate = this.state.user_albums.map((item, index) => {
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
                                <Link className="rv-album-title" to={'/playlist/' + item.id}>
                                    {item.title}
                                </Link>
                                <div className="rv-album-description">
                                    {item.description}
                                </div>
                            </div>
                    </div>
                );
          });
            
            return (
                <div className="rv-user-albums-wrapper">
                    <p style={{"marginBottom":"20px"}}><b>Playlists : </b></p>
                    {resultTemplate}
                </div>
            );
            
        } else {
            
            /* No albums found if length is zero */
            
            return (
                <div className="rv-user-albums-wrapper">
                    <div className="list-group">
                        No Playlists Found.
                    </div>
                </div>
                );
        }
    },
    
    render: function() {
        
        let userTemplate = this.generateUserTemplate();
        let userAlbumTemplate = this.generateUserAlbumsTemplate();
        return (
            <div className="rv-user-wrapper">
                <div className="rv-userdata-wrapper">
                     {userTemplate}
                     {userAlbumTemplate}
                </div>
            </div>
        );
  }
});

if (typeof exports !== "undefined") {
  module.exports = userDetails;
}
