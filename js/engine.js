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
    $.ajax({
        url: "getSlides.php",
        data: {
        url:url,
        type:type,
        id:id
        },
        success: function( data ) {
        //$( "#weather-temp" ).html( "<strong>" + data + "</strong> degrees" );
        //alert(data);
        //$('#canvas').html(data);
        nav.total = data.length;
        nav.slides = data;
        nav.showSlide();
        }
    });
}

function showSlide(num) {
    num = (num==='' || num===null || typeof(num)=="undefined")?0:num;
    this.current=num;
    $("#canvas").html(num+1+" of "+this.total+"<br />2<br /><b>"+this.slides[num][0]+"</b><p>"+this.slides[num][1]+"</p>");
}

function Navigator () {
    this.current = 0;
    this.total = 1;
    this.slides;
    
    this.loadSlides = loadSlides;
    this.showSlide = showSlide;
}

var nav = new Navigator();

$(document).ready(firstAndForemost);