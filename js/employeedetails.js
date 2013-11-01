
$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + '?id='+id, displayEmployee);
});
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
	
	$('#title').html(data[0].title);
	$('#description').html(data[0].description);
	$('#exerciseContent').html(word);
	
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

function Forca(params){

	var root = this.elemento = params.Elemento || document.body;
	this.Palavras = params.Palavras || []; // vetor de palavras
	this.Palavra =" ";  // palavra corrente
	this.Erros = 0; // número de errros
	this.Boneco = " "; // desenho do boneco
	
	this.Teclado = function(){ // metodo responsável por montar o teclado.
	var teclado = document.getElementById("forca_teclado");
	if(!teclado){
	teclado = document.createElement("div");
	teclado.setAttribute("id","forca_teclado");
	teclado.setAttribute("class","teclado");
	for(var i = 65; i < 91; i++){
	var tecla = document.createElement("div");
	tecla.setAttribute("class","tecla");
	tecla.innerHTML = String.fromCharCode(i);
	tecla.setAttribute("title",String.fromCharCode(i));
	if(tecla.addEventListener )
	tecla.addEventListener(‘click’,function(){ root.Validar(this); },false);
	else
	tecla.attachEvent(‘onclick’,function(e){ root.Validar(event.srcElement);  });
	teclado.appendChild(tecla);
	}
	elemento.appendChild(teclado);
	}
	}
	this.Sorteio = function(){ //Método responsável pelo sorteio de uma nova palavra.
	var novoIndice = Math.ceil(Math.random()*params.Palavras.length-1)
	root.Palavra = params.Palavras[novoIndice];
	var painel = document.getElementById("forca_painel");
	if(!painel){
	painel = document.createElement("div");
	painel.setAttribute("id","forca_painel");
	painel.setAttribute("class","painel");
	elemento.appendChild(painel)
	}
	painel.innerHTML = "";
	for(var i = 0; i < root.Palavra.length;i++){
	var letra = document.createElement("div");
	letra.setAttribute("id",root.Palavra.substr(i,1));
	letra.setAttribute("class","letra");
	letra.innerHTML = "";//root.Palavra.substr(i,1);
	painel.appendChild(letra);
	}
	}
	this.Validar = function(letra){   // Método responsável por validar e desenhar o boneco.
	var desenho = document.getElementById("forca_desenho");
	if(!desenho){
	desenho = document.createElement("div");
	desenho.setAttribute("id","forca_desenho");
	elemento.appendChild(desenho);
	}
	var boneco;
	if(root.Palavra.indexOf(letra.title) == -1){
	this.Erros++;
	switch(this.Erros){
	case 1: root.Boneco += "\n   o"; break;
	case 2: root.Boneco += "\n  \/"; break;
	case 3: root.Boneco += "|"; break;
	case 4: root.Boneco += "\\"; break;
	case 5: root.Boneco += "\n  /"; break;
	case 6: root.Boneco += " \\\n <button onclick=’window.location.reload(true);’ style=’padding:0px;width:85px;border:1px solid black;’>GAME OVER</button>"; break;
	}
	desenho.innerHTML = " <pre> "+root.Boneco+" </pre> ";
	}
	else
	{
	var indices = [];
	for(var i = 0; i < root.Palavra.length;i++)
	if(root.Palavra.substr(i,1) == letra.title) indices.push(i);
	painel = document.getElementById("forca_painel").getElementsByTagName("div");
	for(var i = 0; i < indices.length; i++)
	painel[indices[i]].innerHTML =  letra.title;
	}
	}
	this.Comecar = function(){ // Método responsável por iniciar tudo, criado só para deixar a chamada mais organizada!  ;-) 
	root.Teclado();
	root.Sorteio();
	}
}