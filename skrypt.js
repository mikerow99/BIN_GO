var klikniete = new Array(); // tablica kliknietych pól na kuponie
var wartosci = new Array();  // tablica liczb z kuponu
var wylosowane = new Array();// tablica wylosowanych 


function kliknieto(co){
	wskaz = document.getElementById(co.id);
	//wskaz.id[7] - rzad
	//wskaz.id[8] - kolumna
	//alert(klikniete[wskaz.id[7]][wskaz.id[8]]);
	
	if(klikniete[wskaz.id[7]][wskaz.id[8]] == false){
		wskaz.innerHTML = "<div style='background-color: #f44545'>"+wskaz.innerHTML+"</div>";
		klikniete[wskaz.id[7]][wskaz.id[8]] = true;
	}
	else{
		//wartosci[parseInt(wskaz.id[7])-1][parseInt(wskaz.id[8]-1)];
		wskaz.innerHTML = wartosci[wskaz.id[7]][wskaz.id[8]];
		klikniete[wskaz.id[7]][wskaz.id[8]] = false;
	}
	//if(
}

//funkcja zapełniajaca tabelkę 5 x 5
function generujKupon(){
	byly = new Array();
	licznik = 0;
	bylo = false;
	for(i=0;i<5;i++){
		for(j=0;j<5;j++){
			rob = parseInt(Math.random()*80 + 1);
			for(l in byly){
				if(rob == byly[l]){
					bylo = true;
					//alert("BYŁO "+rob);
					break;
				}
			}
			if(bylo == true){
				j--;
				bylo = false;
				continue;
			}else{
				byly[licznik] = rob;
				licznik++;
				document.getElementById("komorka"+parseInt(i)+parseInt(j)).innerHTML = rob;
			}
		}
		wartosci[i] = new Array(byly[licznik-5], byly[licznik-4], byly[licznik-3], byly[licznik-2], byly[licznik-1]);
		klikniete[i] = new Array(false, false, false, false, false);
	}	
}

// losuj 80 liczb
function losuj(){
	for(i=0;i<80;i++){
		rob = parseInt(Math.random()*80 + 1);
		for(l in wylosowane){
			if(rob == wylosowane[l]){
				bylo = true;
				//alert("Było wylosowane "+rob);
				break;
			}
		}
		if(bylo == true){
			i--;
			bylo = false;
			continue;
		}else{
			wylosowane[i] = rob;
		}
	}
}
nr=0; 
function pokazWylosowane(){
	int = setInterval("pokazWylosowana()",500);
}
function pokazWylosowana(){
	if(nr==79){
		window.clearInterval(int);
	}
	//alert("Pod " + nr + " jest " + wylosowane[nr]);
	//document.getElementById("losowanie").innerHTML+=wylosowane[nr]+ " ";
	//document.getElementById("wylosowane"+parseInt((nr%5)+1)).innerHTML=wylosowane[nr];

	//$("#wyl5").fadeOut(1300);
	document.getElementById("wyl5").innerHTML=document.getElementById("wyl4").innerHTML;
	//$("#wyl5").fadeIn(400);
	//$("#wyl4").fadeOut(1300);
	document.getElementById("wyl4").innerHTML=document.getElementById("wyl3").innerHTML;
	//$("#wyl4").fadeIn(400);
	//$("#wyl3").fadeOut(1300);
	document.getElementById("wyl3").innerHTML=document.getElementById("wyl2").innerHTML;
	//$("#wyl3").fadeIn(400);
	//$("#wyl2").fadeOut(1300);
	document.getElementById("wyl2").innerHTML=document.getElementById("wyl1").innerHTML;
	//$("#wyl2").fadeIn(400);
	//$("#wyl1").fadeOut(1200);
	//$("#wyl1").fadeOut(400);
	document.getElementById("wyl1").innerHTML=wylosowane[nr];
	//$("#wyl1").fadeIn(100);

	$("#wyl1").animate({left: '+=50px'}, 5000);
	//animate({},500)
	
	nr++;
}

