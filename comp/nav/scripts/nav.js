document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");

class NavViewController{
    _nav_json_url = "/comp/nav/customize.json";
    _customized_json;
    _scroll_shrink_threshold = 5;
    _previousLayoutID = 0;

    obj_top_strip = document.getElementById("nav-topStrip-obj");
    obj_button_box = document.getElementById("nav-buttonBox-obj");
    obj_mobile_menu_state = document.getElementById("nav-mobileMenuState");
    obj_pc_shrink_state = document.getElementById("nav-pcShrinkState");

    style_button_box_pc_content_width;

    constructor() {
        let _thisRef = this;
        let json = new XMLHttpRequest();
        json.open("get", this._nav_json_url);
        json.send(null);
        json.onload = function (){
            if (json.status === 200) {
                _thisRef._customized_json = JSON.parse(json.responseText);
                _thisRef.initialize_UI();
            }
        }
        window.addEventListener('resize', function (){
            _thisRef.resize();
        });

        window.addEventListener('scroll', function () {
            _thisRef.scroll();
        })
    }

    resize() {
        let _thisRef = this;
        let currentLayoutID = getLayoutID();
        if(currentLayoutID!==_thisRef._previousLayoutID) {
            _thisRef.refresh_UI();
        }
        document.documentElement.style.setProperty("--pc-buttonBox-width-expand",
            window.innerWidth+"px");
        _thisRef._previousLayoutID = currentLayoutID;
    }

    scroll() {
        this.obj_pc_shrink_state.checked = document.documentElement.scrollTop < this._scroll_shrink_threshold;
    }

    initialize_UI() {
        let _thisRef = this;
        try{
            // Generate Buttons
            for(let i = 0; i < this._customized_json.subpages.length; i++){
                let button = document.createElement("button");
                button.innerText = this._customized_json.subpages[i].title;
                this.obj_button_box.appendChild(button);
            }
            document.documentElement.style.setProperty("--theme-color",
                "rgba("+this._customized_json.themeColor+",0.9)");
            document.documentElement.style.setProperty("--theme-shallow-color",
                "rgba("+this._customized_json.themeColor+",0.8)");
            document.documentElement.style.setProperty("--complementary-color",
                this._customized_json.complementaryColor);
            setTimeout(function (){
                _thisRef.style_button_box_pc_content_width = _thisRef._get_pc_button_box_inner_width()+"px";
                _thisRef.refresh_UI();
            },20);

        }catch (e) {
            console.log(e);
        }
    }

    refresh_UI() {
        document.documentElement.style.setProperty("--pc-buttonBox-width-expand",
            window.innerWidth+"px");
        if(getLayoutID()===2){
            this.obj_button_box.classList.replace("nav-mobileButtonBox","nav-pcButtonBox");
            this.obj_top_strip.classList.replace("nav-mobileTopStrip", "nav-pcTopStrip" );
            document.documentElement.style.setProperty("--pc-buttonBox-width-shrink",
                this.style_button_box_pc_content_width);
            this.obj_pc_shrink_state.checked = document.documentElement.scrollTop < this._scroll_shrink_threshold;
        } else {
            this.obj_button_box.classList.replace("nav-pcButtonBox", "nav-mobileButtonBox");
            this.obj_top_strip.classList.replace("nav-pcTopStrip","nav-mobileTopStrip" );
        }
    }

    _get_pc_button_box_inner_width () {
        let width = 0;
        for (let i = 0; i < this.obj_button_box.children.length; i++){
            let bound = this.obj_button_box.children[i].getBoundingClientRect();
            width = width+bound.width;
            console.log(width);
        }
        return width;
    }
}