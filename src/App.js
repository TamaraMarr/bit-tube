import React, { Component } from 'react';
import { fetchYTData } from './services/fetchService';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			searchedVideo: "",
			videos: [],
			selectedVideo: {},
			videoHistory: [],
			isThereHistory: false
		};

		this.bindInit();
	}

	bindInit() {
		this.handleEnter = this.handleEnter.bind(this);
	}

	handleChange = (event) => {
		this.setState({ searchedVideo: event.target.value });
	}

	searchVideo() {
		if (this.state.isThereHistory) {
			this.setState({
				videoHistory: [this.state.selectedVideo, ...this.state.videoHistory]
			})
		}

		fetchYTData.loadData(this.state.searchedVideo, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0],
				isThereHistory: true
			});
		});
	}

	handleEnter(event) {
		if (event.key === 'Enter') {
			this.searchVideo();
		}
	}

	render() {
		if (!this.state.videos.length) {
			return (
				<div className="container">
					<div className="row">
						<input value={this.state.searchedVideo} onKeyPress={this.handleEnter} onChange={this.handleChange} className="col-9" />
						<button onClick={() => this.searchVideo()} className="col-2">Search</button>
						<iframe width="560" height="315" src="https://www.youtube.com/embed/7hz5biZEejI" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen className="col-11"></iframe>
					</div>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="row header">
							<input value={this.state.searchedVideo} onChange={this.handleChange} onKeyPress={this.handleEnter} className="col-9" />
							<button onClick={() => this.searchVideo()} className="col-2">Search
							</button >
						</div>
					</div>
					<div className="col-8">
						<div className="row">
							<iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${this.state.selectedVideo.id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
							<h4 className="col-12">{this.state.selectedVideo.title}</h4>
							<p className="col-12">{this.state.selectedVideo.description}</p>

							{this.state.isThereHistory ? this.state.videoHistory.map((video) => {
								return <iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${video.id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
							}) : ""}
						</div>
					</div>
					<div className="col-4">
						<div className="row">
							<iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${this.state.videos[1].id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
							<iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${this.state.videos[2].id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
							<iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${this.state.videos[3].id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
							<iframe className="col-12" width="560" height="315" src={`https://www.youtube.com/embed/${this.state.videos[4].id}`} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default App;