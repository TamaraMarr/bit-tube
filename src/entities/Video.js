

export default class Video{
    constructor(video){
        this.id = video.id.videoId;
        this.title = video.snippet.title;
        this.description = video.snippet.description;
    }
}