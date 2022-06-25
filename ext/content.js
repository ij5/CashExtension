let prevScroll = window.scrollY;

function getElementsByText(str, tag) {
    return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
}

getElementsByText("캐시 사용 내역", "span")[0].click();


let cash = {

};

let num = setInterval(() => {
    let list = document.getElementsByClassName("ReactVirtualized__Grid__innerScrollContainer");
    if(!list[0]) return;
    if (list[0].childNodes.length === 0) {
        return;
    }
    window.scrollTo({
        top: document.body.scrollHeight - window.innerHeight
    });
    if (Math.floor(prevScroll) == Math.floor(window.scrollY)){
        clearInterval(num);
        window.scrollTo({
            top: 0
        });
        calculateCash();
    }
    for(let li of list[0].childNodes){
        const c = li.childNodes[0].childNodes[1];
        if(c.className.includes("refund")) continue;
        cash[li.childNodes[0].childNodes[0].childNodes[0].textContent] = Number(c.textContent.replace("캐시", "").replace(/\,/g, ""));
    }
    prevScroll = window.scrollY;
}, 100);

function calculateCash(){
    let result = 0;
    for(let c in cash){
        result += cash[c];
    }
    alert("지금까지 사용한 총 캐시는 ["+result+"원]입니다.")
}

document.onload = function () {
    window.scroll({
        top: window.outerWidth
    });
}
