function vPopup(info) {
    Open = true;
    embed.attr('src', 'http://www.youtube.com/embed/' + info.src);
    embed.css('display', "");
    tt.text(info.title);
    fs.text(info.size);
    pgLnk.attr('href', info.purl);
    mdLnk.attr('href', info.surl);
    mdLnk.text(info.sname);
    Popup();
    FixSize();
}
function injPopup(id) {
    Open = true;
    var elm = $("#" + id);
    elm.css("display", "");
    if (divInject.attr("openedBefore") !== "")
        divInject.html(elm);
    divInject.css('display', "");
    vImgN.css('display', "none");
    vImgP.css('display', "none");
    divInject.attr("openedBefore", "true");
    starrating();
    Popup();
    FixSize();
}
function iPopup($this, info) {
    Open = true;
    Popup();
	$(document).keyup(function(e) {
  	if (e.keyCode == 27) {kClose();}
	if (e.keyCode == 39) {
            vImgN.click(function () {
				if ($this.parentElement.parentElement.nextSibling != null) {
					vImgN.css('display', "");
                	showProg = false;
                	$this.parentElement.parentElement.nextSibling.childNodes[1].childNodes[1].onclick();
                	showProg = true;
                	return false;
					}
            }).trigger('click');
        
		}
	if (e.keyCode == 37) {
            vImgP.click(function () {
				if ($this.parentElement.parentElement.previousSibling != null) {
					vImgP.css('display', "");
                	showProg = false;
                	$this.parentElement.parentElement.previousSibling.childNodes[1].childNodes[1].onclick();
                	showProg = true;
                	return false;
					}
            }).trigger('click');
        
		}
	});
    img.attr('src', info.src);
    if (showProg) prog.css('display', "");
    sc.css('top', window.innerHeight / 2 - sc.height() / 2);
    sc.css('left', window.innerWidth / 2 - sc.width() / 2);
    vImgN.css('display', "none");
    vImgP.css('display', "none");
    vImgN.unbind('click');
    vImgP.unbind('click');
    img.load(function () {
        img.css('display', "");
        img.attr('alt', info.title);
        tt.text(info.title);
        fs.text(info.size);
        pgLnk.attr('href', info.purl);
        mdLnk.attr('href', info.iurl);
        mdLnk.text('Original Size');
        FixSize();

        if ($this.parentElement.parentElement.nextSibling != null) {
            vImgN.css('display', "");
            vImgN.click(function () {
                showProg = false;
                $this.parentElement.parentElement.nextSibling.childNodes[1].childNodes[1].onclick();
                showProg = true;
                return false;
            });
        }
        if ($this.parentElement.parentElement.previousSibling != null) {
            vImgP.css('display', "");
            vImgP.click(function () {
                showProg = false;
                $this.parentElement.parentElement.previousSibling.childNodes[1].childNodes[1].onclick();
                showProg = true;
                return false;
            });
        }
    });
}
function Popup() {
    if (!Open) return;
    so.width(window.innerWidth);
    so.height(window.innerHeight);
    so.css('display', "");
    bmc.css('display', "");
    sc.css('display', "");
}

function FixSize() {
    if (!Open) return;
    prog.css('display', "none");
    tp.css('display', "none");
    tt.width(0);
    sc.css('top', window.innerHeight / 2 - sc.height() / 2);
    sc.css('left', window.innerWidth / 2 - sc.width() / 2);
    tt.width(bmc.width() - 75);
    tp.width(bmc.width());
    tp.css('display', "");
    vImgN.height(img.height());
    vImgP.height(img.height());
}

function kClose() {
    so.fadeOut('slow');// css('display', "none");
    sc.fadeOut('slow', function () {
        Open = false;
        img.attr('src', '');
        embed.attr('src', '');
        img.css('display', "none");
        embed.css('display', "none");        
        bmc.css('display', "none");

        divInject.css('display', "none");
        prog.css('display', "");
        tt.text('');
        fs.text('');
        mdLnk.text('');
        tt.width(0);
        tp.width(0);
        sc.css('top', window.innerHeight / 2 - 166);
        sc.css('left', window.innerWidth / 2 - 157);
    });
   
}
var embed = $("#vEmbed");
var img = $("#vImg");
var so = $("#simplemodal-overlay");
var bmc = $("#basic-modal-content");
var sc = $("#simplemodal-container");
var tt = $(".sg_hct_i_tt");
var tp = $(".sg_hct");
var fs = $(".sg_hct_i_fs");
var prog = $("#prog")
var links = $(".sg_hct_i_src");
var pgLnk = $(links[0])
var mdLnk = $(links[1]);
var Open = false;
var vImgN = $("#vImgN");
var vImgP = $("#vImgP");
var showProg = true;
var divInject = $("#divInject");


$(window).resize(function () { Popup(); FixSize(); })