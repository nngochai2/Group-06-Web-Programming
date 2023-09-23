
window.onload = function(){ 
    let sideBar = document.querySelector('.side-bar')
    document.querySelector('#user-btn').onclick = () => {sideBar.classList.toggle('open')}
    document.querySelector('#close-side-bar').onclick= () => {sideBar.classList.remove('open')}
};