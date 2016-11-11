import dispatcher from "../dispatcher/dispatcher.jsx";

/* Function to get albums from soundcloud */
/* returns array of albums */

export function getAlbums(){
    
    fetch('//api.soundcloud.com/tracks?linked_partitioning=1&client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&limit=50&offset=0&tags=house')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "ALBUMS_RECEIVED",
                    album_data: json.collection
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get artist by name  */
/* Returns the array of artists with matching name */

export function getArtistByName(name){
    
    fetch('//api.soundcloud.com/users?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&limit=50&offset=0')
      .then(response => response.json())
      .then(json => {
            const artists = json.filter(artist => artist.username.toLowerCase().includes(name));
            dispatcher.dispatch(
                {
                    type: "ARTIST_RECEIVED",
                    artist_data: artists
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get the artist data from id */
/* Returns artist details */

export function getUserData(id){
    
    fetch('//api.soundcloud.com/users/' + id + '?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "USERDATA_RECEIVED",
                    user_data: json
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get the albums from artist id */
/* returns array of albums created by an artist */

export function getUserAlbums(id){

    fetch('//api.soundcloud.com/users/'+ id +'/playlists?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "USERALBUMS_RECEIVED",
                    user_albums: json
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get playlist details */

export function getPlaylistDetails(id){

    fetch('//api.soundcloud.com/playlists/' + id + '?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "PLAYLISTDETAILS_RECEIVED",
                    playlist_details: json
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get the album details from album id */

export function getAlbumDetails(id){

    fetch('//api.soundcloud.com/tracks/' + id + '?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "ALBUMDETAILS_RECEIVED",
                    album_details: json
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}

/* Function to get the album comments by album id */

export function getAlbumComments(id){

    fetch('//api.soundcloud.com/tracks/' + id + '/comments?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
      .then(response => response.json())
      .then(json => {
            dispatcher.dispatch(
                {
                    type: "ALBUMCOMMENTS_RECEIVED",
                    album_comments: json
                }
            );
    })
      .catch((error) => {
        console.error(error);
      });
}