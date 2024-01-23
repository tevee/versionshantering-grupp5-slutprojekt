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
			document.documentElement.style.setProperty("--headerAndFooter-color", "#000");
			document.documentElement.style.setProperty("--background-color", "#121212");
			document.documentElement.style.setProperty("--message-color", "#212121");
			document.documentElement.style.setProperty("--message-hover-color", "#2a2a2a");
			document.documentElement.style.setProperty("--dropdown-color", "#1a1a1a");
			document.documentElement.style.setProperty("--text-color", "#fff");
			document.documentElement.style.setProperty("--secondary-text-color", "#aaa");
			document.documentElement.style.setProperty("--like-btn-color", "#212121");
			document.documentElement.style.setProperty("--like-btn-border-color", "#fff");
			document.documentElement.style.setProperty("--like-btn-hover-color", "#808080");
		} else {
            document.documentElement.style.setProperty("--headerAndFooter-color", "#fff");
			document.documentElement.style.setProperty("--background-color", "#eef0f2");
			document.documentElement.style.setProperty("--message-color", "#fff");
			document.documentElement.style.setProperty("--message-hover-color", "#1a1a1a");
			document.documentElement.style.setProperty("--dropdown-color", "rgba(0,0,0,0.05)");
			document.documentElement.style.setProperty("--text-color", "#000");
			document.documentElement.style.setProperty("--secondary-text-color", "#606060");
			document.documentElement.style.setProperty("--like-btn-color", "#fff");
			document.documentElement.style.setProperty("--like-btn-border-color", "#212121");
			document.documentElement.style.setProperty("--like-btn-hover-color", "#d3d3d3");
		}
	},
};