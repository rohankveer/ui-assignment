import React from 'react';
import SearchBox from './components/searchbox.jsx';
import SongsContainer from './components/songsContainer.jsx';
import * as SongsActions from './actions/actions.js';

class App extends React.Component {
    
    constructor(props) {
        super(props);
         this.state = {
                  hide_search_container: false,
                } ;
      }
    
    
    /* Call action to get the albums as soon as app is loaded */
    
    componentDidMount(){
        SongsActions.getAlbums();
    }
    
    /* Function to change the state to hide or show search dropdown */
    
    changeHideState(){
        this.setState({
                  hide_search_container: false,
                });
    }
    
    /* Function to hide search dropdown if clicked outside of search */
    
    mainClick(event){

        if( event.target.className.includes("rv-songs-wrapper") || event.target.className.includes("col-sm-2") || event.target.className.includes("rv-songs-row") || event.target.className.includes("main-section-wrapper")){
             this.setState({
                          hide_search_container: true,
                        });
        } else {
            this.setState({
                          hide_search_container: false,
                        });
        }
    }
    
   render() {
      return (
         <div className="main_wrapper" onClick={this.mainClick.bind(this)}>
              <header>
                  <SearchBox placeholder="Search For Artist" hideSearchContainer={this.state.hide_search_container} changeParentState={this.changeHideState.bind(this)}></SearchBox>
              </header>
              <section className="main-section-wrapper">
                  <SongsContainer></SongsContainer>
              </section>
         </div>
      );
   }
}

export default App;