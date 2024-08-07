import { convert_number_format, convert_upload_time_format } from "../lib.js";

export let playingVideoData;

export function play_video(videoData)
{
	if (playingVideoData != undefined)
		playingVideoData.htmlItem.style.display = "block";
	videoData.htmlItem.style.display = "none";
	playingVideoData = videoData;

	const playerParent = document.getElementById("videoplayer-container");
	const videoFeed = document.getElementById("video-feed");
	
	playerParent.innerHTML = "";
	const videoPlayerHTML = "<iframe class=\"videoplayer\" id=\"videoplayer\" src=\"https://www.youtube.com/embed/" + videoData["id"] + "?autoplay=1&mute=1&rel=0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"autoplay; picture-in-picture;\" allowfullscreen></iframe>";
	playerParent.innerHTML = videoPlayerHTML;
	
	videoFeed.style.marginTop = "calc(0.5625 * 100vw + 3rem)";
	document.querySelector("#videoplay-info").style.display = "block";
	
	document.querySelector("#videoplay-title").innerHTML = videoData.videoTitle;
	document.querySelector("#videoplay-views").innerHTML = convert_number_format(videoData.viewCount, "views");
	document.querySelector("#videoplay-uploaded").innerHTML = convert_upload_time_format(videoData.uploadTime);
	document.querySelector("#videoplay-channelIcon").src = videoData.channelIcon;
	document.querySelector("#videoplay-channelTitle").innerHTML = videoData.channelTitle;
	document.querySelector("#videoplay-subscribers").innerHTML = convert_number_format(videoData.subscriberCount, "");
	document.querySelector("#videoplay-likes").innerHTML = convert_number_format(videoData.likeCount, "");

	const old_share = document.querySelector("#shareBtn");
	const new_share = old_share.cloneNode(true);
	old_share.replaceWith(new_share);
	new_share.addEventListener("click", () => {
		navigator.share({
			title: videoData.videoTitle,
			url: videoData.link
		});
	});

	const old_subscribe = document.querySelector("#subscribeBtn");
	const new_subscribe = old_subscribe.cloneNode(true);
	old_subscribe.replaceWith(new_subscribe);
	new_subscribe.addEventListener("click", () => {
		window.open(videoData.channelLink, "_blank");
	});
	
	window.scrollTo(0, 0);
}

export function clear_video()
{
	document.querySelector("#video-feed").style.marginTop = "3rem";
	document.querySelector("#videoplayer-container").innerHTML = "";
	document.querySelector("#videoplay-info").style.display = "none";

	if (playingVideoData != undefined)
		playingVideoData.htmlItem.style.display = "block";

	playingVideoData = undefined;
}