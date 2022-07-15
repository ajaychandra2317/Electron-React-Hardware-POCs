import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MicControls extends Component<any, any> {

    streaming: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            averageHeight: 20,
            micDevices: [],
            selectedDeviceId: '',
            streams: null        }
        this.selectMic = this.selectMic.bind(this);
        this.getMicDevices = this.getMicDevices.bind(this);
    }

    startMicWithBar = () => {
        // navigator.mediaDevices.getTracks().forEach(track => track.stop())
        if (this.streaming) {
            // this.streaming.stop();
        }
        console.log(this.state.selectedDeviceId)
        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: this.state.selectedDeviceId,
                autoGainControl: true,
                echoCancellation: true,
                noiseSuppression: true,
            },
            video: false
        })
        .then( (stream) => {
            // re-add the stop function
            // if(this.streaming && this.streaming.getTracks()) {
            //     // stream.getTracks().stop = function(){         
            //     this.streaming.getTracks().forEach(function (track: any) {
            //         track.stop();
            //     // });
            //     })
            // }
            // this.streaming = stream;
            console.log(stream.getTracks())
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);
            console.log(scriptProcessor.onaudioprocess)
            this.streaming = scriptProcessor.onaudioprocess = function () {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                const arraySum = array.reduce((a, value) => a + value, 0);
                const average = arraySum / array.length;
                console.log(Math.round(average));
                let pointer = document.getElementById('bar');
                if (pointer) {
                    if (Math.round(average) === 0) {
                        pointer.style.width = `5px`;
                    } else {
                        pointer.style.width = `${Math.round(average)*8}px`;
                    }
                }
            };
        })
        .catch(function (err) {
            /* handle the error */
            console.error(err);
        });
    }

    getMicDevices = () => {
        let mics: any = [];
        navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            devices.forEach(function(device) {
                // console.log(device)
                if (device.kind === 'audioinput') {
                    mics.push(device);
                }
            });
            this.setState({
                micDevices: Array.from(
                    new Set(mics.map((a: any) => a.groupId))
                    ).map(id => {
                    return mics.find((a: any) => a.groupId === id)
                })
            }, () => {
                console.log(this.state.micDevices);
            });
        }).catch(function(err) {
            console.log(err.name + ": " + err.message);
        });
    }

    selectMic = (mic: any): any => {
        console.log(mic.deviceId)
        this.setState({
            selectedDeviceId: mic.deviceId
        }, () => {
            this.startMicWithBar();
        });
    }

    stopStream = () => {
        window.location.reload();
        // console.log(this.streaming);
        // console.log(this.streaming = null)
        // console.log(this.streaming.removeTrack(this.streaming.getAudioTracks()[0]));
        // console.log(this.streaming.getAudioTracks());
        // console.log(this.streaming.getTracks());
    }

    render() {
        return (
            <div style={{}}  className="App">
                <Link to="/" className="btn btn-primary homeButton">{`< `}HOME</Link>
                <h3 className="pageHeader" style={{color: '#0066ff'}}>
                    Microphone Output
                </h3>
                <div>
                    <button onClick={this.getMicDevices}
                    style={{fontWeight: '500', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#009900', color: 'white', height: '38px', outline: 'none',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0px 20px',
                    cursor: 'pointer',

                  }}>
                        Get Mic Devices
                    </button>
                    <button onClick={this.stopStream}
                        style={{fontWeight: '500', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#009900', color: 'white', height: '38px', outline: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0px 20px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                    >Reload</button>
                    <div>
                        {
                            this.state.micDevices.map((mic: any) => 
                                <button key={mic.label} onClick={() => this.selectMic(mic)}
                                style={{fontWeight: '500', fontFamily: 'cursive', fontSize: '20px', backgroundColor: '#009900', color: 'white', height: '38px', outline: 'none',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0px 20px',
                                cursor: 'pointer',
                                marginTop: '20px',
                                marginRight: '10px'
                              }}
                                >{mic.label}</button>
                            )
                        }
                    </div>
                </div>
                <div style={{marginBottom: '50px', marginLeft: '10%', width: '80%'}}>
                    {/* <button onClick={this.startMicWithBar}>Start</button> */}
                    {/* <button onClick={this.startAllMicWithBar}>Start All Mics</button> */}
                    
                    <div className='bar' id='bar' style={{ backgroundColor: '#0066ff', width: '20px', height: '12px',
                    borderRadius: '10px', marginTop: '35px'
                }}>
                    </div>
                </div>
            </div>
        )
    }
}

export default MicControls;
