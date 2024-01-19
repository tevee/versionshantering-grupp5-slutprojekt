export const handleDarkMode = {
	set: () => {
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (darkMode) {
			document.getElementById("toggleMode").checked = true;
		}
	},
	change: (event) => {
		event.preventDefault();
		const darkMode = document.querySelector("#toggleMode").checked;

		if (darkMode) {
			document.documentElement.style.setProperty("--headerAndFooter-color", "#2c2f33");
			document.documentElement.style.setProperty("--background-color", "white");
			document.documentElement.style.setProperty("--message-color", "white");
			console.log("off");
		} else {
			document.documentElement.style.setProperty("--headerAndFooter-color", "white");
			document.documentElement.style.setProperty("--background-color", "black");
			document.documentElement.style.setProperty("--message-color", "black");
			console.log("on");
		}
	},
};