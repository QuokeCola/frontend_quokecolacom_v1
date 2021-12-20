class NavViewController{
    _customized_json;
    _scroll_shrink_threshold = 5;
    _previousLayoutID = 0;

    _enable_expand = true;

    obj_nav       = document.getElementById("nav");
    obj_button_box = document.getElementById("nav-buttonBox-obj");
    obj_pc_shrink_state = document.getElementById("nav-pcShrinkState");
    obj_content_container = document.getElementById("content-container");
    obj_loading_state = document.getElementById("loading-state");

    style_button_box_pc_content_width;

    constructor(customize_json) {
        let _thisRef = this;
        this._customized_json = customize_json;
        this.initialize_UI();
        window.addEventListener('resize', function (){
            _thisRef.resize();
        });

        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                _thisRef.refresh_UI();
            }, 200);
        })

        window.addEventListener("toggleNavShrinkRequest", evt => {
            _thisRef.enable_expand(evt.detail.value);
        })

        this.obj_content_container.addEventListener('scroll',function () {
            _thisRef.scroll();
        });
    }

    enable_expand(value) {
        this._enable_expand = value;
        this.scroll();
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
        this.obj_pc_shrink_state.checked = this.obj_content_container.scrollTop < this._scroll_shrink_threshold && this._enable_expand;
    }

    initialize_UI() {
        let _thisRef = this;
        try{
            let time = new Date();
            // Generate Buttons
            for(let i = 0; i < this._customized_json.subpages.length; i++){
                let button = document.createElement("button");
                button.innerText = this._customized_json.subpages[i].title;
                button.onclick = function () {
                    let Event = new CustomEvent("updateCCRequest", {
                        detail:{src: _thisRef._customized_json.subpages[i]}
                    });
                    window.dispatchEvent(Event);
                }
                this.obj_button_box.appendChild(button);
            }
            document.documentElement.style.setProperty("--theme-color",
                "rgba("+this._customized_json.themeColor+",0.9)");
            document.documentElement.style.setProperty("--theme-shallow-color",
                "rgba("+this._customized_json.themeColor+",0.8)");
            document.documentElement.style.setProperty("--complementary-color",
                this._customized_json.complementaryColor);
            let currTime = 0;
            this.obj_nav.ontransitionend = function (){
                if((time.getTime() - currTime > 601)&&!_thisRef.obj_loading_state.checked) {
                    currTime = time.getTime();
                } else {
                    return;
                }
                _thisRef.style_button_box_pc_content_width = _thisRef._get_pc_button_box_inner_width()+"px";
                document.documentElement.style.setProperty("--pc-buttonBox-width-shrink",
                    _thisRef.style_button_box_pc_content_width);
                _thisRef.refresh_UI();
                _thisRef.obj_button_box.ontransitionend = null;
            }
        }catch (e) {
            console.log(e);
        }
    }

    refresh_UI() {
        document.documentElement.style.setProperty("--pc-buttonBox-width-expand",
            window.innerWidth+"px");
        if(getLayoutID()===2){
            this.obj_nav.classList.replace("nav-mobile", "nav-pc");
            this.scroll();
        } else {
            this.obj_nav.classList.replace( "nav-pc","nav-mobile");
        }
    }

    _get_pc_button_box_inner_width () {
        let width = 0;
        for (let i = 0; i < this.obj_button_box.children.length; i++){
            let bound = this.obj_button_box.children[i].getBoundingClientRect();
            width = width+bound.width;
        }
        return width;
    }
}