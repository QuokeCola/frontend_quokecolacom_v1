// Create reference instance
document.write("<script language=javascript src='/comp/article_browser/dependencies/marked.min.js'></script>");
document.write("<script language=javascript src='/comp/article_browser/dependencies/highlight.min.js'></script>");

class ArticleBrowser{
    obj_content_container    = document.getElementById("content-container");
    articles_reader          = document.getElementById("articles-reader");
    articles_tag_selector    = document.getElementById("tags-selector");
    articles_list_title      = document.getElementById("list-title");
    articles_back_btn        = document.getElementById("article-back-btn");
    article_title_pic        = document.getElementById("article-title-pic");
    article_page_idx         = document.getElementById("page-index");
    gradient_mask            = document.getElementById("article-title-pic-mask");
    article_page_idx_max_cnt = 10;
    curr_load_indexes = []

    md_root = "";
    psglist_loc = "psglists.json"
    psg_request = new XMLHttpRequest();
    max_item_num= 10;
    psglist_json;
    load_list_executing = false;
    load_list_temptag   = null;
    load_list_temppage  = null;

    previousIsPC = getLayoutID();

    // For return from articles.
    curr_tag = 'All articles';
    curr_page = 1;
    topline_colors = [  'orangered','orchid','darkcyan','deeppink','darkslateblue','darksalmon','CadetBlue','CornflowerBlue',
        'Gold', 'GreenYellow','IndianRed','LightCoral'];

    constructor (url) {
        this.md_root = url;
        let _thisRef = this;
        // Compile
        _thisRef.psg_request.open("get", this.md_root+this.psglist_loc);
        _thisRef.psg_request.send(null);
        _thisRef.psg_request.onload = function () {
            if (_thisRef.psg_request.status === 200) {
                _thisRef.psglist_json = JSON.parse(_thisRef.psg_request.responseText);
            }
        }

        addEventListener('wakeArticleBrowserRequest', function () {
            try{
                _thisRef.articles_reader          = document.getElementById("articles-reader");
                _thisRef.articles_tag_selector    = document.getElementById("tags-selector");
                _thisRef.articles_list_title      = document.getElementById("list-title");
                _thisRef.articles_back_btn        = document.getElementById("article-back-btn");
                _thisRef.article_title_pic        = document.getElementById("article-title-pic");
                _thisRef.article_page_idx         = document.getElementById("page-index");
                _thisRef.gradient_mask            = document.getElementById("article-title-pic-mask");
                _thisRef.load_list(_thisRef.curr_tag, _thisRef.curr_page);
                _thisRef.load_tag();
                _thisRef.articles_back_btn.onclick = function () {
                    _thisRef.load_list(_thisRef.curr_tag, _thisRef.curr_page)
                }
                _thisRef.articles_list_title.onclick = function () {
                    _thisRef.load_list(_thisRef.curr_tag, _thisRef.curr_page)
                }
            } catch (e) {
                console.log(e);
            }
        });
    }

    load_tag() {
        let _thisRef = this;
        try{
            let tag_list = ['All articles',];
            for (let i = 0; i < this.psglist_json.length; i++) {
                for(let j = 0; j < this.psglist_json[i].class.length; j++){
                    if(!tag_list.includes(this.psglist_json[i].class[j])){
                        tag_list.push(this.psglist_json[i].class[j]);
                    }
                }
            }
            for (let i = 0; i < tag_list.length; i++) {
                let div = document.createElement("button");
                div.innerText = tag_list[i];
                div.onclick = function () {
                    _thisRef.load_list(tag_list[i], 1);
                }
                this.articles_tag_selector.appendChild(div);
            }
        } catch (TypeError) {}
    }

