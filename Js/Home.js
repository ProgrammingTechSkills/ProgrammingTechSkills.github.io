// redirect to reload 
function getfilecontent(url){
  var date = new Date();
  var parameter = date.getDate()+date.getTime();
  var txt = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': url+"?id="+parameter,
    'dataType': "text",
    'success': function(data) {
      console.log(data);
      txt = data;
    }
  });
  console.log(txt);
  return txt;
}

function getjsondata(url) {
  var date = new Date();
  var parameter = date.getDate()+date.getTime();
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "Js/json/"+url+".json?id="+parameter,
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
  }

function changeContent(value){
  if(value == 'Home'){
    window.location.href = "/index.html";
  }else if(value == 'Courses'){
    $('#content').html("");
    loadCourses();
  }else if(value == 'Blogs'){
    loadBlogs();
  }else if(value == 'Tutorials'){
    loadTutorials();
  }
}

$("document").ready(function(){
    let homejson = getjsondata("Home");
   
    $('.YouTube').html(
      "<img class='logo' src='"+homejson['logo']+"'/>"+
      '<div><div class="like"> <img class="likeimg" src="'+homejson['likeicon']+'" /> Like </div>'+
      '<div class="share"> <img class="likeimg" src="'+homejson['shareicon']+'" /> Share </div>'+
      '<div class="subscribe"> Subscribe </div></div>'+
      '<i class="size12">Visit my channel</i>'
      );

    $('#logo').html(
      "<img class='logo' src='"+homejson['logo']+"'/>"
    )

    var coursejson = getjsondata('Courses');
    for(var course=0;course<homejson['HomePageCourses'].length;course++){
      appendCourseCard(coursejson[homejson['HomePageCourses'][course]]);
    }
  
  });

  


