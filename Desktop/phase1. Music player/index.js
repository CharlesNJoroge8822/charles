// Declare variables that we'll call later to manipulate
const playlistItems = document.querySelectorAll('.playlist li');  //array of all list items within the playlist element
const audioPlayer = document.getElementById('audio-player');    //reference to to the player btn
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlistList = document.getElementById('playlist-list');
const addSongInput = document.getElementById('add-song-input');  //ref to input field for adding songs
const addSongBtn = document.getElementById('add-song-btn');

fetch ('http://localhost:3001/musicPlayer')
//This code snippet defines several functions to manage my music player functionality
let currentTrackIndex = 0; //keeps track of the currently playing songfrom index zero..
let playlist = []; //empty array that will hold info about the songin my playlist
function loadTrack(index) {
    const track = playlist[index];
    const audioSrc = track.src;
    audioPlayer.src = audioSrc;
    audioPlayer.load();
    updatePlaylistUI();

}
// function toggles the the playback state of the audio
function playPause() {
    //conditional statement to evaluate the play/pause
    if (audioPlayer.paused) {
        audioPlayer.play();
        // if the audio is paused, its starts playing and updates btn to 'pause'
        playPauseBtn.textContent = 'Pause';
    } else {
        // viseversa happens here!
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
}
// function handles going to previous song
function prevTrack() { 
    // use modulus tio ensure the currentTruck stays within the playlist boundaries
    // It decrements the currentTrackIndex by 1 and adds the playlist length to handle wrapping around to the last song if the index reaches -1.
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    //loadtrcjk loads the prev song
    loadTrack(currentTrackIndex);
}
// same happens to the next button
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
}
// updates the vol of audio based on the value of the volumSlider
function updateVolume() {
    audioPlayer.volume = volumeSlider.value;
}
// 
// 
// dynamically update the playlist based on the playlist array
function updatePlaylistUI() {
    //empties the playlists element, removing any existing existing list items
    playlistList.innerHTML = '';
    //iterate through each track in the playlist array, passing the track and its index as argument to be call back function
    playlist.forEach((track, index) => {
        //creates a new list item element that will conmtain the songs
        const li = document.createElement('li');
        //set the text content of the liost items into the song
        li.textContent = track.title;
        // the html string adds two buttons del. fav

         // favorite is dynamically set as isFavorite property and set the icon like stars
        li.innerHTML += `
            <button class="delete-btn">Delete</button>
        
            <button class="favorite-btn">${track.isFavorite ? 'Added to favorite' : '☆'}</button> 
        `;
        // add event listeners
        //  adds a click event listener to the list item. When clicked, it sets the currentTrackIndex to the index of the clicked song and loads the track.
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
        // adds a click event listener to the "Delete" button. When clicked, it calls the deleteSong function to remove the song from the playlist.
        li.querySelector('.delete-btn').addEventListener('click', () => {
            deleteSong(index);
        });
        // adds a click event listener to the "Favorite" button. When clicked, it calls the toggleFavorite
        li.querySelector('.favorite-btn').addEventListener('click', () => {
            toggleFavorite(index); 
        });
        // appends the newly created list items to the playlist
        playlistList.appendChild(li);
    });
}

//other functions 
// addsong handles a new song to the playlist baseed on the user input
function addSong() {
    const songUrl = addSongInput.value;
    if (songUrl) {
        const newTrack = {
            title: songUrl.split('/').pop().split('.')[0],
            src: songUrl,
            isFavorite: false  
        };
        playlist.push(newTrack);
        updatePlaylistUI();
    }
    alert('Song successfully added')


    // tried preventing page reload here!
    document.getElementById ('songUrl').addEventListener('addSong', 
        function(event){
            event.preventDefault();
            function addSong() {
                const songUrl = addSongInput.value;
                if (songUrl) {
                    const newTrack = {
                        title: songUrl.split('/').pop().split('.')[0],
                        src: songUrl,
                        isFavorite: false
                    };
                    playlist.push(newTrack);
                    updatePlaylistUI();
                }
            }
            
        }
    )
}

// deleteSong(index) remove a song from at the specified index
function deleteSong(index) {
    playlist.splice(index, 1);
    updatePlaylistUI();
    // evaluate it with the conditional statement
    if (currentTrackIndex >= playlist.length) {
        //if condtion is true set the currenttrack to the last valid index in the playlist which is one less than the length of the playlist
        currentTrackIndex = playlist.length - 1;
        if (currentTrackIndex >= 0) {
            loadTrack(currentTrackIndex);
        }
    }
    alert('Song deleted successfully')
}

// toggles the isFavorite property of a song at the specified index
function toggleFavorite(index) {
    playlist[index].isFavorite = !playlist[index].isFavorite;
    updatePlaylistUI();
}

// custom playlist 
// Initialize the playlist with the initial tracks
playlist = [
    { title: 'All This Time',
        src: 'All This Time(MP3_160K).mp3', 
            isFavorite: false },
    { title: 'It Is What It Is', 
        src: 'It Is What It Is(MP3_160K)_private.lrc', 
            isFavorite: false },
    { title: 'Brave', 
        src: 'Tawgs Salter - Brave(MP3_128K).mp3', 
            isFavorite: false },
    {title: 'Hamari', 
        src: 'https://youtu.be/mHgrupbnwoc?si=QaOovgXawIIWRe8R', 
            isFavorite: false},
            {title: 'Lecade', 
                src: 'LECADE - Glass (Official Music Video)(MP3_160K).mp3'
            },
            {title: 'One Republic',
                src: 'OneRepublic - Come Home (feat. Sara Bareilles)(MP3_160K).mp3'
            },
        
        {title: 'Hamari Adhuri',
            src: 'https://youtu.be/mHgrupbnwoc?si=C-i0gXNdTIlUKwsX'
        }
];

// update the song playlist list
updatePlaylistUI();
// load calls currentrackindex to load the i nitial track
loadTrack(currentTrackIndex);

// toggle playback when the play/pause button is clicked
playPauseBtn.addEventListener('click', playPause);
// plays the prev song the clicked
prevBtn.addEventListener('click', prevTrack);
// play next somg when next is clicked
nextBtn.addEventListener('click', nextTrack);
// update the volumewhen the vol is changed
volumeSlider.addEventListener('input', updateVolume);
// adds newsong to the playlist when the addsong is clicked
addSongBtn.addEventListener('click', addSong);




