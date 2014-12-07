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
        nav.total = data.length;
        nav.slides = data;
        nav.showSlide();
        }
    });
}

function showSlide(num) {
    num = (num==='' || num===null || typeof(num)=="undefined")?0:Number(num);
    this.current=num;
    an = num+1 < this.total ? "<a href=\"javascript:nav.showSlide('"+Number(num+1)+"');\">Next</a>":"";
    ap = num === 0 ? "":"<a href=\"javascript:nav.showSlide('"+Number(num-1)+"');\">Previous</a>";
    $('#canvas').fadeOut("fast").html(Number(num+1)+" of "+this.total+"\
    <br /><a href=\""+this.fullURL +"\">View full document</a><br />\
    <b>"+this.slides[num][0]+"</b><p>"+this.slides[num][1]+"</p>\
    <br />"+ap+" "+an);
    $('#canvas').fadeIn("fast");
}

function Navigator () {
    this.current = 0;
    this.total = 1;
    this.slides;
    this.fullURL;
    
    this.loadSlides = loadSlides;
    this.showSlide = showSlide;
}

var nav = new Navigator();

$(document).ready(firstAndForemost);