// JavaScript Document
// Author: Chen Qian

function dynamic_loader() {
    let dynamic_loader = document.getElementById("DynamicLoader");
    let dynamic_loader_anime = document.getElementById("DynamicLoaderLoading");

    this.initiate = function () {
        dynamic_loader.style.width = "100%";
        dynamic_loader.style.opacity = "1.0";
        dynamic_loader_anime.style.opacity = "0.0";
        setTimeout(function () {
            dynamic_loader_anime.style.display = "none";
        })
    }

    this.loadcontent = function (url) {
        dynamic_loader.style.transition = "all 0.5s ease-in";
        dynamic_loader.style.opacity = "0.0";
        dynamic_loader.style.marginLeft = "200px";
        dynamic_loader_anime.style.display = "block";
        console.log("opacity_set!")
        setTimeout(function () {
            dynamic_loader.src = url;
            dynamic_loader.style.transition = "all 0.0s";
            dynamic_loader.style.marginLeft = "-200px";
            dynamic_loader_anime.style.opacity = "1.0";
        },500);
        dynamic_loader.onload = function(){
            dynamic_loader_anime.style.opacity = "0.0";
            dynamic_loader.style.transition = "all 0.5s ease-out";
            dynamic_loader.contentWindow.addEventListener('scroll', NavigationBar.scroll);
            dynamic_loader.style.opacity = "1.0";
            dynamic_loader.style.marginLeft = "0px";
        };
    }
}