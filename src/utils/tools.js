function tplReplace(){
    return /{{(.*?)}}/g;
}

function thumbShow(dom){
    dom.on('load', function() {
        // console.log($(this).css())
        $(this).css('opacity', 2)
    })
}

function scrollToBottom(callback) {
    if(_getScrollTop() + _getWindowHeight() == _getScrollHeight()){
        callback()
    }
}

module.exports = {
    tplReplace,
    thumbShow,
    scrollToBottom
}


/****************************** 内部方法 *********************************/

function _getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
   
  function _getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }
  
  function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }