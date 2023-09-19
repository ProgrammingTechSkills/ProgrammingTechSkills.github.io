function loadTutorials(){
    $('#content').html(
        '<div class="coursesWindows"></div>'
        );
    tutorialsData = getjsondata('Tutorials');
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
    tutorialjson = getjsondata(source)['tutorial'];
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
        Djson = getjsondata(values[1])["list"][parseInt(values[0])];
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
    for(var i=0;i<json.Content.length;i++){
        console.log(json.Content[i].includes("file:"));
        if (json.Content[i].includes("file:")){
            filename = json.Content[i].split(":")[1];
            json.Content[i] = "<pre>"+
            '<label onclick=\'copycode("'+filename+'",self)\' class="codeCopy"> Copy </label>'+
            '<code class="language-python codeTag">'+
            getfilecontent(filename)
            +'</code>'+
            "</pre>"
        }
    }
    console.log(json);
    $('.tutorialwindow').html(
        "<h1>"+json['title']+'</h1>'+
        json.Content.join(""));
        Prism.highlightAll();
}

function copycode(filename,self){
    navigator.clipboard.writeText(
        getfilecontent(filename)
    );
    alert("coppied");
}