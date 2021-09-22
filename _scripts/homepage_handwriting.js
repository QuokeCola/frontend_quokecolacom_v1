let homepage_paths = new Array();
let homepage_hello = document.getElementById("homepage_hello");

function homepage_handwriting_initiate() {
    for (let i = 0; i < 10; i++){
        homepage_paths[i] = document.getElementById("homepage_line"+i);
        homepage_paths[i].style.strokeDashoffset = homepage_paths[i].getTotalLength();
        homepage_paths[i].style.strokeDasharray = homepage_paths[i].getTotalLength();
        console.log(homepage_paths[i].getTotalLength());
    }
    homepage_hello.style.strokeDashoffset = "100%";
    homepage_hello.style.strokeDasharray = homepage_hello.getTotalLength();
    homepage_hello.style.strokeDashoffset = "0%";
    for (let i = 0; i < 10; i++){
        homepage_paths[i].style.strokeDashoffset = "0%";
    }
}

