import EventEmmiter from "events";

import dispatcher from "../dispatcher/dispatcher.jsx";

class SongsStore extends EventEmmiter{
    
    constructor(){
        super();
        this.songsList = [];
        this.artistList = [];
        this.userData = [];
        this.userAlbums = undefined;
        this.albumDetails = [];
        this.albumComments = undefined;
        this.playlistDetails = undefined;
    }
    
    getSongsList(){
        return this.songsList;
    }
    
    getArtistList(){
        return this.artistList;
    }
    
    getUserData(){
        return this.userData;
    }
    
    getUserAlbums(){
        return this.userAlbums;
    }
    
    getAlbumDetails(){
        return this.albumDetails;
    }
    
    getAlbumComments(){
        return this.albumComments;
    }
    
    getPlaylistData(){
        return this.playlistDetails;
    }
    
    resetComments(){
        this.albumComments = undefined;
    }
    
    resetUserAlbums(){
        this.userAlbums = undefined;
    }
    
    resetPlaylist(){
        this.playlistDetails = undefined;
    }
    
    handleAction(action){
        switch(action.type){
                
                /* Received the data from api */
                
                case "ALBUMS_RECEIVED" : {
                    this.songsList = action.album_data;
                    this.emit("albums_received");
                }
                break;
                
                /* Received artist by name */
                
                case "ARTIST_RECEIVED" : {
                    this.artistList = action.artist_data;
                    this.emit("artists_received");
                }
                break;
                
                /* Received user data by id */
                
                case "USERDATA_RECEIVED" : {
                    this.userData = action.user_data;
                    this.emit("userdata_received");
                }
                break;
                
                /* Received user albums by id */
                
                case "USERALBUMS_RECEIVED" : {
                    this.userAlbums = action.user_albums;
                    this.emit("useralbums_received");
                }
                break;
                
                /* Received album details by id */
                
                case "ALBUMDETAILS_RECEIVED" : {
                    this.albumDetails = action.album_details;
                    this.emit("albumdetails_received");
                }
                break;
                
                /* Received album comments by id */
                
                case "ALBUMCOMMENTS_RECEIVED" : {
                    this.albumComments = action.album_comments;
                    this.emit("albumcomments_received");
                }
                break;
                
                /* Received playlist details by id */
                
                case "PLAYLISTDETAILS_RECEIVED" : {
                    this.playlistDetails = action.playlist_details;
                    this.emit("playlistdetails_received");
                }
                break;
        }
    }
    
}

const songsstore = new SongsStore;
dispatcher.register(songsstore.handleAction.bind(songsstore));

export default songsstore;