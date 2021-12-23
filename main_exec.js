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
    console.log(" ____                __                         __                               _____                        __                  ____               ___                \n" +
        "/\\  _`\\             /\\ \\                       /\\ \\                             /\\  __`\\                     /\\ \\                /\\  _`\\            /\\_ \\               \n" +
        "\\ \\ \\/\\_\\    ___    \\_\\ \\      __              \\ \\ \\____   __  __               \\ \\ \\/\\ \\    __  __    ___   \\ \\ \\/'\\       __   \\ \\ \\/\\_\\    ___   \\//\\ \\       __     \n" +
        " \\ \\ \\/_/_  / __`\\  /'_` \\   /'__`\\             \\ \\ '__`\\ /\\ \\/\\ \\               \\ \\ \\ \\ \\  /\\ \\/\\ \\  / __`\\  \\ \\ , <     /'__`\\  \\ \\ \\/_/_  / __`\\   \\ \\ \\    /'__`\\   \n" +
        "  \\ \\ \\L\\ \\/\\ \\L\\ \\/\\ \\L\\ \\ /\\  __/              \\ \\ \\L\\ \\\\ \\ \\_\\ \\               \\ \\ \\\\'\\\\ \\ \\ \\_\\ \\/\\ \\L\\ \\  \\ \\ \\\\`\\  /\\  __/   \\ \\ \\L\\ \\/\\ \\L\\ \\   \\_\\ \\_ /\\ \\L\\.\\_ \n" +
        "   \\ \\____/\\ \\____/\\ \\___,_\\\\ \\____\\              \\ \\_,__/ \\/`____ \\               \\ \\___\\_\\ \\ \\____/\\ \\____/   \\ \\_\\ \\_\\\\ \\____\\   \\ \\____/\\ \\____/   /\\____\\\\ \\__/.\\_\\\n" +
        "    \\/___/  \\/___/  \\/__,_ / \\/____/               \\/___/   `/___/> \\               \\/__//_/  \\/___/  \\/___/     \\/_/\\/_/ \\/____/    \\/___/  \\/___/    \\/____/ \\/__/\\/_/\n" +
        "                                                               /\\___/                                                                                                   \n" +
        "                                                               \\/__/                                                                                                    ")
}