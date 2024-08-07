const shortslist = document.querySelector("#shorts-list");

const shortsleftscroll = document.querySelector("#shorts-leftscroll");
const shortsrightscroll = document.querySelector("#shorts-rightscroll");

shortslist.addEventListener("scroll", check_max_shorts_scroll);
shortsleftscroll.addEventListener("click", shortslist_left_scroll);
shortsrightscroll.addEventListener("click", shortslist_right_scroll);

check_max_shorts_scroll();

function shortslist_left_scroll() {
    if (shortslist.scrollLeft - shortslist.offsetWidth / 2 <= 100)
        shortslist.scrollTo(0, 0);
    else
        shortslist.scrollTo(shortslist.scrollLeft - shortslist.offsetWidth / 2, 0);
}

function shortslist_right_scroll() {    
    const shortslistScrollLeftMax = shortslist.scrollWidth - shortslist.offsetWidth;
    
    if (shortslistScrollLeftMax - shortslist.scrollLeft - shortslist.offsetWidth / 2 <= 100)
        shortslist.scrollTo(shortslistScrollLeftMax, 0);
    else
        shortslist.scrollTo(shortslist.scrollLeft + shortslist.offsetWidth / 2, 0);
}

export function check_max_shorts_scroll() {
    const shortslistScrollLeftMax = shortslist.scrollWidth - shortslist.offsetWidth;

    if (shortslist.scrollLeft === 0) {
        shortsleftscroll.style.opacity = 0;
        shortsrightscroll.style.opacity = 1;
    }
    else if (Math.abs(shortslist.scrollLeft - shortslistScrollLeftMax) <= 5) {
        shortsleftscroll.style.opacity = 1;
        shortsrightscroll.style.opacity = 0;
    }
    else {
        shortsleftscroll.style.opacity = 1;
        shortsrightscroll.style.opacity = 1;
    }
}