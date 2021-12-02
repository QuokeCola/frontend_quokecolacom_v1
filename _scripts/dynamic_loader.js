// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/navi_bar.js'></script>");
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function dynamic_loader() {
    let dynamic_loader = document.getElementById("DynamicLoader");
    let dynamic_loader_anime = document.getElementById("DynamicLoaderLoading");
    let navi_background_obj = document.getElementById("navi_background_obj");
    let mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");

    this.initiate = function () {
        dynamic_loader.style.width = "100%";
        dynamic_loader.style.opacity = "1.0";
        dynamic_loader_anime.style.opacity = "0.0";
        setTimeout(function () {
            dynamic_loader_anime.style.display = "none";
        }, 250);
    }

    this.loadcontent = function (url, webpage_expand_property) {
        dynamic_loader.style.transition = "all 0.25s cubic-bezier(.74,.07,.85,.44)";
        dynamic_loader.style.opacity = "0.0";
        dynamic_loader.style.transform = "perspective(500px) translateZ(78px)";
        if(getLayoutID()===2) {
            navi_background_obj.style.transform = "perspective(500px) translateZ(84px)";
        } else {
            navi_background_obj.style.transform = "perspective(0) translateZ(84px)";
        }
        dynamic_loader.style.filter = "blur(10px)";
        dynamic_loader_anime.style.display = "block";
        NavigationBar.set_expanded(true);
        setTimeout(function () {
            dynamic_loader.src = url;
            dynamic_loader_anime.style.opacity = "1.0";
        },250);
        dynamic_loader.onload = function(){
            setTimeout(function () {
                dynamic_loader.style.filter = "blur(0)";
                dynamic_loader_anime.style.opacity = "0.0";
                dynamic_loader.style.transition = "all 0.25s cubic-bezier(.16,.75,.29,.93)";
                dynamic_loader.contentWindow.addEventListener('scroll', NavigationBar.scroll);
                dynamic_loader.style.opacity = "1.0";
                dynamic_loader.style.transform = "perspective(500px) translateZ(0px)";
                if(getLayoutID()===2) {
                    navi_background_obj.style.transform = "perspective(500px) translateZ(0px)";
                    NavigationBar.set_expanded(webpage_expand_property);
                    NavigationBar.set_transparent(webpage_expand_property);
                } else {
                    navi_background_obj.style.transform = "perspective(0) translateZ(0)";
                    if(mobile_menu_state.checked) {
                        NavigationBar.set_expanded(true);
                        NavigationBar.set_transparent(false);
                    } else {
                        NavigationBar.set_transparent(webpage_expand_property);
                        NavigationBar.set_expanded(webpage_expand_property);
                    }
                }
                NavigationBar.set_enable_expanded(webpage_expand_property);
                dynamic_loader_anime.style.display="none";
            },250);
        };
    }
}