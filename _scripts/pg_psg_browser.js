// Create reference instance
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/marked.min.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/highlight.min.js'></script>");

function articles_browser(){
    let articles_reader          = document.getElementById("articles_reader");
    let articles_tag_selector    = document.getElementById("tags_selector");
    let articles_list_title      = document.getElementById("list_title");
    let articles_back_btn        = document.getElementById("articles_backbutton");
    let article_title_pic        = document.getElementById("article_titlepic");
    let article_page_idx         = document.getElementById("page_index");
    let article_page_idx_max_cnt = 10;
    let curr_load_indexes = []

    let psglist_loc = "/src/psglists.json"
    let psg_request = new XMLHttpRequest();
    const max_item_num= 10;
    let psglist_json;
    let load_list_executing = false;
    let load_list_temptag   = null;
    let load_list_temppage  = null;

    let previousIsPC = getLayoutID();

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
                psglist_json = JSON.parse(psg_request.responseText);
                load_list('All articles',1);
                load_tag();
            }
        }
        switch_view();
        window.addEventListener('resize', this.resize);
        document.addEventListener('orientationchange', switch_view);
    }

    this.resize = function () {
        let currentIsPC = getLayoutID();
        if (currentIsPC !== previousIsPC) {
            switch_view();
        }
        previousIsPC = currentIsPC;
    }

    let switch_view = function () {
        if(getLayoutID() === 2) {
            articles_reader.style.width="78%";
            try{
                articles_tag_selector.classList.replace("mobile_tag_selector","pc_tag_selector");
            }catch (error){}
        } else {
            articles_reader.style.width="100%";
            try{
                articles_tag_selector.classList.replace("pc_tag_selector","mobile_tag_selector");
            }catch (error){}
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

    let load_pg_idx = async function () {
        await _thisRef.clear_article_page_idx();
        let articles_count = psglist_json.length;
        if(_thisRef.curr_tag ==='All articles') {
            try{
                articles_count = psglist_json.length;
            } catch (TypeError) {}
        } else {
            articles_count = curr_load_indexes.length;
        }
        let idx_lower_range = (_thisRef.curr_page - article_page_idx_max_cnt/2>0)?
            (_thisRef.curr_page - article_page_idx_max_cnt/2):1;
        let idx_upper_range = (idx_lower_range+article_page_idx_max_cnt/2 < articles_count/article_page_idx_max_cnt+1)?
            (idx_lower_range+article_page_idx_max_cnt/2):(articles_count/article_page_idx_max_cnt+1);
        for(let i = idx_lower_range; i < idx_upper_range; i++) {
            let btn = document.createElement("button");
            btn.innerText = i;
            if(i === _thisRef.curr_page) {
                btn.style.backgroundColor = "rgba(0,28,68,1.00)";
                btn.style.color = "#FFFFFF";
            }
            btn.onclick = function (){
                _thisRef.curr_page = i;
                load_list(_thisRef.curr_tag, i);
                load_pg_idx();
            }
            article_page_idx.appendChild(btn);
        }
        await _thisRef.show_article_page_idx();
    }

    this.clear_article_page_idx = async function() {
        if(article_page_idx.childElementCount > 0) {
            for (let i = 0; i < articles_reader.childElementCount; i++) {
                try {
                    article_page_idx.children[i].style.opacity = "0";
                    article_page_idx.children[i].style.transform="translateZ(2)";
                    await sleep(250/article_page_idx.childElementCount);
                } catch (TypeError) {}
            }
            await sleep(501);
        }
        article_page_idx.innerHTML = '';
    }

    this.show_article_page_idx = async function() {
        for (let i = 0; i < article_page_idx.childElementCount; i++) {
            await sleep(250/article_page_idx.childElementCount);
            article_page_idx.children[i].style.opacity = "1.0";
            article_page_idx.children[i].style.transform="translateZ(0px)";
        }
    }

    this.load_list = function (search_tag, page_num) {
        load_list(search_tag,page_num);
    }

    let load_list = async function (searchtag, pagenum) {
        article_title_pic.style.opacity = "0.0";
        articles_back_btn.style.width="0px";
        articles_back_btn.style.borderRadius="0px";
        articles_back_btn.style.backgroundSize="1px 30px";
        articles_list_title.innerText = searchtag;
        _thisRef.curr_tag = searchtag;
        _thisRef.curr_page= pagenum;
        load_pg_idx();
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
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num < psglist_json.length)?
                (pagenum*max_item_num):psglist_json.length); i++){
                try{
                    articles_reader.appendChild(make_link_div(psglist_json[i]));
                } catch (TypeError) {}
            }
        } else {
            curr_load_indexes = [];
            for (let i = 0; i < psglist_json.length; i++) {
                if(psglist_json[i].class.includes(searchtag)){
                    curr_load_indexes.push(i);
                }
            }
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num < curr_load_indexes.length)?
                pagenum*max_item_num:curr_load_indexes.length); i++){
                try{
                    articles_reader.appendChild(make_link_div(psglist_json[curr_load_indexes[i]]));
                } catch (TypeError) {}
            }
        }
        load_list_executing = false;
        if(load_list_temptag!==null || load_list_temppage!==null) {
            articles_reader.innerHTML = '';
            await load_list(load_list_temptag, load_list_temppage);
            return;
        }
        /**Blocks show up sequentially*/
        await _thisRef.show_components();
    }

    function make_link_div(json_obj) {
        /**Create block element*/
        let block = document.createElement("div");
        block.classList.add("articles_block");
        block.onclick = function () {
            articles_back_btn.style.width = "40px";
            articles_back_btn.style.borderRadius = "5px";
            articles_back_btn.style.backgroundSize = "30px 30px";
            article_title_pic.style.backgroundImage= "url('"+json_obj?.pic+"')";
            article_title_pic.style.opacity = "1.0";
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

    this.show_components = async function(){
        for (let i = 0; i < articles_reader.childElementCount; i++) {
            await sleep(250/articles_reader.childElementCount);
            articles_reader.children[i].style.opacity = "1.0";
            articles_reader.children[i].style.transform="translateZ(0px)";
        }
    }

    this.load_articles = async function (link) {
        await _thisRef.clear_components();
        let mdFile = new XMLHttpRequest();
        mdFile.open("get", link);
        mdFile.send(null);
        mdFile.onload = function () {
            if (mdFile.status === 200) {
                article_container = document.createElement("div");
                article_container.classList.add("article_container");
                article_container.innerHTML=marked.parse(mdFile.responseText);
                articles_reader.appendChild(article_container);
                hljs.highlightAll();
                _thisRef.show_components();
            }
        }
    }

}