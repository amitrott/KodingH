function firstAndForemost() {
    $(document.body).css("background-color",rainbow);
}

function rainbow() {
    r = Math.floor((Math.random() * 15) + 0).toString(16);
    g = Math.floor((Math.random() * 15) + 0).toString(16);
    b = Math.floor((Math.random() * 15) + 0).toString(16);
    return "#"+r+g+b;
}

function loadSlides (url,type,id) {
    nav.fullURL = url;
    $.ajax({
        url: "getSlides.php",
        data: {
        url:url,
        type:type,
        id:id
        },
        success: function( data ) {
        nav.url=url;
        nav.type=type;
        nav.id=id;
        nav.total = data.length;
        nav.slides = data;
        nav.showSlide();
        }
    });
}

function loadShortSlides () {
    $.ajax({
        url: "getShortSlides.php",
        cache:false,
        data: {
        url:this.url,
        type:this.type,
        id:this.id,
        slide:this.current
        },
        success: function( data ) {
        nav.showShortSlide(nav.current,data);
        }
    });
}

function showSlide(num,resp) {
    num = (num==='' || num===null || typeof(num)=="undefined")?0:Number(num);
    an = num+1 < this.total ? "<a href=\"javascript:nav.showSlide('"+Number(num+1)+"');\">Next</a>":"";
    ap = num === 0 ? "":"<a href=\"javascript:nav.showSlide('"+Number(num-1)+"');\">Previous</a>";
    $('#canvas').fadeOut("fast").html(Number(num+1)+" of "+this.total+"\
    <br /><a href=\""+this.fullURL +"\">View full document</a>\
    <br /><a href=\"javascript:nav.loadShortSlides();\">This slide is too long!  Show only 5 lines.</a><br />\
    <b>"+this.slides[num][0]+"</b><p>"+this.slides[num][1]+"</p>\
    <br />"+ap+" "+an);
    $('#canvas').fadeIn("fast");
    this.current = num;
}

function showShortSlide(num,resp) {
    num = (num==='' || num===null || typeof(num)=="undefined")?0:Number(num);
    an = num+1 < this.total ? "<a href=\"javascript:nav.showSlide('"+Number(num+1)+"');\">Next</a>":"";
    ap = num === 0 ? "":"<a href=\"javascript:nav.showSlide('"+Number(num-1)+"');\">Previous</a>";
    $('#canvas').fadeOut("fast").html(Number(num+1)+" of "+this.total+"\
    <br /><a href=\""+this.fullURL +"\">View full document</a><br />\
    <b>"+this.slides[num][0]+"</b><p>"+resp[1]+"</p>\
    <br />"+ap+" "+an);
    $('#canvas').fadeIn("fast");
}

function Navigator () {
    this.current = 0;
    this.total = 1;
    this.slides;
    this.fullURL;
    this.url;
    this.type;
    this.id;
    
    this.loadSlides = loadSlides;
    this.showSlide = showSlide;
    this.loadShortSlides = loadShortSlides;
    this.showShortSlide = showShortSlide;
}

var nav = new Navigator();

$(document).ready(firstAndForemost);