import React from "react";

import Search from "./components/Search";
import { fetchYTData } from "./services/fetchService";
import Video from "./components/Video";

import "./App.css";

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			searchedVideo: "",
			videoHistory: [],
			isThereHistory: false,
			videos: [],
			selectedVideo: {},
			noResultsError: false
		}

		this.bindInit();
	}

	bindInit() {
		this.searchVideo = this.searchVideo.bind(this);
	}

    searchVideo(searchedVideo) {
		this.setState({
			searchedVideo,
			noResultsError: false
		});

		if (this.state.isThereHistory) {
			this.setState({
				videoHistory: [this.state.selectedVideo, ...this.state.videoHistory]
			})
		}

		fetchYTData.loadData(searchedVideo, (videos) => {
			if (videos[0]) {
				this.setState({
					videos,
					selectedVideo: videos[0]
				});
			} else {
				this.setState({
					noResultsError: true
				})
			}
		});

		if (this.state.videos.length !== 0) {
			this.setState({
				isThereHistory: true
			})
		}
	}

	render() {
		if (this.state.videos.length === 0) {
			return (
				<div className="container-fluid">
					<div className="row">
						<Search sendSearchedVideo={this.searchVideo} />
						<div className="offset-3 col-6">
							<Video chosenVideo="zDZFcDGpL4U" width="665" height="415" />
						</div>
					</div>
				</div>
			);
		}
		
		return (
			<div className="container-fluid">
				<div className="row">
						<Search sendSearchedVideo={this.searchVideo} width="665" height="415" />
						{this.state.noResultsError
							? <p className="col-12" style={{ textAlign: "center", fontStyle: "italic" }}>No results for the given term</p>
							: <div className="row">
								<div className="col-8">
								<div className="row">
									<Video className="offset-1 col-10" chosenVideo={this.state.selectedVideo.id} width="665" height="415" />
									<h4 className="col-12 App_videoHeader">{this.state.selectedVideo.title}</h4>
									<p>{this.state.selectedVideo.description}</p>
										
									<h4 className="col-12 App_videoHeader">Viewing History</h4>
									{this.state.isThereHistory
										? this.state.videoHistory.map((video) => {
											return <Video chosenVideo={video.id} width="565" height="315" />
											})
										: <p className="offset-3 col-6">No videos in viewing history</p>}
									</div>
								</div>
								<div className="col-4">
									<Video chosenVideo={this.state.videos[1].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[2].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[3].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[4].id} width="350" height="215" />
								</div>
							  </div>
						}
				</div>
			</div>
		);
	}
}
