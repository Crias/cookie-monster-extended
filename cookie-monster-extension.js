Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');

CM.Extended = {};

CM.Extended.safetyMode = true;

CM.Extended.alert = function(text, offset) {
	Game.Popup(text, (Game.windowW / 2), offset);
}

CM.Extended.buyNext = function(offset) { 
	for (var i in CM.Cache.Objects) { 
		CMObj = CM.Cache.Objects[i]
		CCObj = Game.Objects[i];
		if(CMObj.color == "Green") { 
			if (CM.Extended.safetyMode && CM.Cache.lastCookies - CCObj.getPrice() < CM.Cache.LuckyFrenzy) {
				CM.Extended.alert("Purchases stopped at " + i, offset);
				return false;
			}

			CM.Extended.alert("Bought  " + i, offset);
			Game.Objects[i].buy(); 
			return true;
		} 
	} 
	return false;
}

CM.Extended.buyGroup = function(i, offset) { 
	if (i == 0) return; 
	else { 
		var bought = CM.Extended.buyNext(offset); 
		if (bought) {
			setTimeout(function() { 
				CM.Extended.buyGroup(i - 1, offset + 25); 
			}, 100) ;
		}
	} 
};

CM.Extended.toggleSafety = function() {
	var safetyText = "Safety [???]";
	CM.Extended.safetyMode = !CM.Extended.safetyMode;
	if (CM.Extended.safetyMode) {
		safetyText = "Safety [ON]";
	} else {
		safetyText = "Safety [OFF]";
	}
	document.getElementById("cmext-toggleSafe").childNodes[0].textContent = safetyText;
};

CM.Extended.display = function(id, text, onClick) {
	var nodeD = document.createElement("div");
	var nodeS = document.createElement("span");
	var nodeT = document.createTextNode(text);
	nodeS.appendChild(nodeT);
	nodeD.appendChild(nodeS);
	nodeD.setAttribute("onClick", onClick);
	nodeD.setAttribute("onmouseover", "this.style.cursor='pointer'");
	nodeD.setAttribute("onmouseout", "this.style.cursor='default'");
	nodeD.setAttribute("id", id);
	document.getElementById("topBar").appendChild(nodeD);
}

CM.Extended.init = function() {
	CM.Extended.display("cmext-buyNext", "Buy Next", "CM.Extended.buyGroup(1, 175)");
	CM.Extended.display("cmext-buyTen", "Buy 10", "CM.Extended.buyGroup(10, 175)");
	CM.Extended.display("cmext-toggleSafe", "Safety [ON]", "CM.Extended.toggleSafety()");
}

CM.Extended.init();
