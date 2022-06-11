firstTime=1;
//colors=["rgba(230, 38, 31, 1)","rgba(235, 117, 50, 1)","rgba(247, 208, 56, 1)","rgba(163, 224, 72, 1)","rgba(73, 218, 154, 1)","rgba(52, 187, 230, 1)","rgba(67, 85, 219, 1)","rgba(210, 59, 231, 1)"]

nms = "Adam Zapel*Barb E. Dahl*Biff Wellington*Charity Case*Don Key*Earl E. Bird*Hazel Nutt*Jack Pott*Jo King*Matt Tress*Mike Stand*Mona Lott*Orson Carte*Ray Gunn*Sonny Day*Warren Peace";
entries=nms.split("*");
origentries = nms.split("*");	


if(loadedData!="")
	{
	entries=loadedData.split("\n");
	origentries=loadedData.split("\n");
	}




function addNames()
{
	if(addingNames==1 || spinning==1){return}
	addingNames=1;
	toggle(500);
	$("#wellDone, .editit, .theTite").hide()
	w=$(this).width()
	wd=$("#textboxWrap").width()
	h=$(this).height()
	wh=$("#textboxWrap").height()
	$("#textboxWrap").css("left",((w-wd)/2)-20+"px");
	$("#textboxWrap").css("top",((h-wh)/2)-40+"px");
	removAds();$("#fallbackAds").hide();
	$("#textboxWrap").fadeIn("slow")
}

function createNames(saveClicked)
{
$("#entriesToggle").hide()
origentries=new Array()
namesused=""
namesremoved=0
t=document.test.textbox.value.split("\n");
theTit=$("#titleBox").val();
if(theTit==""){theTit="Random Name Picker!"}
entries=new Array()
for(n=0;n<t.length;n++)
	{
	if(t[n]!="")
		{
		entries.push(t[n])
		origentries.push(t[n]);
		}
	}
	if(origentries.length>50 && saveClicked==0) //Too many names to display in the wheel
	{
	apprise("<h2>The picker has taken 50 random entries from your list.</h2><h3>After each spin, the wheel will be randomly reloaded with 50 remaning names.</h3>");
	choosefifty()
	}
rewriteFruits()
init()
toggle(2000);
}
	
function choosefifty()
{
	shuffledentries = origentries.slice(0);
	shuffle(shuffledentries)
	//Take first fifty of these...
	entries=new Array()
	n=0
	for(n=0;n<shuffledentries.length;n++)
	{
	if(namesused.indexOf(shuffledentries[n])==-1)
		{
		entries.push(shuffledentries[n])
		if(entries.length==50){break}
		}
	}
}	
	removingName=false
namesused=""
namesremoved=0
function removeName()
{
removingName=true
	$("#entriesToggle").show()
	namesremoved++
	console.log("removed="+namesremoved+";entries.length="+entries.length)
	//alert(nametoremove)
	new Noty({type: 'success',layout: 'bottomLeft',theme: 'nest',text: "REMOVED: "+entries[nametoremove],timeout: '4000',progressBar: true, closeWith: ['click'],killer: true,}).show();
	namesused+=entries.splice(nametoremove,1)+"*"
	if(origentries.length-namesremoved>50)
		{
		choosefifty()
		}
	else{console.log("BELOW 50")}
	closeList()
	
}

function closeList()
{
toggle(500);//close curtains
setTimeout('$(".chosen").hide();shuffleFruits();rewriteFruits()',650);
	setTimeout('$("#wellDone").hide();gentleSpin()',600);
	setTimeout(init,600);
	setTimeout("toggle(1000)",700);//open curtains
}



