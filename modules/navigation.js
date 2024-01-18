export function handleTabClick({ target }) {
	if (target.tagName !== "LI" || target == getActiveLink()) {
		return;
	}

	unsetActiveTabGroup();
	setActiveTabGroup(target.id);
}

function unsetActiveTabGroup() {
	getActiveLink().classList.remove("active");
	getActiveTab().classList.remove("active");
}

function setActiveTabGroup(id) {
	//linkId ex: "home-tab"
	document.getElementById(id).classList.add("active");
	document.getElementById(id + "-panel").classList.add("active");
}

function getActiveLink() {
	return document.querySelector(".nav-link.active");
}

function getActiveTab() {
	return document.querySelector(".tab-panel.active");
}