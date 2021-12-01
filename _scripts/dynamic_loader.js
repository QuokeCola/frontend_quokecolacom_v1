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
        }, 250);
    }

    this.loadcontent = function (url) {
        dynamic_loader.style.transition = "all 0.25s cubic-bezier(.74,.07,.85,.44)";
        dynamic_loader.style.opacity = "0.0";
        // dynamic_loader.style.scale   = "1.5";
        dynamic_loader.style.transform = "perspective(500px) translateZ(42px)";
        dynamic_loader.style.filter = "blur(10px)";
        dynamic_loader_anime.style.display = "block";
        setTimeout(function () {
            dynamic_loader.src = url;
            dynamic_loader.style.transition = "all 0.0s";
            dynamic_loader.style.transform = "perspective(500px) translateZ(-42px)";
            // dynamic_loader.style.scale   = "0.8";
            dynamic_loader_anime.style.opacity = "1.0";
        },250);
        dynamic_loader.onload = function(){
            dynamic_loader.style.filter = "blur(0)";
            dynamic_loader_anime.style.opacity = "0.0";
            dynamic_loader.style.transition = "all 0.25s cubic-bezier(.16,.75,.29,.93)";
            dynamic_loader.contentWindow.addEventListener('scroll', NavigationBar.scroll);
            dynamic_loader.style.opacity = "1.0";
            // dynamic_loader.style.scale   = "1.0";
            dynamic_loader.style.transform = "perspective(500px) translateZ(0px)";
            setTimeout(function () {
                dynamic_loader_anime.style.display="none";
            }, 250);
        };
    }
}