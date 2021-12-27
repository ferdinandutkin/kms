import {click_fullscreen_handler, fullscreen} from "./fullscreen.js";

const images = [... document.querySelectorAll("#gallery > img")];

const full_img = document.getElementById("full-img");

const expand = target => {
    const {src} = target;

    target.classList.toggle("clicked");

    const others = images.filter(image => !(image === target));

    others.forEach(other => other.classList.remove("clicked"))

    console.log(target)
    console.log(src)
    full_img.src = src;
}

const expand_handler = e => {
    const {target} = e;
    expand(target);
}

const double_click_handler = e => {
    const {target} = e;
    expand(target);
    fullscreen(full_img);
}

images.forEach(el => {
        el.addEventListener("click", expand_handler)
        el.addEventListener("dblclick", double_click_handler);
}
)

document.getElementById("full-img").addEventListener("click", click_fullscreen_handler)

const first = document.querySelector("#gallery > img:first-child");
expand(first);