import { get_videoID_from_link, get_thumbnail_url, convertDurationToHMS, shuffle } from "./lib.js";

addEventListener("message", function(msg) {
    // if (msg.data.command === "fetchAll") {
    //     fetchAll()
    //     .then((videos) => {
    //         postMessage({videos});
    //     })
    //     .catch((error) => {
    //         postMessage({error});
    //     });
    // }
    // else 
    if (msg.data.command === "fetchStatic") {
        fetch("https://dhruv-dhaduk.github.io/assets/data/sastayoutube.json")
        .then(res => res.json())
        .then((videos) => {
            postMessage({videos});
        })
        .catch((error) => {
            postMessage({error});
        });
    }
});

async function fetchSheetYT()
{   
    const sheetId = "1Epr5BJ-9F1ETI-oddVKh5v2Psl8_1ne1aVFk3SZ53zo";
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = "youtube";
    const query = encodeURIComponent("Select *");
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    const response = await fetch(url);
    const text = await response.text();

    return JSON.parse(text.substring(text.indexOf('(') + 1, text.lastIndexOf(')')));
}

function readSheetYT(sheet)
{
    const links = [];
    const apiKeys = [];

    for (const row of sheet.table.rows) {
        if (row.c[1] != null)
            links.push(row.c[1].v);

        if (row.c[2] != null)
            apiKeys.push(row.c[2].v);
    }

    return {links, apiKeys};
}

async function fetchDataYT(link, API_KEYs)
{
    const ytVideo = get_videoID_from_link(link);
    if (ytVideo === null)
        return null;
    ytVideo.link = link;

    
    let videoResponse;
    for (const API_KEY of API_KEYs) {
        const videoFetchURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${ytVideo.id}&key=${API_KEY}`;
        videoResponse = await fetch(videoFetchURL);
        if (videoResponse.ok) 
            break;
    }
    if (!videoResponse.ok)
        return null;
    const videoJSON = await videoResponse.json();

    if (!videoJSON.items.length)
        return null;

    const channelId = videoJSON.items[0].snippet.channelId;
    
    let channelResponse;
    for (const API_KEY of API_KEYs) {
        const channelFetchURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
        channelResponse = await fetch(channelFetchURL);
        if (channelResponse.ok)
            break;
    }
    if (!channelResponse.ok)
        return null;
    const channelJSON = await channelResponse.json();

    if (!channelJSON.items.length)
        return null;

    return {videoJSON, channelJSON, ytVideo};

}

function readDataYT(yt)
{
    const videoData = {};

    const videoSnippet = yt.videoJSON.items[0].snippet;
    const videoStatistics = yt.videoJSON.items[0].statistics;
    const videoContanetDetails = yt.videoJSON.items[0].contentDetails;

    const channelSnippet = yt.channelJSON.items[0].snippet;
    const channelStatistics = yt.channelJSON.items[0].statistics;

    videoData.apiKey = "";
    videoData.link = yt.ytVideo.link;
    videoData.id = yt.ytVideo.id;
    videoData.type = yt.ytVideo.type;
    videoData.videoTitle = videoSnippet.title;
    videoData.thumbnail = get_thumbnail_url(videoSnippet.thumbnails);
    videoData.duration = convertDurationToHMS(videoContanetDetails.duration);
    videoData.uploadTime = videoSnippet.publishedAt;
    videoData.viewCount = videoStatistics.viewCount;
    videoData.likeCount = videoStatistics.likeCount;
    videoData.channelLink = `https://www.youtube.com/channel/${videoSnippet.channelId}`;
    videoData.channelTitle = videoSnippet.channelTitle;
    videoData.channelIcon = channelSnippet.thumbnails.default.url;
    videoData.subscriberCount = channelStatistics.subscriberCount;
    videoData.status = "done";

    return videoData;
}

export async function fetchAll() {

    return new Promise(async (resolve, reject) => {
        const sheetJSON = await fetchSheetYT();
        const sheet = readSheetYT(sheetJSON);

        shuffle(sheet.apiKeys);

        const promiseList = [];

        for (const link of sheet.links) {
            const ytPromise = fetchDataYT(link, sheet.apiKeys);
            promiseList.push(ytPromise);
        }

        Promise.all(promiseList)
            .then((ytList) => {
                const data = [];
                for (const yt of ytList) {
                    if (yt === null) {
                        data.push({status: "failed"});
                        continue;
                    }
                    const videoData = readDataYT(yt);
                    data.push(videoData);
                }
                resolve(data);
            })
            .catch((err) => {
                console.log(`Error while fetching : ${err}`);
                reject(err);
            });
    });
}