function shuffle(array) {
	
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


//SAVE
function save()
{
theData=origentries.join("\n");
if(theData.length==0){apprise("You have nothing to save.");return}
saveOrEdit="save";

var temp=premiumUserName;
if(temp==""){temp="NONE"}

saveit("random-name-picker||PremiumUserName="+temp+"||\n*****\n"+theData+"\n*****\n"+theTit+"\n*****\n"+colScheme+"\n*****\n"+wheelTheme)
}

//MOVE CURTAINS
$curtainopen = false;
function toggle(speed)
{
	if ($curtainopen == false){ 
	$(".leftcurtain").stop().animate({width:'100px'}, speed );
	$(".rightcurtain").stop().animate({width:'100px'},speed );
	$curtainopen = true;
	showAds()
	$(".theTite, .editit").show();
	}else{
	$(".leftcurtain").stop().animate({width:'50%'}, speed );
	$(".rightcurtain").stop().animate({width:'51%'}, speed );
	$curtainopen = false;
	}
	return false;
};
	

//PREMIUM SAVE
function savethefave()
{
if(authorType=="new"){apprise("You must edit and save a wheel first before you can add it to your favourites");return};
saveFave(self.location+"",theTit)//function called from _login.inc.php.
}

function loadup()
{
document.test.textbox.value="";
	for(n=0;n<origentries.length;n++)
		{
		if(origentries[n]!=""){document.test.textbox.value+=origentries[n]+"\n"}	
		}	
}





function init()
{
$(window).trigger('resize');
colors=wheelcs[wheelTheme]
$(".currentTheme").attr("src","./wheelthemes/"+wheelTheme+".jpg")
toggleTheme(colScheme)
canv = document.getElementById("wheelcanvas");
if(createdByPremiumUser==1 || premiumUserName!=""){removAds()}
else{showAds();$("#fallbackAds").show();}
addingNames=0;
spinning=0
$("#textboxWrap").fadeOut("slow")
choiceTextSize = [];
intTextBox=100;
choiceCount=100;
numcolors = colors.length;	
numoptions = entries.length; toomany=0;if(numoptions>50){numoptions=50;toomany=50}
intTextBox = 5;  
choiceCount = intTextBox;
startAng = 0;
arc = Math.PI / (numoptions / 2);
spinTimeout = null;
spinArcStart = 10;
spinTime = 0;
spinTimeTotal = 0;
var canvasContext;
  // Check available screen size so wheel doesn't go outside
maxHeight = window.screen.availHeight;

	
maxHeight+=maxHeight/100*(fst*25)
	

	
maxWidth = window.screen.availWidth;
console.log("H = "+$(window).height())
	
if($(window).height()<650)
{
$("#ads2").remove();$(".asd").show()	
}
  wheelSize = 280;
  t=self.location+""
	if(t.indexOf("stools")==-1){return}
  
  if (maxWidth > 500 && maxHeight > 500 && (canv.getContext) ) {
		canvasWidth = maxHeight/2;		
		canv.width = canvasWidth;
		canv.height = canvasWidth;
		wheelSize = canvasWidth-2;
		context = canv.getContext('2d');
	  $(".rightcurtain, .leftcurtain").css("height",maxHeight/2.12+"px")
  }
	

  wheelRadius = wheelSize * 0.5;
  outsideRadius = wheelRadius;
  textRadius = wheelRadius * 0.9;
  insideRadius = wheelRadius *0.1;
  setChoiceFontSizes();
console.log(colors)
  drawWheel(firstTime);
  //console.log(firstTime);
  
  if(firstTime==1)
		{
		if($(window).width()>700){$("#wellDone").show();}
		else{$("#logo, #logo2, #login").hide();}
		$("#wellDoneNAME").html("<span class='editit'><h1><a href='javascript:spin()'>Click to Spin!</a></h1></span>")
		
		//$("#wellDoneNAME").append("<span class='editit'><a href='javascript:addNames()'><span class='but hvr-rectangle-out'>Edit<span></a> <a target='_blank' href='index.php'><span class='but hvr-rectangle-out'>New</span></a><a href='javascript:showEmbedOptions()'><span class='edem'><span class='but hvr-rectangle-out'>Share/Embed</span></span></a><br>")
			
		temp=self.location+"";
		if(temp.indexOf("_")==-1)	//homepage.
			{
			$(".edem").css("display","none");
			}
			
		h=$(window).width();
		zoomScale=h/700
		
	    w=$(this).width()
		wd=$("#wellDone").width()
					h=$(this).height()
					wh=$("#wellDone").height()
					$("#wellDone").css("left",((w-wd)/2)-20+"px");
					$("#wellDone").css("top",((h-wh)/2)-130+"px");
		
		reposit()
				
		if($(window).width()==1024)//IPAD Landscape
			{
			$("#wheelcanvas").css("margin-left",((w-canvasWidth)/2)-20+"px");
			}
		if($(window).width()==768)//IPAD Portrait
			{
			$("#wheelcanvas").css("margin-left","70px");
			}
  		}
	
	

	
  firstTime=0;
$(".theTite").html(theTit);
	$(".preloadingBlurb").remove()
}

function reposit()
{
w=$(this).width()
h=$(this).height()
wd=$("#savedBox").width()
wh=$("#savedBox").height()
console.log(h+" / "+wh);
$("#savedBox").css("left",((w*0.5)-(wd*0.5))+"px");
$("#savedBox").css("top",((h*0.5)-(wh))+"px");	
$("#savedBox").css("top","50px")
}


  
function drawWheel(isStart) {
    canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      canvasContext = canvas.getContext("2d");
      canvasContext.clearRect(0,0,wheelSize,wheelSize);
      canvasContext.strokeStyle = "black";
      canvasContext.lineWidth = 2;
      canvasContext.font = 'bold 12px sans-serif';
      for(i = 0; i < numoptions; i++) {
        angle = startAng + i * arc;
        canvasContext.fillStyle = "#"+colors[i%numcolors];
		  if(isStart){console.log(colors[i%numcolors])}
        canvasContext.beginPath();
        canvasContext.arc(wheelRadius, wheelRadius, outsideRadius, angle, angle + arc, false);
        canvasContext.arc(wheelRadius, wheelRadius, insideRadius, angle + arc, angle, true);
        canvasContext.stroke();
        canvasContext.fill();
        canvasContext.save();
		  canvasContext.fillStyle = "black"; 
		  canvasContext.shadowColor = "white";
		  canvasContext.shadowBlur = 2;
		 // if(isDark(colors[i%numcolors])){canvasContext.fillStyle = "white"; canvasContext.shadowColor = "black";}
		  canvasContext.shadowOffsetX = 1; 
		  canvasContext.shadowOffsetY = 1; 
		  if (isStart || drawText) {
			angHalfArc = angle + arc * 0.5-0.04;
            canvasContext.translate(wheelRadius + Math.cos(angHalfArc) * textRadius, wheelRadius + Math.sin(angHalfArc) * textRadius);
            canvasContext.rotate(angHalfArc + Math.PI);
            text = entries[i];
		    canvasContext.font = 'bold '+choiceTextSize[i]+'px sans-serif';
		    canvasContext.fillText(text, 0, 0);
        }		  
        canvasContext.restore();
      } 
      //Arrow
      canvasContext.fillStyle = "black";
      canvasContext.beginPath();      
		// Left Side
		canvasContext.moveTo(0, wheelRadius + 5);
		canvasContext.lineTo(0, wheelRadius-5);
      canvasContext.lineTo(13, wheelRadius );
      canvasContext.lineTo(0, wheelRadius + 5);
		canvasContext.fill();
    }
  }

