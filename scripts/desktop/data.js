import { load_data } from "./loader.js";

export let data;

export function start_fetching()
{
    const fetchWorker = new Worker("./scripts/fetch_worker.js", {type: "module"});
    fetchWorker.addEventListener("message", function(msg) {
        if (msg.data.error) {
            const err = `Error while fetching data : ${msg.data.error}`;
            console.log(err);
            alert(err);
        }
        else {
            data = msg.data.videos;
            console.log(data);
            load_data(data);
        }
        fetchWorker.terminate();
    });
    fetchWorker.postMessage({command: "fetchStatic"});
}