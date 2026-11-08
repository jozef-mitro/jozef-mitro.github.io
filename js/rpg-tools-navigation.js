const rpgTools = [
    { href: "character-generator.html", label: "OSE Character Generator" },
    { href: "name-generator.html", label: "Name Generator" },
    { href: "calendar-generator.html", label: "Calendar Generator" }
];

document.querySelectorAll("[data-rpg-tools]").forEach(list => {
    rpgTools.forEach(tool => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = tool.href;
        link.textContent = tool.label;
        if (link.pathname === window.location.pathname) {
            link.setAttribute("aria-current", "page");
        }
        item.appendChild(link);
        list.appendChild(item);
    });
});