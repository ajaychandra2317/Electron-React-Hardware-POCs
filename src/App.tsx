import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.scss';

function App() {

  let navigate = useNavigate();

  // Upload to local seaweedFS instance
  const uploadImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
  };

  function openModule(path: string): any {
    navigate(`/${path}`);
  }

  return (
    <div className="App" style={{}}>
      <h2 style={{color: '#009900', fontFamily: 'cursive', fontSize: '42px'}}>
        HARDWARE POC's
      </h2>
      <h3 style={{color: '#009900', fontFamily: 'cursive', fontSize: '32px', marginTop: '-24px'}}>using web API's</h3>
      <div>
        <button onClick={() => openModule('picture')}
        style={{fontWeight: 'bold', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#e60000', color: 'white', height: '48px', outline: 'none',
          border: 'none',
          borderRadius: '10px',
          padding: '0px 20px',
          cursor: 'pointer',
          marginRight: '15px'
        }}
        >CLICK PICTURES</button>
        <button onClick={() => openModule('video')}
        style={{fontWeight: 'bold', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#ffcc00', color: 'white', height: '48px', outline: 'none',
        border: 'none',
        borderRadius: '10px',
        padding: '0px 20px',
        cursor: 'pointer',
        marginRight: '15px'
      }}
        >RECORD VIDEOS</button>
        <button onClick={() => openModule('audio')}
        style={{fontWeight: 'bold', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#990099', color: 'white', height: '48px', outline: 'none',
        border: 'none',
        borderRadius: '10px',
        padding: '0px 20px',
        cursor: 'pointer',
        marginRight: '15px'
      }}
        >AUDIO OUTPUT</button>
        <button onClick={() => openModule('mic')}
        style={{fontWeight: 'bold', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#0066ff', color: 'white', height: '48px', outline: 'none',
        border: 'none',
        borderRadius: '10px',
        padding: '0px 20px',
        cursor: 'pointer',
      }}
        >MICROPHONE OUTPUT</button>
      </div>
      {/* <div>
        {process.env.REACT_APP_ENV_TYPE}
        {process.env.REACT_APP_API_END_POINT}
      </div> */}
      {/* <StillPicture sendFile={uploadImage}></StillPicture>
      <TakeVideo></TakeVideo> */}
      {/* <AudioControls url='src/components/HeatWaves.mp3'></AudioControls> */}
      {/* <AudioControls url='http://streaming.tdiradio.com:8000/house.mp3'></AudioControls>
      <MicControls></MicControls>
      <TestIframe></TestIframe> */}
    </div>
  );
}

export default App;
