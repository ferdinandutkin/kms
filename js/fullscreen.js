export const fullscreen = target =>
    target?.requestFullscreen() || target?.msRequestFullscreen() || target?.mozRequestFullScreen() || target?.webkitRequestFullscreen();

export const click_fullscreen_handler = ({target}) => fullscreen(target);


