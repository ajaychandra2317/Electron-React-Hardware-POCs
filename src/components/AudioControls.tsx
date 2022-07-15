import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {
    url: string;
}

class AudioControls extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            play: false,
        };
        this.setVolume = this.setVolume.bind(this);
    }
    audio = new Audio(this.props.url);

    componentDidMount() {
        this.audio.addEventListener("ended", () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener("ended", () =>
            this.setState({ play: false })
        );
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    };

    setVolume = (volume: number): any => {
        this.audio.volume = volume;
    };

    switch = () => {
        // ipcRenderer.send('switch', 'https://www.google.com');
    }

    getInitialState = () => {
        return {value: 0.5};
    }
     
    handleChange = (event: any) => {
        this.setVolume(event.target.value);
    }

    render() {
        return (
            <div style={{  }}  className="App">
                <Link to="/" className="btn btn-primary homeButton">{`< `}HOME</Link>
                <h3 className="pageHeader" style={{color: '#990099'}}>Audio Output</h3>
                <button onClick={this.togglePlay}
                    style={{fontWeight: '500', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#009900', color: 'white', height: '38px', outline: 'none',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0px 20px',
                    cursor: 'pointer',
                  }}
                >
                    {this.state.play ? "Pause" : "Play"}
                </button>
                {/* <button onClick={() => this.setVolume(1)}>Volume 100</button>
                <button onClick={() => this.setVolume(0.75)}>Volume 75</button>
                <button onClick={() => this.setVolume(0.5)}>Volume 50</button>
                <button onClick={() => this.setVolume(0.25)}>Volume 25</button>
                <button onClick={() => this.setVolume(0)}>Volume 0</button> */}
                <div>
                <input 
                    id="typeinp" 
                    type="range" 
                    min="0" max="1" 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    step="0.1"

                    style={{
                        marginTop: '40px',
                        width: '312px',
                        height: '20px',
                    }}
                />
                </div>
                {/* <div>
                    Switch Application
                    <button onClick={this.switch}>
                        Click to switch
                    </button>
                </div> */}
            </div>
        );
    }
}

export default AudioControls;
