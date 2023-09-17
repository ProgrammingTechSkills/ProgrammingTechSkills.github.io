function loadTutorials(){
    $('#content').html(
        '<div class="coursesWindows"></div>'
        );
    tutorialsData = getjsondata('./Js/json/Tutorials.json');
    for(var tutorial=0;tutorial<tutorialsData['tutorials'].length;tutorial++){
        appendTutorialCard(tutorialsData['tutorials'][tutorial]);
    }
}

function appendTutorialCard(scourse){
    $('.coursesWindows').append(
        '<div class="courseCard" onclick="openTutorial(\''+scourse['file']+'\')">'+
        '<div class="content">'+
            '<h1 class="CourseTitle">'+scourse['title']+' </h1>'+
            '<img class="courseImg" src="'+scourse['img']+'" />'+
            '<p class="courseDescription">'+
                scourse['description']+
            '</p></div></div>'
    );
}

function openTutorial(source){
    $('#content').html(
        '<div class=\'tutorialSideMenu\'></div>'+
        '<div class=\'tutorialMainWindow\'>'+
        '<button class="previous tutorialbutton" onclick="previoustutorial()"> Previous </button>'+
        '<button class="next tutorialbutton" onclick="nexttutorial()"> Next </button>'+
        '<div class=\'tutorialwindow\'></div>'+
        '<button class="previous tutorialbutton" onclick="previoustutorial()"> Previous </button>'+
        '<button class="next tutorialbutton" onclick="nexttutorial()"> Next </button>'+
        '</div>'
        );
    tutorialjson = getjsondata("Js/json/"+source)['tutorial'];
    topics = tutorialjson.topics
    filename = source.split(".")[0];
    let tutorialid = 0+"_"+filename;
    for(var i=0;i<topics.length;i++){
        $('.tutorialSideMenu').append(
            "<lable class='tutorialtopic'>"+topics[i]+"</lable>"
        );
        subtopics = tutorialjson[topics[i]]
        for(var j=0;j<subtopics.length;j++){
            $('.tutorialSideMenu').append(
                "<lable id='"+j+"_"+filename+"' onclick='loadtutorial(\""+j+"_"+filename+"\")' class='tutorialsubtopic' >"+subtopics[j]+"</lable>"
            );
        }
    }
   loadtutorial(tutorialid);
}

function loadtutorial(id){

    values = id.split("_");
    var Djson = null;
    try{
        Djson = getjsondata("Js/json/"+values[1]+".json")["list"][parseInt(values[0])];
        if(Djson+"" == 'undefined'){
           return;
        }
    }catch(e){
        return;
    }
    loadTutorialContent(Djson);
    if($('#'+tutorialid).hasClass('selected')){
        $('#'+tutorialid).removeClass('selected');
    }
    tutorialid = id;
    $('#'+tutorialid).addClass('selected');
}

function nexttutorial(){
    id=tutorialid;
    if(id != null){
        values = id.split('_');
        loadtutorial((parseInt(values[0])+1)+"_"+values[1]);
    }
}

function previoustutorial(){
    id=tutorialid;
    if(id != null){
        values = id.split('_');
        num = parseInt(values[0])-1;
        if(num>=0){
            loadtutorial(num+"_"+values[1]);
        }
    }
}

function loadTutorialContent(json){
    $('.tutorialwindow').html("");
    $('.tutorialwindow').html(
        "<h1>"+json['title']+'</h1>'+
        json.Content.join());
}