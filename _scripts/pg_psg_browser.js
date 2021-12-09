// Create reference instance
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/marked.min.js'></script>");
document.write("<script language=javascript src='/_scripts/dependencies/highlight.min.js'></script>");

function passage_browser(){
    let passage_reader          = document.getElementById("passage_reader");
    let passage_tag_selector    = document.getElementById("tags_selector");
    let psglist_loc = "/src/psglists.json"
    let psg_request = new XMLHttpRequest();
    const max_item_num= 20;
    let psglist_json;
    let load_list_executing = false;
    let load_list_temptag   = null;
    let load_list_temppage  = null;
    // For return from passage.
    let curr_tag = 'all';
    let curr_page = 1;
    let topline_colors = [  'orangered','orchid','darkcyan','deeppink','darkslateblue','darksalmon','CadetBlue','CornflowerBlue',
                            'Gold', 'GreenYellow','IndianRed','LightCoral'];

    this.initiate = function () {
        // Compile
        psg_request.open("get", psglist_loc);
        psg_request.send(null);
        psg_request.onload = function () {
            if (psg_request.status === 200) {
                psglist_json = JSON.parse(psg_request.responseText);
                console.log(typeof psglist_json[0]);
                load_list('all',1);
                load_tag();
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let load_tag = function () {
        try{
            let tag_list = [];
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
                passage_tag_selector.appendChild(div);
            }
        } catch (TypeError) {}
    }

    this.load_list = function (search_tag, page_num) {
        load_list(search_tag,page_num);
    }

    let load_list = async function (searchtag, pagenum) {
        curr_tag = searchtag;
        curr_page= pagenum;
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
        if(passage_reader.childElementCount > 0) {
            for (let i = 0; i < passage_reader.childElementCount; i++) {
                passage_reader.children[i].style.opacity = "0";
                passage_reader.children[i].style.transform="translateZ(-1)";
                passage_reader.children[i].style.filter="blur(10px)";
                await sleep(250/passage_reader.childElementCount);
            }
        }
        await sleep(250);
        passage_reader.innerHTML = '';

        /**Adding Elements to main view*/
        if(searchtag==='all') {
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num > psglist_json.length)?
                (pagenum*max_item_num+max_item_num):psglist_json.length); i++){
                try{
                    passage_reader.appendChild(make_link_div(psglist_json[i]));
                } catch (TypeError) {

                }
            }
        } else {
            let index = [];
            for (let i = 0; i < psglist_json.length; i++) {
                if(psglist_json[i].class.includes(searchtag)){
                    index.push(i);
                    console.log(searchtag);
                }
            }
            console.log(index);
            for(let i = (pagenum-1) * max_item_num; i<((pagenum*max_item_num > index.length)?
                (pagenum*max_item_num+max_item_num):index.length); i++){
                try{
                    passage_reader.appendChild(make_link_div(psglist_json[index[i]]));
                } catch (TypeError) {

                }
            }
        }
        load_list_executing = false;
        if(load_list_temptag!==null || load_list_temppage!==null) {
            passage_reader.innerHTML = '';
            await load_list(load_list_temptag, load_list_temppage);
            return;
        }
        /**Blocks show up sequentially*/
        for (let i = 0; i < passage_reader.childElementCount; i++) {
            await sleep(250/passage_reader.childElementCount);
            passage_reader.children[i].style.opacity = "1.0";
            passage_reader.children[i].style.transform="translateZ(0px)";
            passage_reader.children[i].style.filter="blur(0px)";
        }
    }

    function make_link_div(json_obj) {
        /**Create block element*/
        let block = document.createElement("div");
        block.classList.add("passage_block");
        block.onclick = function () {
            console.log(json_obj.src);
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

    this.load_passage = function (link) {
        passage_reader.innerHTML=marked.parse(url(link));
        hljs.highlightAll();
    }

}