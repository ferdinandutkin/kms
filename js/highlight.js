const find_current_page_menu_item = () => {

    const extract_last_segment = path => path.split("/").pop();

    const links = document.querySelectorAll("#menu-options>li>a")

    const current_page = extract_last_segment(window.location.pathname);

    return [...links].find(el => extract_last_segment(el.href) === current_page)
}

const highlight = found =>
    found.style.textDecoration = 'underline';


highlight(find_current_page_menu_item())