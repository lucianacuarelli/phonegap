$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + '?id='+id, displayEmployee);
});

$(function() {

	var word;
	var remainingLetters;
	var secret;
	var currentImage = 1;
	
	function setup(theWord) {
		word = theWord.toUpperCase();
		remainingLetters = word;
		secret = word.replace(/./g, '_');
		$('#secret').text(secret);
	}
	
	var words=['CAT','CAR','BAG','BAR','CREEP','ANDROID']
	
	//Obtem lista de palavras retornadas do JSON para o exercício selecionado
	var information = data[0].information;
	//Coloca tudo em letra maiuscula
	information = information.toUpperCase();
	//Obtem palavras individuais
	var arWords = information.split(",");
	//Randomiza a seleção de palavras
	var theWord = arWords[Math.floor((Math.random()*arWords.length)+1)];

	setup(theWord);
					
	String.prototype.replaceAt = function(index, character) {
		return this.substr(0, index) + character + this.substr(index + character.length);
	}
	
 	function processLetter(letter) {
		var found = false;
		// alert(remainingLetters);
		for (var i = 0 ; i < remainingLetters.length ; i++) {
			//alert(remainingLetters.charAt(i));
			if (remainingLetters.charAt(i) == letter) {
				remainingLetters = remainingLetters.replaceAt(i, '_');
				secret = secret.replaceAt(i, letter);
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
	
					}
				});
			}
		}
	}
	
	$('.letters span').click(function(event){
		var letter = event.target.innerText;
		alert(letter);
		$(event.target).unbind("click");
		$(event.target).addClass("disabled");
		processLetter(letter);
	});
});


/*var word;
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
	
	remainingLetters = word;
	
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
}*/