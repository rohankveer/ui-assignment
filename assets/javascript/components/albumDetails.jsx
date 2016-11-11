"use strict";

import SongsStore from '../store/songstore.jsx';
import * as SongsActions from '../actions/actions.js';
import { Link } from 'react-router'

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
}

let albumDetails = React.createClass({

        
    /* Set initial state to null */
    
     getInitialState: function() {
        return {
            album_data: null,
            album_comments: undefined
        }
      },
    
    /* Call api to get the data as soon as component is mounted */
    
    componentDidMount: function(){
        
        SongsActions.getAlbumDetails(this.props.params.albumId);
        SongsActions.getAlbumComments(this.props.params.albumId);
    },
    
    /* Reset previous data */
    
    componentWillUnmount() {
        SongsStore.resetComments();
        if(this.isMounted()){
                this.setState({
                  album_data: null,
                  album_comments: undefined,
                });     
            }
        
    },
    
    
    /* Update state variables as soon as store is updated */
    
    componentWillMount: function(){
        
        SongsStore.on("albumdetails_received", () => {
            if(this.isMounted()){
                this.setState({
                  album_data: SongsStore.getAlbumDetails(),
                  album_comments: SongsStore.getAlbumComments(),
                });     
            }
        });
        
        SongsStore.on("albumcomments_received", () => {
                if(this.isMounted()){
                    this.setState({
                      album_data: SongsStore.getAlbumDetails(),
                      album_comments: SongsStore.getAlbumComments(),
                    });     
                }  
        });
    },
    
    /* Function to generate Album details template */
    
    generateAlbumTemplate: function(){
        if( this.state.album_data != null ) {
            
            let album_avatar;
                if( this.state.album_data.artwork_url !== null ){
                    album_avatar = this.state.album_data.artwork_url.replace('large','t300x300'); 
                } else {
                    album_avatar = "https://a1.sndcdn.com/images/default_avatar_large.png";   
                }
            
            return (
                <div className="media">
                <div className="media-left rv-userdata-left"> 
                    <img className="media-object" src={album_avatar} /> 
                </div> 
                    <div className="media-body rv-userdata-right"> 
                        <h3 className="media-heading">{this.state.album_data.title}</h3> 
                        <p className="user-description">{this.state.album_data.description}</p>
                    </div> 
                </div>
            );
        }
    },
    
    /* Function to generate Album Comments template */
    
    generateAlbumCommentsTemplate: function(){
        
        /* If data is not avaiable show loader */
        
        if( typeof this.state.album_comments == 'undefined' ){
            return (
                <div className="rv-loader"></div>
            );
        } else if( this.state.album_comments.length > 0 ){
            
            /* Generate the template if data is received */
            /* For each comment create a list group element */
            
            let commentsTemplate =  this.state.album_comments.map((item, index) => {
                    return (
                    <div key={index} className="list-group rv-comment-group">
                            <div className="rv-album-left">
                                <div className="rv-album-art" style={{"backgroundImage":'url(' + item.user.avatar_url + ')'}}></div>
                            </div>
                            <div className="rv-album-right">
                                <b>{item.user.username}</b>
                                <div className="rv-album-description">
                                    {item.body}
                                </div>
                            </div>
                    </div>
                );
          });
            
            return (
                <div className="list-group">
                    <b style={{marginBottom:"20px",display:"block"}}>Comments : </b>
                    <div className="rv-comments-wrapper">
                        {commentsTemplate}
                    </div>
                </div>
            );
        } else {
            
            /* Show No Comments found if comments length is zero */
            
            return (
                <div className="list-group">
                    <b style={{marginBottom:"10px",display:"block"}}>Comments : </b>
                    <div className="rv-comments-wrapper">
                        No Comments Found....
                    </div>
                </div>
            );
        }
    },
    
    render: function() {
        
        let albumTemplate = this.generateAlbumTemplate();
        let albumCommentsTemplate = this.generateAlbumCommentsTemplate();
        return (
            <div className="rv-user-wrapper">
                <div className="rv-userdata-wrapper">
                    {albumTemplate}
                    <div className="rv-user-albums-wrapper">
                        {albumCommentsTemplate}
                    </div>
                </div>
            </div>
        );
  }
});

if (typeof exports !== "undefined") {
  module.exports = albumDetails;
}
