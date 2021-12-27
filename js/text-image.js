const spans = [... document.querySelectorAll("span.hover-img")];

const click_handler = e => {
    console.log("ff")
    const target = e.target;

    const others = spans.filter(span => !(span === target));

    target.classList.toggle("click");

    others.forEach(span => span.classList.remove("click"))
}

spans.forEach(el => el.addEventListener("click", click_handler))