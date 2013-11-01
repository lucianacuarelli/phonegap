$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + '?id='+id, displayEmployee);
});

var word;
var remainingLetters;
var secret;

//----------------------------
// init
//----------------------------
function displayEmployee(data) {
	$('#use-debug').attr(data);
	
	//Obtem lista de palavras retornadas do JSON para o exercício selecionado
	var information = data[0].information;
	//Coloca tudo em letra maiuscula
	information = information.toUpperCase();
	//Obtem palavras individuais
	var arWords = information.split(",");
	//Randomiza a seleção de palavras
	var word = arWords[Math.floor((Math.random()*arWords.length)+1)];
	
	//Palavra secreta
	secret = word.replace(/./g, '_');
	$('#secret').text(secret);
	
	$('#title').html(data[0].title);
	$('#description').html(data[0].description);
	$('#exerciseContent').html(word);
	
	$('.letters span').click(function(event){
		var letter = event.target.innerText;
		$(event.target).unbind("click");
		$(event.target).addClass("disabled");
		processLetter(letter);
	});
	
	/*$('#employeePic').attr('src', 'pics/james_king.png');
	alert(exercise.title);
	
	alert(exercexerise.description);
	$('#city').text(exercise.exer);
	alert(exercise.exer);*/
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function replaceAt(str,index,chr) {
    if(index > str.length-1) return str;
    alert(str.substr(0,index) + chr + str.substr(index+1));
    return str.substr(0,index) + chr + str.substr(index+1);
}

function processLetter(letter) {
	var found = false;
	for (var i = 0 ; i < remainingLetters.length ; i++) {
		if (remainingLetters.charAt(i) == letter) {
			remainingLetters = remainingLetters.replaceAt(i, '_');
			secret = replaceAt(secret, i, letter);
			$('#secret').text(secret);
			found = true;	
		}		
	 }      
	if (found) {
		$('#secret').text(secret);
		if (secret.indexOf('_') == -1) {
			alert('Você ganhou!');
			location.reload();
		}else {
			currentImage++;
			var imageId = "#hangman_" + currentImage;
			$(imageId).fadeTo(300, 1.0, function() {
				if (currentImage == 7) {
					$('#secret').text(word);
					alert('Você perdeu!');
					location.reload();

				};
			});
		}
	}
}