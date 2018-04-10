let globalReader

export function toFirstCap(str) {
	return str ? str.charAt(0).toUpperCase() + str.slice(1) : false
}
export function getUrlPiece() {
	let currentUrl = window.location.href.split("/")
	let lastUrlSegment =
		currentUrl[currentUrl.length - 1] !== ""
			? currentUrl[currentUrl.length - 1]
			: currentUrl[currentUrl.length - 2]
	let allowed = [
		"donator",
		"requester",
		"verifier",
		"doer",
		"login",
		"thanks",
		"info",
		"account",
		"edit-account",
		"preferences"
	]
	if (allowed.indexOf(lastUrlSegment) === -1) return "donator"
	else return lastUrlSegment
}
export function valuify(str) {
	let words = str.split(" ")
	let ret = []
	for (let i = 0, l = words.length; i < l; i++) {
		ret.push(words[i].toLowerCase())
	}
	return ret.join("-")
}
export function prepareFileReader(file) {
	globalReader = new FileReader()
	globalReader.readAsDataURL(file)
	globalReader.onload = () => {}
	globalReader.onerror = error => {
		console.log("Error uploading file: ", error)
	}
	return globalReader
}
export function getBase64() {
	return globalReader.result
}
