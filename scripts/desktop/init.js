import { refreshVideoList } from "./refresh.js";
import { playingVideoData, clear_video } from "./player.js";
import { data } from "./data.js";

export function init()
{
    const loading = document.querySelector("#loading");
    const loadingItem = document.querySelector("#loading-item-template").content.querySelector(".loading-item");
    const loadingItemCount = 12;
    for (let i = 0; i < loadingItemCount; i++)
        loading.append(loadingItem.cloneNode(true));
    
    document.querySelector("#yt").addEventListener("click", () => { refreshVideoList(data, false); });

    document.querySelector("#closevideo").addEventListener("click", () => { clear_video(); });
    
    document.querySelector("#refresh").addEventListener("click", () => { window.location.reload(); });
    
    document.querySelector("#shuffle").addEventListener("click", () => { refreshVideoList(data, true); });
    
    document.querySelector("#backtotop").addEventListener("click", () => { window.scrollTo(0, 0); });
    
    
    window.addEventListener("resize", () => {
        if (playingVideoData !== undefined)
            window.scrollTo(0, 0);
    });
    
}