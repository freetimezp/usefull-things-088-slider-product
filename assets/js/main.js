function init() {
    let current = 0;
    let directionForward = true;
    const items = document.querySelectorAll('.card-slider .items .item');
    const nextBtn = document.querySelector(".card-slider .next");
    const prevBtn = document.querySelector(".card-slider .prev");

    const getCard = (item) => item.querySelector(".card");
    const getTitle = (item) => item.querySelector(".title span");

    function setItems() {
        items.forEach((item, index) => {
            getTitle(item).innerHTML = getTitle(item).textContent.replace(
                /\S/g, "<span class='letter'>$&</span>"
            );

            if (index === current) return;

            anime.set(getCard(item), { translateX: "100vw" });
            anime.set(getTitle(item).querySelectorAll(".letter"), {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
            });
        });

        anime.set(items[current], { translateX: 0, opacity: 1 });
    }

    function animateIn(item) {
        setTimeout(() => {
            anime.timeline({ duration: 1000, easing: "easeOutExpo" })
                .add({
                    targets: getCard(item),
                    translateX: directionForward ? ["100vw", 0] : ["-100vw", 0],
                    rotate: [40, 0]
                })
                .add({
                    targets: getTitle(item).querySelectorAll(".letter"),
                    clipPath: [
                        "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                    ],
                    translateY: directionForward ? ["1em", 0] : ["-1em", 0],
                    delay: anime.stagger(40)
                }, "-=1000");
        }, 500); // Added 500ms delay
    }

    function animateOut(item) {
        anime.timeline({ duration: 1000, easing: "cubicBezier(0.86, 0, 0.07, 1)" })
            .add({
                targets: getCard(item),
                translateX: directionForward ? [0, "100vw"] : [0, "-100vw"],
                rotate: [0, -40]
            })
            .add({
                targets: getTitle(item).querySelectorAll(".letter"),
                clipPath: [
                    "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
                ],
                translateY: directionForward ? [0, "-1em"] : [0, "-1em"],
                delay: anime.stagger(40)
            }, "-=1000");
    }

    function updateClasses() {
        items.forEach((item, index) => {
            item.classList.toggle("is-active", index === current);
        });
    }

    function next() {
        directionForward = true;
        animateOut(items[current]);
        current = (current + 1) % items.length;
        animateIn(items[current]);
        updateClasses();
    }

    function prev() {
        directionForward = false;
        animateOut(items[current]);
        current = (current - 1 + items.length) % items.length;
        animateIn(items[current]);
        updateClasses();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    setItems();
}

document.addEventListener("DOMContentLoaded", init);
