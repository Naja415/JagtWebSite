var billedtitle = "Jagtbilleder";
var counter = 0;

var count = 0; 
var highscore = 0; 

var x = 0;	
var y = 0;	
var gruppe = "";
var art = "";
var local = [];

var b = false; 
var obj = JSON.parse(data);

function generateVariables(){
  x = Math.floor(Math.random() * obj.Animals.length); //hvilken index of dyr 
  y = Math.floor(Math.random() * obj.Animals[x].Links.length); //hvilket index of link på dyre objektet
  gruppe = obj.Animals[x].Gruppe;
  art = obj.Animals[x].Art;
}

//slet billede 
function sletBillede(){
  obj.Animals[x].Links.pop();
	generateVariables();
	findLikewise();
	changeImage();
	setOptions();
    changePictureText();
};

//check 
function check(){
	if(b==false){
		generateVariables();
		findLikewise();
		changeImage();
		setOptions();
    	changePictureText();
		b = true;
	} else {
		submitAnswer();
	}
}


function submitAnswer() {
  var radios = document.getElementsByName('choice');
  var val= "";
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
         val = radios[i].value; 
         break;
       }
  }
  if (val == "" ) {
    alert('Fill in');
  } else if (val == art) {

    alert('Korrekt!');
    count++;

	if(count > highscore){
		highscore = count; 
	}

    changeCounter();
	generateVariables();
	findLikewise();
	changeImage();
	setOptions();
    changePictureText();

  } else {
    count = 0;
    changeCounter();
    alert('Forkert');
  }
};

function changeImage(){
    var img = document.getElementById("img");
    img.src = obj.Animals[x].Links[y];
};

function findLikewise(){
	local = [];

	for (var i = 0; i < obj.Animals.length; i++) {
		if(obj.Animals[i].Gruppe == gruppe && i != x){
			console.log(obj.Animals[i].Gruppe);
			console.log(gruppe);
			local.push(i);
		}
	}
}


function setOptions(){

	//random fra local
	var a = Math.floor(Math.random() * local.length);
	a = local[a];
	local.splice(a,a);
	var b = Math.floor(Math.random() * local.length);
	b = local[b];


	//arterne fra random 
	var a_art = obj.Animals[a].Art;
	var b_art = obj.Animals[b].Art;
	var c_art = art;

	//svar array
	var answers = [];
	answers.push(a_art);
	answers.push(c_art);

	while(answers.length != 3){
		
		if(answers.includes(b_art)){
			b = Math.floor(Math.random() * local.length);
			b = local[b];
			b_art = obj.Animals[b].Art;
		} else {
			answers.push(b_art);
		}
	}

	shuffle(answers);

	var html = '<form>';
	for (var i = 0, length = answers.length; i < length; i++) {
			var s = answers[i];
			html += '<input type="radio" onclick="submitAnswer()" name="choice" value="'+ s +'">' + '<label for="'+s+'">'+s+'</label>';
	}
	html += '</form>';
	document.getElementById('log').innerHTML = html;
}


function changePictureText(){
    var subtitle = document.getElementById("billedtitle");
    subtitle.innerHTML  = gruppe;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function changeCounter(){
    var cont = document.getElementById("counter");
    cont.innerHTML  = "score: " + count +  '<br>' +"highscore: " + highscore;
}

function exportJSON(){
	console.log("data = '" + JSON.stringify(obj) + "'")
};
