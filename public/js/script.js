/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023B
  Assessment: Assignment 2
  Author: Group 6
  ID: Pham Thanh Mai (s3978365)
       Nguyen Ngoc Hai (s3978281)
       Phan Nguyen Viet Nhan (s3978145)
       Tran Nhat Minh (s3977767)
       Nguyen Duy Anh (s4022628
  Acknowledgement: Bootstrap, FontAwesome , Ion-icon, W3School, Freepik */
window.onload = function(){
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    menu.onclick = () => { navbar.classList.toggle('open');}

 }