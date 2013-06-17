var words = [[{"word":"BROAD","base":"ABDOR"},{"word":"BOARD","base":"ABDOR"}],[{"word":"REACTION","base":"ACEINORT"},{"word":"CREATION","base":"ACEINORT"}],[{"word":"CARE","base":"ACER"},{"word":"RACE","base":"ACER"}],[{"word":"CAT","base":"ACT"},{"word":"ACT","base":"ACT"}],[{"word":"DANGER","base":"ADEGNR"},{"word":"GARDEN","base":"ADEGNR"}],[{"word":"LEAD","base":"ADEL"},{"word":"DEAL","base":"ADEL"}],[{"word":"PHASE","base":"AEHPS"},{"word":"SHAPE","base":"AEHPS"}],[{"word":"EARTH","base":"AEHRT"},{"word":"HEART","base":"AEHRT"}],[{"word":"HEAT","base":"AEHT"},{"word":"HATE","base":"AEHT"}],[{"word":"RAISE","base":"AEIRS"},{"word":"ARISE","base":"AEIRS"}],[{"word":"MEAL","base":"AELM"},{"word":"MALE","base":"AELM"}],[{"word":"STEAL","base":"AELST"},{"word":"LEAST","base":"AELST"}],[{"word":"MEAN","base":"AEMN"},{"word":"NAME","base":"AEMN"}],[{"word":"NEAR","base":"AENR"},{"word":"EARN","base":"AENR"}],[{"word":"RATE","base":"AERT"},{"word":"TEAR","base":"AERT"}],[{"word":"SEAT","base":"AEST"},{"word":"EAST","base":"AEST"}],[{"word":"EAT","base":"AET"},{"word":"TEA","base":"AET"}],[{"word":"INTRODUCE","base":"CDEINORTU"},{"word":"REDUCTION","base":"CDEINORTU"}],[{"word":"CREDIT","base":"CDEIRT"},{"word":"DIRECT","base":"CDEIRT"}],[{"word":"RECENT","base":"CEENRT"},{"word":"CENTRE","base":"CEENRT"}],[{"word":"EXCEPT","base":"CEEPTX"},{"word":"EXPECT","base":"CEEPTX"}],[{"word":"SOURCE","base":"CEORSU"},{"word":"COURSE","base":"CEORSU"}],[{"word":"GOD","base":"DGO"},{"word":"DOG","base":"DGO"}],[{"word":"SHEET","base":"EEHST"},{"word":"THESE","base":"EEHST"}],[{"word":"LIFE","base":"EFIL"},{"word":"FILE","base":"EFIL"}],[{"word":"FORMER","base":"EFMORR"},{"word":"REFORM","base":"EFMORR"}],[{"word":"REGION","base":"EGINOR"},{"word":"IGNORE","base":"EGINOR"}],[{"word":"ITEM","base":"EIMT"},{"word":"TIME","base":"EIMT"}],[{"word":"QUIET","base":"EIQTU"},{"word":"QUITE","base":"EIQTU"}],[{"word":"TONE","base":"ENOT"},{"word":"NOTE","base":"ENOT"}],[{"word":"USER","base":"ERSU"},{"word":"SURE","base":"ERSU"}],[{"word":"FROM","base":"FMOR"},{"word":"FORM","base":"FMOR"}],[{"word":"NIGHT","base":"GHINT"},{"word":"THING","base":"GHINT"}],[{"word":"SING","base":"GINS"},{"word":"SIGN","base":"GINS"}],[{"word":"THROW","base":"HORTW"},{"word":"WORTH","base":"HORTW"}],[{"word":"SHOUT","base":"HOSTU"},{"word":"SOUTH","base":"HOSTU"}],[{"word":"WHO","base":"HOW"},{"word":"HOW","base":"HOW"}],[{"word":"SHUT","base":"HSTU"},{"word":"THUS","base":"HSTU"}],[{"word":"SIT","base":"IST"},{"word":"ITS","base":"IST"}],[{"word":"ON","base":"NO"},{"word":"NO","base":"NO"}],[{"word":"NOW","base":"NOW"},{"word":"OWN","base":"NOW"}],[{"word":"SPOT","base":"OPST"},{"word":"STOP","base":"OPST"}],[{"word":"SPOT","base":"OPST"},{"word":"POST","base":"OPST"}],[{"word":"STOP","base":"OPST"},{"word":"POST","base":"OPST"}]];

// remove duplicates from a sorted array
Array.prototype.unique = function () {
	var res = [], previous = null;
	for (var i = 0; i < this.length; i++) {
		if (!previous || this[i] !== previous) {
			res.push(this[i]);
		}
		previous = this[i];
	}
	return res;
}

// determines whether the array contains duplicates
Array.prototype.hasDuplicates = function () {
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < this.length; j++) {
			if (i !== j && this[i] == this[j])
				return true;
		}
	}
	return false;
}

function enumerate(base, callback) {
	var letters = base.split("").unique();
	if (letters.length > 10)
		return;
		
	var lower = letters.length == 1 ? 0 : Math.pow(10, letters.length - 2) 	
	
	for (var mask = lower; mask < Math.pow(10, letters.length); mask++) {
		var strMask = mask.toString();
		
		if (mask < Math.pow(10, letters.length - 1))
			strMask = "0" + strMask;
			
		// is this a valid mask ?
		if (strMask.split("").hasDuplicates())
			continue;
	
		// letters + mask = map function
		callback(letters.join(""), strMask);
	}
}

function transform(word, letters, mask) {
	var res = word.split("").map(function (letter) {
		var i = letters.indexOf(letter);
		return mask[i];
	});
	
	if (res[0] === "0")
		return NaN;
	else
		return +(res.join(""));
}

function main() {
	var res = 0;

	for(var i = 0; i < words.length; i++) {
		var pair = words[i];
		var base = pair[0].base;
		var word1 = pair[0].word, word2 = pair[1].word;
		
		enumerate(base, function (letter, mask) {
			var n1 = transform(word1, letter, mask);
			if (isNaN(n1))
				return;
				
			var ns1 = Math.floor(Math.sqrt(n1));
			if (ns1 * ns1 !== n1)
				return;
			
			var n2 = transform(word2, letter, mask);
			if (isNaN(n2))
				return;
				
			var ns2 = Math.floor(Math.sqrt(n2));
			if (ns2 * ns2 !== n2)
				return;
			
			var max = Math.max(n1, n2);
			if (max > res)
				res = max;
		});
	}
	
	console.log(res);
}

setTimeout(main, 5000);