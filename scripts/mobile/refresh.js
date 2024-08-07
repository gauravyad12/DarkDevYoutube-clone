import { shuffle } from "../lib.js";
import { create_shorts_feed } from "./loader.js";

let videoslistITV, shortslistITV;

export function refreshVideoList(data, doShuffle)
{
    if (doShuffle)
        shuffle(data);

    const videoslist = document.querySelector("#video-list");
    videoslist.innerHTML = "";

    const shortsfeedList = create_shorts_feed();
    const shortsfeed = shortsfeedList[0];
    const shortslist = shortsfeedList[1];
    
    clearInterval(videoslistITV);
    clearInterval(shortslistITV);
    
    let videosCt = 0;
    videoslistITV = setInterval(() => {
        if (videoslist.childElementCount == 1)
            videoslist.append(shortsfeed);

        while ((videosCt < data.length) && (data[videosCt].status != "done" || data[videosCt].type != "video"))
        videosCt++;
    
        if (videosCt >= data.length) {
            clearInterval(videoslistITV);
        }
        else {
            videoslist.append(data[videosCt].htmlItem);
            videosCt++;
        }
    }, 100);

    let shortsCt = 0;
    shortslistITV = setInterval(() => {
        while ((shortsCt < data.length) && (data[shortsCt].status != "done" || data[shortsCt].type != "short"))
            shortsCt++;

        if (shortsCt >= data.length) {
            clearInterval(shortslistITV);
        }
        else {
            shortslist.append(data[shortsCt].htmlItem);
            shortsCt++;
        }

    }, 100);

}