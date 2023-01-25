customizable-react-audio-player allows you to change styles and colors to your app with ease.

# Installation

```
npm install --save customizable-react-audio-player 
```
# Note
please install material icons if you haven't installed already!

```
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```
# Features

1. you can add your desirable background color to react audio player . 
2. you can select any color for icons . 
3. you can change border radius accordingly .
4. responsive and ready to use react audio player .

# The Gist

```
  import React from 'react';
  import ReactAudioPlayer from 'customizable-react-audio-player'
  import 'customizable-react-audio-player/lib/ReactAudioPlayer.module.css';
  
  function App(){

    return (
      <div>
            <ReactAudioPlayer
                audioSource="my_audio_file.ogg"
                bgColor="green"
                textColor="red"
                border="rounded"
            />
      </div>
    );
  }

```