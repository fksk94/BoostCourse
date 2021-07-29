const moveToTopButton = document.getElementsByClassName("lnk_top")[0];

moveToTopButton.addEventListener('click', () => {
    window.scrollTo(0,0);
})