    load_pg_idx() {
        let _thisRef = this;
        let articles_count = this.psglist_json.length;
        if(this.curr_tag ==='All articles') {
            try{
                articles_count = this.psglist_json.length;
            } catch (TypeError) {}
        } else {
            articles_count = this.curr_load_indexes.length;
        }
        let idx_lower_range = (this.curr_page - this.article_page_idx_max_cnt/2>0)?
            (this.curr_page - this.article_page_idx_max_cnt/2):1;
        let idx_upper_range = (idx_lower_range+this.article_page_idx_max_cnt/2 < articles_count/this.article_page_idx_max_cnt+1)?
            (idx_lower_range+this.article_page_idx_max_cnt/2):(articles_count/this.article_page_idx_max_cnt+1);
        for(let i = idx_lower_range; i < idx_upper_range; i++) {
            let btn = document.createElement("button");
            btn.innerText = String(i);
            if(i === this.curr_page) {
                btn.style.backgroundColor = "var(--theme-color)";
                btn.style.color = "#FFFFFF";
            }
            btn.onclick = function (){
                _thisRef.curr_page = i;
                _thisRef.load_list(_thisRef.curr_tag, i);
                _thisRef.load_pg_idx();
            }
            this.article_page_idx.appendChild(btn);
        }
    }

