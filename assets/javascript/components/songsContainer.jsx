"use strict";

import SongsStore from '../store/songstore.jsx';
import { Link } from 'react-router'

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
}

let SongsContainer = React.createClass({

    /* Set initial state to null */
    
    getInitialState: function() {
        return {
          songs_list: null,
        }
      },
    
    /* Set state variables as soon as store is updated */
    
    componentWillMount: function(){
        SongsStore.on("albums_received", () => {
            if(this.isMounted()){
                    this.setState({
                              songs_list: SongsStore.getSongsList(),
                            });
                        }
                     });
    },
    
    /* Function to generate home template */
    
    generateListItem : function(){
        
        /* chunk is number of coloumns you want to show in a row */
        const chunk = 6;
        const result = [];
        
        /* Show loader if data is not received */
        
        if( this.state.songs_list == null ){
            return (
                <div className="rv-loader"></div>
            );
        } else {
            for( var i=0; i<this.state.songs_list.length; i += chunk ){
            
                /* Create a new coloumn for each album */
                
                const songsCards = this.state.songs_list.slice(i, i + chunk).map((item, index) => {
                    let img_url;
                    if( item.artwork_url !== null ){
                        img_url = item.artwork_url.replace('large','t300x300');   
                    } else {
                        img_url = "https://a1.sndcdn.com/images/default_avatar_large.png";   
                    }
                        return (
                        <div key={index} className="col-sm-2">
                            <div className="rv-song-wrapper">
                                <div className="rv-song-thumbnail" style={{"backgroundImage":'url(' + img_url + ')'}}>
                                </div>
                                <div className="rv-song-details">
                                    <Link className="rv-song-title" to={'/albums/' + item.id}>
                                        {item.title}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
              });

            /* Create a new row after 6 coloumns */

            if( (i%chunk) == 0 ){
                    result.push(
                        <div key={i} className="rv-songs-row row">
                          {songsCards}
                        </div>
                      );
                }
            }
        return result;
        }
    },

    render: function() {
    let songsTemplate = this.generateListItem();
    return (
        <div className="rv-songs-wrapper">
           {songsTemplate}
        </div>
    );
  }
});

if (typeof exports !== "undefined") {
  module.exports = SongsContainer;
}
