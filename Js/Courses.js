function loadCourses(){
    $('#content').append(
        '<div class="coursesWindows"></div>'
        );
    coursesData = getjsondata('Courses');

    var scourse = null;
    for(var course=0;course<coursesData['coursesList'].length;course++){
        appendCourseCard(coursesData[coursesData['coursesList'][course]]);
    }
}

function appendCourseCard(scourse){
    $('.coursesWindows').append(
        '<div  onclick="OpenCourse(\''+scourse['file']+'\')" class="courseCard">'+
        '<div  class="content">'+
            '<h1 class="CourseTitle">'+scourse['title']+'</h1>'+
            '<img class="courseImg" src="'+scourse['img']+'" />'+
            '<p class="courseDescription">'+
                scourse['description']+
            '</p></div></div>'
    );
}

function OpenCourse(course){
    courseContent = getjsondata(course);
    console.log(courseContent);
    $('#content').html("<div class='mainwindow'></div>");
    $('.mainwindow').html(
        "<div class='video'></div>"+
        "<div class='menuWindow'></div>"+
        "<div class='tutorials'></div>");

    $('.menuWindow').html(
        '<h2 class="topic"> '+courseContent['title']+' </h2>'+
        '<div class="listwindow"></div>'
    );
    $('.listwindow').html(
        '<div class="list"></div>'
    );

    $('.video').html(
        '<iframe id="youtubeiframe" scrolling="no" width="900" height="500" type="text/html" '+
        'src="https://www.youtube.com/embed/'+
        courseContent['videos'][0]['videoid']
        +'?autoplay=1&fs=1&iv_load_policy=3"></iframe>'
    );
    
    for(var i=0;i<courseContent['videos'].length;i++){
        video = courseContent['videos'][i];
        $(".list").append(
            '<button onclick="loadVideo(\''+i+"_"+course+
            '\')" class="option">'+
            video['title']+
            '</button>'
        );
    }
    console.log(courseContent['videos'][0].tutorialIds);
    $('.tutorials').html(
        getVideoTutorialContent(courseContent.list,
            courseContent['videos'][0].tutorialIds.join(",").split(",")
            )
    );
}

function loadVideo(info){
    listdetails = info.split("_");
    jsonContent = getjsondata(listdetails[1]);
    video = jsonContent.videos[parseInt(listdetails[0])];
    tlistid = video.tutorialIds;
    tcontent = jsonContent.list;
    $('#youtubeiframe').attr('src','https://www.youtube.com/embed/'+video.videoid+'?autoplay=1&fs=1&iv_load_policy=3');

    $('.tutorials').html(
        getVideoTutorialContent(tcontent,tlistid)
    );

}

function getVideoTutorialContent(json,numbers){
    html = "";
    for(var i=0;i<numbers.length;i++){
       html = html+"<h1>"+json[numbers[i]]['title']+'</h1>'+
       json[numbers[i]].Content.join("");
    }
    console.log(html);
    return html;
}