function sprawdzCzyBingo(){
	alert("Sprawdzam");
	licz5 = 0; // zlicza liczby w jednym rzędzie
	jestBingo = false; // sprawdza czy jest bingo
	for(i=0;i<5;i++){ // sprawdzaj w pionie
		for(j=0;j<5;j++){
			//sprawdzaj po kolei pionowo rzad - kolumna
			for(l=0;l<nr;l++){ 
				if(wartosci[j][i] == wylosowane[l]){ // byla ta wartosc
					licz5++;
				}
			}
			if(licz5==5){
				alert("JEST BINGO!");
				jestBingo = true;
			}
					
		}
		licz5 = 0;
		if(jestBingo == true)
			break;
	}

	for(i=0;i<5;i++){ // sprawdzaj w poziomie
		for(j=0;j<5;j++){
			//sprawdzaj po kolei pionowo rzad - kolumna
			for(l=0;l<nr;l++){ 
				if(wartosci[i][j] == wylosowane[l]){ // byla ta wartosc
					licz5++;
				}
			}
			if(licz5==5){
				alert("JEST BINGO!");
				jestBingo = true;
			}
					
		}
		licz5 = 0;
		if(jestBingo == true)
			break;
	}

	
	if(jestBingo == true){
		// wywolaj funkcje podliczajacą punkty
		podliczPunkty();
	}else{
		przegrana();
	}
	//klikniete[i][j] = true;
}

function podliczPunkty(){
	// jesli wszystkie miał kliknięte to więcej (500)
	// jesli nie to 100
	// im mniejszy przedzial czasu - im mniejszy nr tym wiecej punktow
	punkty = 0;
	// sprawdz ile rzedow jest trafionych
	//pion - 200 za jeden
	licz5 = 0;
	liczKlik5 = 0;
	ilePomaranczowych = 0;
	ileZielonych = 0;
	for(i=0;i<5;i++){ // sprawdzaj w pionie
		for(j=0;j<5;j++){
			for(l=0;l<nr;l++){
				if(wartosci[j][i] == wylosowane[l]){ // byla ta wartosc
					if(klikniete[j][i] == true){
						liczKlik5++;
					}
					licz5++;
				}
			}
			if(klikniete[j][i] == true){
					// zaznacz wszystkie pola jako złe
					naPomaranczowo = document.getElementById("komorka"+j+i);
					alert(naPomaranczowo.id);
					naPomaranczowo.innerHTML = "<div style='background-color: #ffc900; color: #ff4400'>"+wartosci[j][i]+"</div>";
					ilePomaranczowych++;
			}
			if(licz5==5)
				punkty += 500; // 100 * 5	
			if(liczKlik5==5)
				punkty += 2500;
		}	
		licz5 = 0;
		liczKlik5 = 0;
	}
	for(i=0;i<5;i++){ // sprawdzaj w poziomie
		for(j=0;j<5;j++)
			for(l=0;l<nr;l++)
				if(wartosci[i][j] == wylosowane[l]){ // byla ta wartosc
					if(klikniete[i][j] == true){
						liczKlik5++;
						naZielono = document.getElementById("komorka"+i+j);
						alert(naZielono.id);
						naZielono.innerHTML = "<div style='background-color: #9ce14f; color: #0cb11c'>"+wartosci[i][j]+"</div>";
						ileZielonych++;
					}
					licz5++;
				}
			if(licz5==5)
				punkty += 1000; // 200 * 5	
			if(liczKlik5==5)
				punkty += 3000;	
		licz5 = 0;
		liczKlik5 = 0;
	}
	ileDodac = (80 - nr) * 1000; //im w krótszym czasie się doda tym lepiej
	punkty += ileDodac;
	ileOdjac = (ilePomaranczowych - ileZielonych) * 2000;
	punkty -= ileOdjac;
	alert("Masz " + punkty + " punktów");
	alert("Koniec gry");
}

function przegrana(){
	document.write("<div style='color: purple'>Przegrałeś -,-</div>");
	//alert("Przegrałeś -,-");
}

