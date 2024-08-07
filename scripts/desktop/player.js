import { convert_number_format, convert_upload_time_format } from "../lib.js";

export let playingVideoData;

export function play_video(videoData)
{
    if (playingVideoData != undefined)
        playingVideoData.htmlItem.style.display = "block";
    videoData.htmlItem.style.display = "none";
    playingVideoData = videoData;

    const iframeContainer = document.querySelector("#iframe-container");
    const videoFeed = document.querySelector("#video-feed");
    const videoPlayer = document.querySelector("#video-player");

    iframeContainer.innerHTML = "";
    const videoIframeHTML = "<iframe class=\"iframe\" id=\"iframe\" src=\"https://www.youtube.com/embed/" + videoData["id"] + "?autoplay=1&mute=1&rel=0\" frameborder=\"0\" allow=\"autoplay; picture-in-picture;\" allowfullscreen></iframe>"
    iframeContainer.innerHTML = videoIframeHTML;

    videoPlayer.style.display = "block";
    videoFeed.style.flexBasis = "22rem";

    document.querySelector("#video-player-title").innerHTML = videoData.videoTitle;
    document.querySelector("#video-player-views").innerHTML = convert_number_format(videoData.viewCount, "views");
    document.querySelector("#video-player-uploaded").innerHTML = convert_upload_time_format(videoData.uploadTime);
    document.querySelector("#video-player-channel-icon").src = videoData.channelIcon;
    document.querySelector("#video-player-channel-title").innerHTML = videoData.channelTitle;
    document.querySelector("#video-player-channel-subs").innerHTML = convert_number_format(videoData.subscriberCount, "subscribers");
    document.querySelector("#video-player-likes").innerHTML = convert_number_format(videoData.likeCount, "");

    document.querySelector("#closevideo").style.display = "flex";
    document.querySelector("#shorts-feed").style.display = "none";

    window.scrollTo(0, 0);
}

export function clear_video()
{
    
    document.querySelector("#video-feed").style.flexBasis = "";
    document.querySelector("#iframe-container").innerHTML = "";
    document.querySelector("#video-player").style.display = "none";
    document.querySelector("#closevideo").style.display = "none";
    document.querySelector("#shorts-feed").style.display = "block";

    if (playingVideoData != undefined)
        playingVideoData.htmlItem.style.display = "block";

    playingVideoData = undefined;
}