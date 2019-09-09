function tplReplace(){
    return /{{(.*?)}}/g;
}

function thumbShow(dom){
    dom.on('load', function() {
        console.log($(this).css())
        $(this).css('opacity', 2)
    })
}

module.exports = {
    tplReplace,
    thumbShow
}