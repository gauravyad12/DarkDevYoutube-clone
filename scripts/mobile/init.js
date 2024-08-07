import { refreshVideoList } from "./refresh.js";
import { clear_video } from "./player.js";
import { data } from "./data.js";

export function init()
{
    const loading = document.querySelector("#loading");
    const loadingItem = document.querySelector("#loading-item-template").content.querySelector(".loading-item");
    const loadingItemSize = 4;
    for (let i = 0; i < loadingItemSize; i++)
        loading.append(loadingItem.cloneNode(true));

    document.querySelector("#yt").addEventListener("click", () => {
        clear_video();
        refreshVideoList(data, false);
    });

    document.querySelector("#clear-video").addEventListener("click", () => {
        clear_video();
        refreshVideoList(data, false);
    });
    
    document.querySelector("#refresh").addEventListener("click", () => { window.location.reload(); });
    
    document.querySelector("#shuffle").addEventListener("click", () => { refreshVideoList(data, true); });
    
    document.querySelector("#backtotop").addEventListener("click", () => { window.scrollTo(0, 0); });

}