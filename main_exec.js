document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
document.write("<script language=javascript src='/comp/nav/scripts/script.js'></script>");
document.write("<script language=javascript src='/comp/content_container/scripts/script.js'></script>")
document.write("<script language=javascript src='/comp/article_browser/script/script.js'></script>")
document.body.onload = function () {
    let json_url = "/customize.json"
    let json = new XMLHttpRequest();
    let _customized_json;
    json.open("get", json_url);
    json.send(null);
    json.onload = function (){
        if (json.status === 200) {
            _customized_json = JSON.parse(json.responseText);
            var nav_controller = new NavViewController(_customized_json);
            var cc_controller = new ContentContainerController();
            var article_browser = new ArticleBrowser(_customized_json.markdown_root);
            let Event = new CustomEvent("updateCCRequest", {
                detail:{src: _customized_json.subpages[0]}
            });
            window.dispatchEvent(Event);
        }
    }
}