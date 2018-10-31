
/*--------------------
文档装载完成后加载JS方法 
--------------------*/
function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
}

addLoadEvent(popUpHandler);

function popUpHandler() {
    $("#popUpBtn").click(function(e){
        e.stopPropagation();
        $("#popUpBoxCtnr").css("display", "flex");
    });

   $(body).click(function(e){
        e.stopPropagation();
        $("#popUpBoxCtnr").css("display", "none");
    });

    $("#popUpBoxCtnr").click(function(e) {
        e.stopPropagation();
    });
}