function isDark(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	if (yiq <= 150){return true}
	return false
}
  
function spin() {
	if(spinning==1 || addingNames==1){return}
	spinning=1
	playSound();
	$("#wellDone").hide()
	if(typeof gentlespinTimeout !== "undefined"){
		  clearTimeout(gentlespinTimeout);
		}
	if(currentSkin=="fruit")
		{
		fruitSpeed=1;
		spinFruits()
		return
		}
	
    minTimeToSpin = 8; // 4
	timeRange = 2; // 3
	minAngToStartRotating = 30; // 10
	angleRange = 10; // 10
    spinAngStart = Math.random() * angleRange + minAngToStartRotating; 
    spinTime = 0;
    spinTimeTotal = minTimeToSpin * 1000;
    rotateWheel();
  }
  
function setChoiceFontSizes() {
  // get the font size of each choice
	 canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      canvasContext = canvas.getContext("2d");
		choiceTextSize = [];
		for(i = 0; i < numoptions; i++) {
			text = entries[i];
			canvasContext.font = 'bold 18px sans-serif'; 
			textHWidth = canvasContext.measureText(text).width;
			if (textHWidth > textRadius-30) {
				choiceTextSize.push("12");
			} else {
				choiceTextSize.push("18");
			}
		}
	}
  }
  