    load_pg_content(searchtag, pagenum){
        /**Adding Elements to main view*/
        if(searchtag==='All articles') {
            for(let i = (pagenum-1) * this.max_item_num; i<((pagenum*this.max_item_num < this.psglist_json.length)?
                (pagenum*this.max_item_num):this.psglist_json.length); i++){
                try{
                    this.articles_reader.appendChild(this.make_link_div(this.psglist_json[i]));
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            this.curr_load_indexes = [];
            for (let i = 0; i < this.psglist_json.length; i++) {
                if(this.psglist_json[i].class.includes(searchtag)){
                    this.curr_load_indexes.push(i);
                }
            }
            for(let i = (pagenum-1) * this.max_item_num; i<((pagenum*this.max_item_num < this.curr_load_indexes.length)?
                pagenum*this.max_item_num:this.curr_load_indexes.length); i++){
                try{
                    this.articles_reader.appendChild(this.make_link_div(this.psglist_json[this.curr_load_indexes[i]]));
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    async clear_article_page_idx() {
        if(this.article_page_idx.childElementCount > 0) {
            for (let i = 0; i < this.articles_reader.childElementCount; i++) {
                try {
                    this.article_page_idx.children[i].style.opacity = "0";
                    this.article_page_idx.children[i].style.transform="translateZ(2)";
                    await sleep(250/this.article_page_idx.childElementCount);
                } catch (TypeError) {}
            }
            await sleep(501);
        }
        this.article_page_idx.innerHTML = '';
    }

    async show_article_page_idx () {
        for (let i = 0; i < this.article_page_idx.childElementCount; i++) {
            await sleep(250/this.article_page_idx.childElementCount);
            this.article_page_idx.children[i].style.opacity = "1.0";
            this.article_page_idx.children[i].style.transform="translateZ(0px)";
        }
    }

    async load_list (searchtag, pagenum) {
        this.article_page_idx.style.opacity = "1.0";
        this.scrollToTop();
        this.articles_list_title.style.pointerEvents="none";
        this.article_title_pic.style.opacity = "0.0";
        this.article_title_pic.style.filter = "blur(0px)";
        this.articles_back_btn.style.width="0px";
        this.articles_back_btn.style.borderRadius="0px";
        this.articles_back_btn.style.backgroundSize="1px 30px";
        this.articles_list_title.innerText = searchtag;
        this.curr_tag = searchtag;
        this.curr_page= pagenum;
        if(!this.load_list_executing){
            this.load_list_executing = true;
            this.load_list_temptag = null;
            this.load_list_temppage= null;
        } else {
            this.load_list_temptag = searchtag;
            this.load_list_temppage= pagenum;
            return;
        }

        /**Blocks fade out sequentially*/
        await Promise.all([this.clear_article_page_idx(), this.clear_components()]);
        this.gradient_mask.style.height = "100vh";
        this.load_pg_content(searchtag, pagenum);
        this.load_pg_idx();

        this.load_list_executing = false;
        if(this.load_list_temptag!==null || this.load_list_temppage!==null) {
            this.articles_reader.innerHTML = '';
            await this.load_list(this.load_list_temptag, this.load_list_temppage);
            return;
        }
        /**Blocks show up sequentially*/
        await Promise.all([this.show_components(),this.show_article_page_idx()]);
    }

    make_link_div(json_obj) {
        /**Create block element*/
        let _thisRef = this;
        let block = document.createElement("div");
        block.classList.add("article-link-block");
        /**Create topline element*/
        let topLine = document.createElement("div");
        topLine.classList.add("top_line");
        topLine.style.backgroundColor = this.topline_colors[parseInt(Math.random()*1000)%this.topline_colors.length];
        /**Create picture element*/
        let pic = document.createElement("div");
        pic.classList.add("title_pic");
        let picsrc;
        /**Create title element*/
        let title = document.createElement("h3");
        title.append("h3");
        /**Create class list element*/
        let class_list = document.createElement("div");
        class_list.classList.add("class_list");
        /**Create time element*/
        let time = document.createElement("div");
        time.classList.add("pub_time");
        try {
            picsrc = "url('" +_thisRef.md_root+json_obj.pic + "')";
            title.innerText = json_obj.title;
            for (let j = 0; j < json_obj.class.length; j++) {
                let tag = document.createElement("div");
                tag.innerText = json_obj.class[j];
                class_list.appendChild(tag);
            }
            time.innerText = json_obj.time;
        } catch (error) {
        }
        pic.style.backgroundImage = picsrc;
        block.appendChild(topLine);
        block.appendChild(pic);
        block.appendChild(title);
        block.appendChild(class_list);
        block.appendChild(time);

        block.onclick = function (evt) {
            _thisRef.articles_back_btn.style.width = "40px";
            _thisRef.articles_back_btn.style.borderRadius = "5px";
            _thisRef.articles_back_btn.style.backgroundSize = "30px 30px";
            _thisRef.gradient_mask.style.height = "100vh";
            try{
                _thisRef.article_title_pic.style.setProperty("--background-img", "url('"+_thisRef.md_root+json_obj.pic+"')");
            }catch (error){}
            _thisRef.article_title_pic.style.opacity = "1.0";
            _thisRef.article_title_pic.style.filter = "blur(10px)";
            _thisRef.load_articles(_thisRef.md_root+json_obj.src);
            console.log("x: "+ evt.offsetX + ", y: "+evt.offsetY);
            let x = (evt.offsetX - block.clientWidth/2)/block .clientWidth;
            let y = (evt.offsetY - block.clientHeight/2)/block.clientHeight*2;
            console.log("x: "+x+", y: "+y);
            block.style.transform = "rotateX("+(-y/10)+"deg) rotateY("+(x/5)+"deg)";
        }
        return block;
    }

    async clear_components (){
        if(this.articles_reader.childElementCount > 0) {
            for (let i = 0; i < this.articles_reader.childElementCount; i++) {
                this.articles_reader.children[i].style.opacity = "0";
                this.articles_reader.children[i].style.transform="translateZ(2)";
                await sleep(250/this.articles_reader.childElementCount);
            }
            await sleep(501);
        }
        this.articles_reader.innerHTML = '';
    }

    async show_components (){
        let _thisRef = this;
        this.gradient_mask.style.height = _thisRef.obj_content_container.scrollHeight+"px";
        for (let i = 0; i < this.articles_reader.childElementCount; i++) {
            await sleep(250/this.articles_reader.childElementCount);
            this.articles_reader.children[i].style.opacity = "1.0";
            this.articles_reader.children[i].style.transform="translateZ(0px)";
            this.gradient_mask.style.height = _thisRef.obj_content_container.scrollHeight+"px";
        }
        this.gradient_mask.style.height = _thisRef.obj_content_container.scrollHeight+"px";
        setTimeout(function (){
            _thisRef.gradient_mask.style.height = _thisRef.obj_content_container.scrollHeight+"px";
        },501);
    }

    async load_articles (link) {
        let _thisRef = this;
        this.scrollToTop();
        this.article_page_idx.style.opacity = "0.0";
        await this.clear_components();
        let mdFile = new XMLHttpRequest();
        this.articles_list_title.style.pointerEvents="all";
        mdFile.open("get", link);
        mdFile.send(null);
        mdFile.onload = function () {
            if (mdFile.status === 200) {
                let article_container = document.createElement("div");
                article_container.classList.add("article_container");
                article_container.style.width = "100%";
                article_container.innerHTML=marked.parse(mdFile.responseText);
                _thisRef.articles_reader.appendChild(article_container);
                hljs.highlightAll();
                _thisRef.show_components();
            }
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