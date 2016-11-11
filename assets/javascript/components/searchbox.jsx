"use strict";

import SongsStore from '../store/songstore.jsx';
import * as SongsActions from '../actions/actions.js';
import { Link } from 'react-router'

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
}

let searchRequest;

let SearchBox = React.createClass({

    /* Set initial state variables */
    
     getInitialState: function() {
        return {
            is_search_open: false,
            show_search_loader: false,
            artist_list: null,
        }
      },
    
    propTypes: {
        placeholder: React.PropTypes.string
    },
    
    /* Update state variable as soon as store is updated */
    
    componentWillMount: function(){
        SongsStore.on("artists_received", () => {
            if( SongsStore.getArtistList().length > 0 && this.isMounted()){
                this.setState({
                  artist_list: SongsStore.getArtistList(),
                  is_search_open: true,
                  show_search_loader: false
                });   
            } else if(this.isMounted()){
                this.setState({
                  artist_list: [],
                  is_search_open: false,
                  show_search_loader: false
                });    
            }
        });
    },
    
    /* Function to hide or show search dropdown */
    
    componentWillUpdate: function(){
        if(this.props.hideSearchContainer && this.isMounted()){
            this.setState({
                  artist_list: [],
                  is_search_open: false,
                  show_search_loader: false
                }); 
            this.props.changeParentState();
        }
    },
    
    /* Function to accept user search input and fetch the artists */
    
    searchChange: function(event){
        
            /* wait till user stops typing */
            let search_value = event.target.value;
            clearTimeout(searchRequest);
            searchRequest = setTimeout(()=>{
                if( search_value != "" && this.isMounted()){
                this.setState({
                    show_search_loader: true
                });
                    SongsActions.getArtistByName(search_value);   
                } else if(this.isMounted()){
                    this.setState({
                          artist_list: [],
                          is_search_open: false,
                        });
                }
            },1000);
    },
    
    /* Function to generate search dropdown template */
    
    generateArtistList: function(){
        
        /* chunk is the number of coloumns you are showing in a row */
        
        const chunk = 3;
        const result = [];
        if( this.state.artist_list != null ){
            for( var i=0; i<this.state.artist_list.length; i += chunk ){
            
            /* generate a new coloumn for each artist */
                
            const songsCards = this.state.artist_list.slice(i, i + chunk).map((item, index) => {
                let img_url = item.avatar_url.replace('large','t300x300');
                    return (
                    <div key={index} className="col-sm-4">
                        <div className="rv-song-wrapper">
                            <div className="rv-song-thumbnail" style={{"backgroundImage":'url(' + img_url + ')'}}>

                            </div>
                            <div className="rv-song-details">
                                <Link className="rv-song-title" to={'/users/' + item.id}>
                                    {item.username}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
          });
            
        /* Generate a new row after 3 coloumns */
                
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
        let classes = classNames({
              "search-dropdown": true,
              "search-dropdown-open": this.state.is_search_open,
            });
        
        let loaderClasses = classNames({
              "fa":true,
              "fa-spinner":true,
              "fa-pulse":true,
              "fa-2x":true,
              "fa-fw":true,
              "fa-spinner-show": this.state.show_search_loader,
            });
        
        let artistTemplate = this.generateArtistList();
        
    return (
        
        <div className="rv-search-wrapper">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" id="rv-search" placeholder={this.props.placeholder} onChange={this.searchChange}/>
            <i className={loaderClasses}></i>
            <div className={classes}>{artistTemplate}</div>
        </div>
    );
  }
});

if (typeof exports !== "undefined") {
  module.exports = SearchBox;
}
