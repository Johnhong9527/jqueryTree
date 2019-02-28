$(document).ready(function () {
    const log = console.log;
    // setInterval(function () {
    //     setLine()
    // }, 50)
$('#reload').on('click',function(){
    setLine()
})
    function setLine() {
        $.each($('.title'), function (i, v) {
            const $child = $(v).siblings('.children');
            const $childBox = $child.children('.children-box');
            const lastChildBox = $($childBox[$childBox.length - 1]);
            const titleLeftLine = $(v).children('.line');
            log(lastChildBox)
            if (lastChildBox.length > 0) {
                if (titleLeftLine.length > 0) {
                    titleLeftLine.css({
                        height: lastChildBox.offset().top - titleLeftLine.offset().top + 19
                    })
                }
            } else {
                const $childTitle = $child.children('.title');
                if ($childTitle.length > 0 && titleLeftLine.length > 0) {
                    titleLeftLine.css({
                        height: $childTitle.offset().top - titleLeftLine.offset().top + 9
                    })
                }

            }
            // 如果出现多个children-box
            const $siblingsChild = $(v).siblings('.children');
            if($siblingsChild.length>1 && titleLeftLine.length>0){
                let lastSiblingsChild = $siblingsChild[$siblingsChild.length-1]
                titleLeftLine.css({
                    height: $(lastSiblingsChild).offset().top - titleLeftLine.offset().top + 19
                })
            }

        })

    }

    const titles = $('.title');
    // 初始化箭头
    $.each(titles, function (i, v) {
        $(v).append('<i></i>')
        const arrowDom = $(v).children('i');
        arrowDom.data('arrow', 'right');
        arrowDom.addClass('glyphicon glyphicon-triangle-right')
        if (i > -1) {
            $(v).siblings('.children').hide()
        }
    })
    titles.on('click', function (e) {
        e.stopPropagation();
        // setTimeout(function () {
        //     setLine()
        // }, 30)
        const children = $(this).siblings('.children');
        // 设置arrow箭头动画
        children.toggle(400);
        $(this).children('.line').toggle(400);

        $.each(children.find('.title'), function (i, v) {
            if (!$(v).children('.left-line').length) {
                $(v).append('<div class="left-line"></div>')
            }
        })
        if (!$(this).children('.line').length) {
            // log($(this).siblings('.children')[0])
            if ($(this).siblings('.children').length > 0) {
                $(this).append('<div class="line"></div>')
            }
        }

        // 设置纵线长度
        let arrowDom = $(this).children('i');
        let arrow = arrowDom.data('arrow');
        if (arrow) {
            if ($(this).siblings('.children').length === 0) return
            if (arrow === 'right') {
                arrowDom.data('arrow', 'bottom');
                arrowDom.removeClass(' glyphicon-triangle-right');
                arrowDom.addClass(' glyphicon-triangle-bottom');
            } else {
                arrowDom.data('arrow', 'right');
                arrowDom.removeClass(' glyphicon-triangle-bottom');
                arrowDom.addClass('glyphicon-triangle-right');
            }

        }
    });

});