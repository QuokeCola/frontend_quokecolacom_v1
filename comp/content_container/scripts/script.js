class ContentContainerController{

    constructor() {
        this.obj_content_container = document.getElementById("content-container");
        this.obj_loading_state = document.getElementById("loading-state");
        this.previousLayoutID = getLayoutID();
        this.current_CSS_list = [];

        let _thisRef = this;
        window.addEventListener("resize", function () {
            _thisRef.resize();
        })
        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                _thisRef.resize();
            }, 200);
        })
        window.addEventListener("updateCCRequest", evt => {
            this.handle_reload_CC_evt(evt);
        })

        this.rearrangeUI();

        window.onpopstate = function (ev){
            try {
                let Event = new CustomEvent("updateCCRequest", {
                    detail:{src: ev.state}
                });
                setTimeout( function () {
                    window.dispatchEvent(Event);
                }, 100);
            } catch (e) {
                console.log(e);
            }
        }

    }

    resize() {
        let currentLayoutID = getLayoutID();
        if(this.previousLayoutID !== currentLayoutID) {
            this.rearrangeUI();
        }
        this.previousLayoutID = currentLayoutID;
    }

    rearrangeUI() {
        if(getLayoutID()===2) {
            this.obj_content_container.classList.replace("content-container-mobile","content-container-pc");
        } else {
            this.obj_content_container.classList.replace("content-container-pc","content-container-mobile");
        }
    }

    async handle_reload_CC_evt(event) {
        let time = new Date();
        let _thisRef = this;
        this.scrollToTop();
        while (this.obj_content_container.scrollTop >= 10) {
            await sleep(10);
        }
        this.obj_loading_state.checked = true;
        let _transition_start_time = 0;
        try {
            let tgNavEvent = new CustomEvent("toggleNavShrinkRequest", {
                detail: {value: event.detail.src.type === "introPage"}
            });
            window.dispatchEvent(tgNavEvent);
            _thisRef.obj_content_container.ontransitionend = function () {
                if(time.getTime()-_transition_start_time > 702) { /**Check for multiple properties*/
                    _transition_start_time = time.getTime();
                } else {
                    return;
                }
                /**Remove previous CSS nodes*/
                for(let i = 0; i < _thisRef.current_CSS_list.length; i++) {
                    document.head.removeChild(_thisRef.current_CSS_list[i]);
                }
                /**Refresh the list*/
                _thisRef.current_CSS_list = [];
                let target_html = new HTML_Parser(event.detail.src.src);
                target_html.onload = function () {
                    for(let i = 0; i < target_html.rel_css.length; i++) {
                        if(!(target_html.rel_css[i] === "/comp/content_container/styles/entry.css")) { // Exception for universal components
                            let new_CSS_node = document.createElement("link" );
                            new_CSS_node.href = target_html.rel_css[i];
                            new_CSS_node.rel = "stylesheet";
                            new_CSS_node.type = "text/css";
                            _thisRef.current_CSS_list.push(new_CSS_node);
                            document.head.appendChild(new_CSS_node);
                        }
                    }
                    window.history.pushState(event.detail.src, event.detail.src.title, "#"+event.detail.src.title);
                    _thisRef.obj_content_container.innerHTML = target_html.body.innerHTML;
                    setTimeout(function () {
                        _thisRef.obj_loading_state.checked = false;
                        _thisRef.obj_content_container.ontransitionend = function (){
                        };
                        /***For wake up article browser**/
                        if(event.detail.src.title === "ARTICLES") {
                            let ABEvent = new CustomEvent("wakeArticleBrowserRequest");
                            window.dispatchEvent(ABEvent);
                        }
                    }, 30);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    scrollToTop() {
        if(window.chrome === undefined) {
            const scl2top = () => {
                let sTop = this.obj_content_container.scrollTop;
                if (sTop > 1) {
                    window.requestAnimationFrame(scl2top);
                    this.obj_content_container.scrollTo(0, sTop - sTop / 8);
                }
            }
            window.requestAnimationFrame(scl2top);
        } else {
            this.obj_content_container.scrollTo(0,0);
        }
    }
}