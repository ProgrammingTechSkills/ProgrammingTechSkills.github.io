function loadCourses(){
    $('#content').append(
        '<div class="coursesWindows"></div>'
        );
    coursesData = getjsondata('./Js/json/Courses.json');

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
    courseContent = getjsondata('Js/json/'+course);
    console.log(courseContent);
    $('#content').html("<div class='mainwindow'></div>");
    $('.mainwindow').html(
        "<div class='video'></div>"+
        "<div class='menuWindow'></div>");

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
            '<button onclick="loadVideo(\''+
            video['videoid']+
            '\')" class="option">'+
            video['title']+
            '</button>'
        );
    }

}

function loadVideo(videoid){
    $('#youtubeiframe').attr('src','https://www.youtube.com/embed/'+videoid+'?autoplay=1&fs=1&iv_load_policy=3');
}