// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function pg_about() {
    let about_personal_info = document.getElementById("about_personal_info");
    let about_personal_experience = document.getElementById("about_personal_experience");
    let previous_layoutID = getLayoutID();

    this.initiate = function () {
        switch_view();
        window.addEventListener('resize',this.resize);
        document.addEventListener('orientationchange', switch_view);
    }

    this.resize = function () {
        let current_layoutID = getLayoutID();
        if(current_layoutID !== previous_layoutID) {
            switch_view();
        }
        previous_layoutID = current_layoutID;
    }

    let switch_view = function () {
        if(getLayoutID()===2) {
            about_personal_info.style.width = "27.5%";
            about_personal_experience.style.width = "55%";
        } else {
            about_personal_info.style.width = "75%";
            about_personal_experience.style.width = "75%";
        }
    }
}