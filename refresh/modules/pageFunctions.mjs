export { navBar };

function navBar() {
  let sideBar = document.getElementsByClassName("sideBar")[0];
  sideBar.classList.toggle("open");
}
