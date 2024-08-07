import { isMobileDevice } from "../device.js";
import { init } from "./init.js";
import { start_fetching } from "./data.js";

if (isMobileDevice())
    window.location.href = "youtubeM.html";

start_fetching();

document.addEventListener("DOMContentLoaded", () => { init(); });