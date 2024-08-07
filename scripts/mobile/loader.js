import { convert_number_format, convert_upload_time_format } from "../lib.js";
import { play_video } from "./player.js";
import { refreshVideoList } from "./refresh.js";

export function load_data(data)
{
    for (const r of data) 
    {
        r["apiKey"] = "";
        if (r["status"] != "done"){
            continue;
        }

        if (r["type"] == "video")
            create_html_video_item(r);
        else if (r["type"] == "short")
            create_html_shorts_item(r);
        else
            r["htmlItem"] = "";
    }
    
    document.querySelector("#loading").style.display = "none";

    refreshVideoList(data, true);
}

function create_html_video_item(r)
{
    const middle_dot = " <span class=\"dot\">&#183</span> ";
    
    const videoItem = document.querySelector("#video-item-template").content.querySelector(".video-item").cloneNode(true);
    const thumbnailImg = videoItem.querySelector(".thumbnail-img");
    const duration = videoItem.querySelector(".duration");
    const channelIconContainer = videoItem.querySelector(".channel-icon-container");
    const channelIcon = channelIconContainer.querySelector(".channel-icon");
    const videoItemTexts = videoItem.querySelector(".video-item-texts");
    const videoTitle = videoItemTexts.querySelector(".video-title");
    const videoAdditionalData = videoItemTexts.querySelector(".video-additional-data");
    const threeDotsContainer = videoItem.querySelector(".video-three-dots-container");
    const threeDots = threeDotsContainer.querySelector(".video-three-dots");

    videoItem.addEventListener("click", function() { play_video(r); });
    thumbnailImg.src = r.thumbnail;
    thumbnailImg.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    duration.innerHTML = r.duration;
    channelIconContainer.href = r.channelLink;
    channelIcon.src = r.channelIcon;
    channelIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    channelIcon.addEventListener("click", function(e) { window.open(r.channelLink, "_blank"); });
    videoItemTexts.addEventListener("click", function() { play_video(r); });
    videoTitle.innerHTML = r.videoTitle;
    videoAdditionalData.innerHTML = r.channelTitle + middle_dot + convert_number_format(r.viewCount, "views") + middle_dot + convert_upload_time_format(r.uploadTime);
    threeDotsContainer.href = r.link;
    threeDots.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    threeDots.addEventListener("click", function() { window.open(r.link, "_blank"); });

    r.htmlItem = videoItem;
}

function create_html_shorts_item(r)
{
    const item = document.querySelector("#shorts-item-template").content.querySelector(".shorts-item").cloneNode(true);
    const thumbnail = item.querySelector(".shorts-thumbnail");
    const title = item.querySelector(".shorts-title");
    const views = item.querySelector(".shorts-views");

    item.href = r.link;
    thumbnail.src = r.thumbnail;
    thumbnail.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    title.innerHTML = r.videoTitle;
    views.innerHTML = convert_number_format(r.viewCount, "views");

    r.htmlItem = item;
}

export function create_shorts_feed()
{
    const shortsFeed = document.querySelector("#shorts-feed-template").content.querySelector(".shorts-feed").cloneNode(true);
    const shortsIcon = shortsFeed.querySelector(".shorts-icon");
    const shortsList = shortsFeed.querySelector(".shorts-list");

    shortsFeed.id = "shorts-feed";
    shortsList.id = "shorts-list";
    shortsIcon.addEventListener("contextmenu", function(e) { e.preventDefault(); });

    return [shortsFeed, shortsList];
}