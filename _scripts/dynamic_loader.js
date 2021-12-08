// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/navi_bar.js'></script>");
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function dynamic_loader() {
    let dynamic_loader = document.getElementById("DynamicLoader");
    let dynamic_loader_anime = document.getElementById("DynamicLoaderLoading");
    let navi_background_obj = document.getElementById("navi_background_obj");
    let mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");

    let floating_func_in    = 'cubic-bezier(.88,.00,.39,1)';
    let floating_func_out 	= 'cubic-bezier(.27,.6,0,.99)';

    this.initiate = function () {
        dynamic_loader.style.width = "100%";
        dynamic_loader.style.opacity = "1.0";
        dynamic_loader_anime.style.opacity = "0.0";
        setTimeout(function () {
            dynamic_loader_anime.style.display = "none";
        }, 250);
    }

    this.loadcontent = function (url, webpage_expand_property) {
        dynamic_loader.style.transitionTimingFunction = floating_func_in;
        dynamic_loader.style.opacity = "0.0";
        dynamic_loader.style.transform = "perspective(500px) translateZ(42px)";
        if(getLayoutID()===2) {
            navi_background_obj.style.transform = "perspective(500px) translateZ(84px)";
            navi_background_obj.style.transitionTimingFunction = floating_func_in;
            NavigationBar.set_transparent(true);
        } else {
            navi_background_obj.style.transform = "perspective(auto) translateZ(84px)";
        }
        dynamic_loader.style.filter = "blur(10px)";
        dynamic_loader_anime.style.display = "block";
        NavigationBar.set_expanded(true);
        setTimeout(function () {
            dynamic_loader.src = url;
            dynamic_loader_anime.style.opacity = "1.0";
        },400);
        dynamic_loader.onload = function(){
            setTimeout(function () {
                dynamic_loader.style.filter = "blur(0)";
                dynamic_loader_anime.style.opacity = "0.0";
                dynamic_loader.style.transitionTimingFunction = floating_func_out;
                dynamic_loader.contentWindow.addEventListener('scroll', NavigationBar.scroll);
                dynamic_loader.style.opacity = "1.0";
                dynamic_loader.style.transform = "perspective(500px) translateZ(0px)";
                if(getLayoutID()===2) {
                    navi_background_obj.style.transitionTimingFunction = floating_func_out;
                    NavigationBar.set_expanded(webpage_expand_property);
                    NavigationBar.set_transparent(webpage_expand_property);
                    navi_background_obj.style.transform = "perspective(500px) translateZ(0px)";
                } else {
                    navi_background_obj.style.transform = "perspective(auto) translateZ(84px)";
                    if(mobile_menu_state.checked) {
                        NavigationBar.set_expanded(true);
                        NavigationBar.set_transparent(false);
                    } else {
                        NavigationBar.set_transparent(webpage_expand_property);
                        NavigationBar.set_expanded(webpage_expand_property);
                    }
                }
                dynamic_loader_anime.style.display="none";
                NavigationBar.set_enable_expanded(webpage_expand_property);
            },400);
        };
    }
}