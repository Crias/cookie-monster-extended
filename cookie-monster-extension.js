Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');

CMExtended = {};

CMExtended.safetyMode = true;

CMExtended.alert = function(text, offset) {
	Game.Popup(text, (Game.windowW / 2), offset);
}

CMExtended.buyNext = function(offset) { 
	for (var i in CM.Cache.Objects) { 
		CMObj = CM.Cache.Objects[i]
		CCObj = Game.Objects[i];
		if(CMObj.color == "Green") { 
			if (CMExtended.safetyMode && CM.Cache.lastCookies - CCObj.getPrice() < CM.Cache.LuckyFrenzy) {
				CMExtended.alert("Purchases stopped at " + i, offset);
				return false;
			}

			CMExtended.alert("Bought  " + i, offset);
			Game.Objects[i].buy(); 
			return true;
		} 
	} 
	return false;
}

CMExtended.buyGroup = function(i, offset) { 
	if (i == 0) return; 
	else { 
		var bought = CMExtended.buyNext(offset); 
		if (bought) {
			setTimeout(function() { 
				CMExtended.buyGroup(i - 1, offset + 25); 
			}, 100) ;
		}
	} 
};

CMExtended.toggleSafety = function() {
	var safetyText = "Safety [???]";
	CMExtended.safetyMode = !CMExtended.safetyMode;
	if (CMExtended.safetyMode) {
		safetyText = "Safety [ON]";
	} else {
		safetyText = "Safety [OFF]";
	}
	document.getElementById("cmext-toggleSafe").childNodes[0].textContent = safetyText;
};

CMExtended.display = function(id, text, onClick) {
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

CMExtended.init = function() {
	CMExtended.display("cmext-buyNext", "Buy Next", "CMExtended.buyGroup(1, 175)");
	CMExtended.display("cmext-buyTen", "Buy 10", "CMExtended.buyGroup(10, 175)");
	CMExtended.display("cmext-toggleSafe", "Safety [ON]", "CMExtended.toggleSafety()");
}

CMExtended.init();
