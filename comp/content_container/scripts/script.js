class ContentContainerController{
    obj_content_container = document.getElementById("content-container");
    obj_loading_state = document.getElementById("loading-state");
    previousLayoutID = getLayoutID();

    constructor() {
        let _thisRef = this;
        window.addEventListener("resize", function () {
            _thisRef.resize();
        })
        window.addEventListener("orientationchange", function () {
            _thisRef.resize();
        })
        window.addEventListener("updateCCRequest", evt => {
            this.handle_reload_CC_evt(evt);
        })

        this.refreshUI();
    }

    resize() {
        let currentLayoutID = getLayoutID();
        if(this.previousLayoutID !== currentLayoutID) {
            this.refreshUI();
        }
        this.previousLayoutID = currentLayoutID;
    }

    refreshUI() {
        if(getLayoutID()===2) {
            this.obj_content_container.classList.replace("content-container-mobile","content-container-pc");
        } else {
            this.obj_content_container.classList.replace("content-container-pc","content-container-mobile");
        }
    }

    async handle_reload_CC_evt(event) {
        let time = new Date();
        let _thisRef = this;
        this.obj_loading_state.checked = true;
        let _transition_end_time = 0;
        try {
            this.obj_content_container.ontransitionend = function () {
                if(time.getTime()-_transition_end_time > 2) {
                    _transition_end_time = time.getTime();
                } else {
                    return;
                }
                let target_html = new HTML_Parser(event.detail.src.src);
                target_html.onload = function () {
                    _thisRef.obj_content_container.innerHTML = target_html.body.innerHTML;
                    setTimeout(function () {
                        _thisRef.obj_loading_state.checked = false;
                        _thisRef.obj_content_container.ontransitionend = null;
                        let tgNavEvent = new CustomEvent("toggleNavShrinkRequest", {
                            detail: {value: event.detail.src.type === "introPage"}
                        });
                        window.dispatchEvent(tgNavEvent);
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
}