// Name-card logic
const nameCard = document.querySelector('.name-card');
const nameInput = nameCard.querySelector('input[type="text"]');
const submitBtn = nameCard.querySelector('button');

// Hide div only after actual submission
submitBtn.addEventListener('click', function(e) {
    const name = nameInput.value.trim();

    if (!name) {
        e.preventDefault(); // stop form submit if empty
        alert('Please enter your name first!');
        return;
    }

    // Optional: prevent form submit for testing
    // e.preventDefault();

    // Save submission to localStorage
    localStorage.setItem('usernameEntered', 'true');

    // Fade out
    nameCard.style.transition = 'opacity 0.5s ease';
    nameCard.style.opacity = '0';
    setTimeout(() => {
        nameCard.style.display = 'none';
    }, 500);
});

// Only hide on page load if previously submitted
window.addEventListener('load', () => {
    if (localStorage.getItem('usernameEntered') === 'true') {
        nameCard.style.display = 'none';
    }
});

// --- Heart animation (jQuery) ---
$("#messageState").on("change", () => {
    $(".message").removeClass("openNor closeNor");
    if ($("#messageState").is(":checked")) {
        $(".message").removeClass("closed no-anim").addClass("openNor");
        $(".heart").removeClass("closeHer openedHer").addClass("openHer");
        $(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
    } else {
        $(".message").removeClass("no-anim").addClass("closeNor");
        $(".heart").removeClass("openHer openedHer").addClass("closeHer");
        $(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
    }
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    if ($(".message").hasClass("closeNor")) $(".message").addClass("closed");
    $(".message").removeClass("openNor closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    if (!$(".heart").hasClass("closeHer")) {
        $(".heart").addClass("openedHer beating");
    } else {
        $(".heart").addClass("no-anim").removeClass("beating");
    }
    $(".heart").removeClass("openHer closeHer");
});

// Visitor counter
fetch('https://counterapi.dev/hit/ut_2V9QJASYV0GPgsn5Peqyqh5WUsfn1Jsk4zxo5Ghe/visits')
  .then(res => res.json())
  .then(data => {
    document.getElementById('visitor-count').innerText = data.value;
  });
