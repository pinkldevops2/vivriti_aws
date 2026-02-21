
document.addEventListener("DOMContentLoaded", () => {
    const vnexttab = document.querySelector("#vnexttab");
        // 2. Add the class
        vnexttab.classList.add("active");

        document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();

        // hide all contents
        document.querySelectorAll('.adress-content').forEach(content =>
        content.classList.remove('active')
        );

        // show related content
        const target = tab.dataset.target;
        document.querySelectorAll(`.adress-content.${target}`).forEach(block =>
        block.classList.add('active')
        );
    });
    });
});