function rotateWheel() {
    spinTime += 50;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    spinAng = spinAngStart-easeOut(spinTime, 0, spinAngStart, spinTimeTotal);
    startAng += (spinAng * Math.PI / 180);
    drawWheel(false);
    gentlespinTimeout = setTimeout('rotateWheel()', 30);//30
  }

function gentleSpin() {
	minTimeToSpin = 8; // 4
	timeRange = 2; // 3
	minAngToStartRotating = 0.1; // 10
	angleRange = 0.1; // 10
    spinAngStart = Math.random() * angleRange + minAngToStartRotating; 
    spinTime = 0;
    spinTimeTotal = minTimeToSpin * 1000;
    spinAng = spinAngStart-easeOut(spinTime, 0, spinAngStart, spinTimeTotal);
    startAng += (spinAng * Math.PI / 180);
    drawWheel(false);
    gentlespinTimeout = setTimeout('gentleSpin()', 10);//30
  }
  	
function stopRotateWheel() {
    clearTimeout(spinTimeout);
	
	celebrate()
	
	 degrees = startAng * 180 / Math.PI + 180; // left side, not top
    arcd = arc * 180 / Math.PI;
    index = Math.floor((360-degrees % 360) / arcd);
	 text = entries[index];
	   canvasContext.font = 'bold 30px sans-serif';
	   fsize="30px"
	 textHWidth = canvasContext.measureText(text).width*0.5;
	 if (textHWidth > wheelRadius) {
	  canvasContext.font = 'bold 12px sans-serif';
	  fsize="12px"
	  textHWidth = canvasContext.measureText(text).width*0.5;
	 }	
	nametoremove=index;
	showWellDone()
 }


function celebrate()
{
$('#aud').show()
	$("#theAud").animate({'height': '500px'},500,'easeInOutBounce');
	setTimeout("$('#theAud').animate({'height': '0px'}, 200, 'easeInOutBounce');",3000)
	setTimeout("$('.js-container').fadeOut(5000, function() {$('.js-container').remove();})",5000);
	$("body").prepend('<div class="js-container container" style="pointer-events: none;"></div>');
	window.confettiful = new Confettiful(document.querySelector('.js-container'));
	spinning=0;
	playClap()	
}

function showWellDone()
{
$("#wellDone").css("left","-500px")
		$("#wellDone").show()
		
		$("#wellDoneNAME").html(text+"<br>")
		$("#wellDoneREMOVE").html("<span style='font-size:small' class='editit'><a href='javascript:removeName()'><span class='rmv but hvr-rectangle-out'>Remove Name</span></a><a href='javascript:closeList()'><span class='but hvr-rectangle-out'>Continue</span></a></span>")
		//<br><p style='color:white;'><span class='editit' style='font-size:small !important'><a href='javascript:addNames()'>Edit/Save</a> | <a target='_blank' href='index.php'>New</a> | <span class='edem'><a href='javascript:showEmbedOptions()'>Share/Embed</a></span></span></p>
		$("#wellDone").css("font-size",fsize)
		if(entries.length==1){$(".rmv").hide()}
		else{$(".rmv").show()}
		w=$(this).width()
		wd=$("#wellDone").width()
		h=$(this).height()
		wh=$("#wellDone").height()

		$("#wellDone").stop().animate(
			{
			left:((w-wd)/2)-12+"px"
			},
			{
			easing:"easeInOutBack"
			}
			);
			$("#wellDone").css("top",((h-wh)/2)-130+"px");
}
  
function easeOut(t, b, c, d) {
    ts = (t/=d)*t;
    tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
  