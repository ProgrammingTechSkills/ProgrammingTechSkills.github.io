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
    var blogsJson = getjsondata("Js/json/Blogs.json");
    $("#content").html(
        '<div class="mainblogswindow"></div>'
    );
    $(".mainblogswindow").html(
        '<h1 class="mainblogTitle"> Blogs </h1>'+
        '<div class="courseBlogs"></div>'
    );
    for(var i=0;i<blogsJson.Blogs.length;i++){
        courseBlog = blogsJson.Blogs[i];
        id="C"+i;
        $(".courseBlogs").append(
            '<button class="courseBlogTitle" onclick="show(\''+id+'\');\"> '+courseBlog['title']+' </button>'+
            '<div id="'+id+'" class=\'hide\'></div>'
        );
        for(var j=0;j<courseBlog["topics"].length;j++){
            $("#"+id).append(
                '<div id="C'+i+'T'+j+'" class="show">'+
                '<button id="C'+i+'T'+j+'h" '+
                'onclick="loadBlog(\''+"C"+i+"T"+j+"div\',\'"+courseBlog.file+'\','+j+')"'
                +'class="blogtitle">'+courseBlog.topics[j]+'</button>'+
                '<div id="C'+i+'T'+j+'div" class="topicdive hide"></div>'+
            '</div>'
            );
        }
    }

}

function loadBlog(id,file,number){
    jsondata = getjsondata("Js/json/"+file);
    $('#'+id).html(
        jsondata.blogs[number]
    )
    show(id);
}

