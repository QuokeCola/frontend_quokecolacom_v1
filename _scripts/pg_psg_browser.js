// Create reference instance
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/marked.min.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/highlight.min.js'></script>");

function articles_browser(){
    let articles_reader          = document.getElementById("articles_reader");
    let articles_tag_selector    = document.getElementById("tags_selector");
    let articles_list_title      = document.getElementById("list_title");
    let articles_back_btn        = document.getElementById("articles_backbutton");
    let psglist_loc = "/src/psglists.json"
    let psg_request = new XMLHttpRequest();
    const max_item_num= 20;
    let psglist_json;
    let load_list_executing = false;
    let load_list_temptag   = null;
    let load_list_temppage  = null;
    // For return from articles.
    this.curr_tag = 'All articles';
    this.curr_page = 1;
    var _thisRef = this;
    let topline_colors = [  'orangered','orchid','darkcyan','deeppink','darkslateblue','darksalmon','CadetBlue','CornflowerBlue',
                            'Gold', 'GreenYellow','IndianRed','LightCoral'];

    this.initiate = function () {
        // Compile
        psg_request.open("get", psglist_loc);
        psg_request.send(null);
        psg_request.onload = function () {
            if (psg_request.status === 200) {
                console.log(psg_request.responseText);
                psglist_json = JSON.parse(psg_request.responseText);
                load_list('All articles',1);
                load_tag();
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let load_tag = function () {
        try{
            let tag_list = ['All articles',];
            for (let i = 0; i < psglist_json.length; i++) {
                for(let j = 0; j < psglist_json[i].class.length; j++){
                    if(!tag_list.includes(psglist_json[i].class[j])){
                        tag_list.push(psglist_json[i].class[j]);
                    }
                }
            }
            for (let i = 0; i < tag_list.length; i++) {
                let div = document.createElement("button");
                div.innerText = tag_list[i];
                div.onclick = function () {
                    load_list(tag_list[i], 1);
                }
                articles_tag_selector.appendChild(div);
            }
        } catch (TypeError) {}
    }

    this.load_list = function (search_tag, page_num) {
        load_list(search_tag,page_num);
    }

    let load_list = async function (searchtag, pagenum) {
        articles_reader.style.display = "flex";
        articles_back_btn.style.width="0px";
        articles_back_btn.style.borderRadius="0px";
        articles_back_btn.style.backgroundSize="1px 30px";
        articles_list_title.innerText = searchtag;
        _thisRef.curr_tag = searchtag;
        _thisRef.curr_page= pagenum;
        if(!load_list_executing){
            load_list_executing = true;
            load_list_temptag = null;
            load_list_temppage= null;
        } else {
            load_list_temptag = searchtag;
            load_list_temppage= pagenum;
            return;
        }
        /**Blocks fade out sequentially*/
        await _thisRef.clear_components();

        /**Adding Elements to main view*/
        if(searchtag==='All articles') {
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num > psglist_json.length)?
                (pagenum*max_item_num+max_item_num):psglist_json.length); i++){
                try{
                    articles_reader.appendChild(make_link_div(psglist_json[i]));
                } catch (TypeError) {

                }
            }
        } else {
            let index = [];
            for (let i = 0; i < psglist_json.length; i++) {
                if(psglist_json[i].class.includes(searchtag)){
                    index.push(i);
                }
            }
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num > index.length)?
                (pagenum*max_item_num+max_item_num):index.length); i++){
                try{
                    articles_reader.appendChild(make_link_div(psglist_json[index[i]]));
                } catch (TypeError) {

                }
            }
        }
        load_list_executing = false;
        if(load_list_temptag!==null || load_list_temppage!==null) {
            articles_reader.innerHTML = '';
            await load_list(load_list_temptag, load_list_temppage);
            return;
        }
        /**Blocks show up sequentially*/
        for (let i = 0; i < articles_reader.childElementCount; i++) {
            await sleep(250/articles_reader.childElementCount);
            articles_reader.children[i].style.opacity = "1.0";
            articles_reader.children[i].style.transform="translateZ(0px)";
        }
    }

    function make_link_div(json_obj) {
        /**Create block element*/
        let block = document.createElement("div");
        block.classList.add("articles_block");
        block.onclick = function () {
            console.log(json_obj.src);
            articles_back_btn.style.width = "40px";
            articles_back_btn.style.borderRadius = "5px";
            articles_back_btn.style.backgroundSize = "30px 30px";
            _thisRef.load_articles(json_obj.src);
        }
        /**Create topline element*/
        let topLine = document.createElement("div");
        topLine.classList.add("top_line");
        topLine.style.backgroundColor = topline_colors[parseInt(Math.random()*1000)%topline_colors.length];
        /**Create picture element*/
        let pic = document.createElement("div");
        pic.classList.add("title_pic");
        picsrc = "url('"+json_obj?.pic+"')";
        pic.style.backgroundImage = picsrc;
        /**Create title element*/
        let title = document.createElement("h3");
        title.append("h3");
        title.innerText = json_obj?.title;
        /**Create class list element*/
        let class_list = document.createElement("div");
        class_list.classList.add("class_list");
        for (let j = 0; j < json_obj.class?.length; j++) {
            let tag = document.createElement("div");
            tag.innerText = json_obj?.class[j];
            class_list.appendChild(tag);
        }
        /**Create time element*/
        let time = document.createElement("div");
        time.classList.add("pub_time");
        time.innerText = json_obj?.time;
        block.appendChild(topLine);
        block.appendChild(pic);
        block.appendChild(title);
        block.appendChild(class_list);
        block.appendChild(time);
        return block;
    }

    this.clear_components = async function() {
        if(articles_reader.childElementCount > 0) {
            for (let i = 0; i < articles_reader.childElementCount; i++) {
                articles_reader.children[i].style.opacity = "0";
                articles_reader.children[i].style.transform="translateZ(2)";
                await sleep(250/articles_reader.childElementCount);
            }
            await sleep(501);
        }
        articles_reader.innerHTML = '';
    }

    this.load_articles = async function (link) {
        await _thisRef.clear_components();
        let mdFile = new XMLHttpRequest();
        mdFile.open("get", link);
        mdFile.send(null);
        mdFile.onload = function () {
            if (mdFile.status === 200) {
                articles_reader.style.display = "block";
                console.log(mdFile.responseText);
                articles_reader.innerHTML=marked.parse(mdFile.responseText);
                hljs.highlightAll();
            }
        }
    }

}