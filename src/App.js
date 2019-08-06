import React, { Component } from "react";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beats: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }
  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
  };
  startstop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          playing: true
        },
        this.playClick
      );
    }
  };
  playClick = () => {
    const { count, beats } = this.state;
    if (count % beats == 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };
  render() {
    const { bpm, playing } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm}</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startstop}>{playing ? "Stop" : "Start"}</button>
      </div>
    );
  }
}
