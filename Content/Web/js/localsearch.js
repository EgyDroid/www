function localPrev(elm) {
    localMove(elm, -1);
}
function localNext(elm) {
    localMove(elm, 1);
}
function localMove(elm, step) {
    var box = getParentBoxId4(elm);
    if (box) {

        var page = parseInt(box.getAttribute("currentLocalPage"));
        if (typeof page === 'undefined' || page === null || isNaN(page))
            page = 1;

        var nextElements = $(".LocalsearchTbl[page='" + (page + step) + "']", box);
        if (nextElements.size() > 0) {
            $(".LocalsearchTbl[page='" + page + "']", box).css("display", "none");
            page += step;
            nextElements.css("display", "");
            box.setAttribute("currentLocalPage", page);
        }
        updateDisabledButtons(box, elm, page);
        updatePage(box, elm, page);
    }
}
function updateDisabledButtons(box, elm, page) {
    var buttons = elm.parentElement.children;
    var nextElements = $(".LocalsearchTbl[page='" + (page + 1) + "']", box).size();
    var prevElements = $(".LocalsearchTbl[page='" + (page - 1) + "']", box).size();
    if (prevElements > 0)
        $(buttons[0]).removeClass('disabled');
    else
        $(buttons[0]).addClass('disabled');

    if (nextElements > 0)
        $(buttons[1]).removeClass('disabled');
    else
        $(buttons[1]).addClass('disabled');
}
function updatePage(box, elm, page) {
    var spn = $(".pageNumber", elm.parentElement.parentElement);
    if (spn.size() > 0) {
        spn.text("page " + page);
    }
}
function getParentBoxId4(element) {
    var parent = element;
    while (parent != null) {
        var id = parent.getAttribute("id");
        if (id !== null && (id.indexOf('tab') == 0) && id !== undefined) {
            return parent;
        }
        parent = parent.parentElement;
    }
}