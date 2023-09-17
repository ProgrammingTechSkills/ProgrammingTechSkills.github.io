function show(id){
    if($('#'+id).hasClass('show')){
        $('#'+id).removeClass('show');
        $('#'+id).addClass('hide');
    }else{
        $('#'+id).removeClass('hide');
        $('#'+id).addClass('show');
    }
}

function loadBlogs(){
    var blogs = getjsondata("Blogs").Blogs;
    $("#content").html("");
    for(var i=0;i<blogs.length;i++){
        $("#content").append(
            '<div onclick=\'loadblog("'+blogs[i].ContentKey+'")\' class=\'blogcard\'>'+
                '<h1>'+blogs[i].title+'</h1>'+
                '<p>'+blogs[i].subcontent+'</p>'+
            "</div>"
        );
    }
    $('#content').append("<div id='blogw' class='blogwindow hide'></div>");

}

function loadblog(key){
    jsondata = getjsondata("Blogs")[key];
    if(jsondata+"" == "undefined"){
        return;
    }
    $(".blogwindow").html(
        "<button onclick=\'show(\"blogw\")\' class='close'>X</button>"+
        createContent(jsondata)
    )
    show('blogw');
}

function createContent(jsondata){
    return "<div class=\"blog\">"+jsondata.join("")+"</div>";
}

