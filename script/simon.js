/**
 * Simon Game
 * created by: Dilson Torrefiel
 * 05 2026
 */
let memory = [];
let player = [];
let isMatch = false;
let level = 0;
let isGameStart = false;
const message = ["Great!", "Awesome!", "Keep it up!", "You are doing great!"];
$(".score")[0].innerText = "Level: " + level;

/**
 * Activate next pattern
 * @returns computer next pattern
 */
function activateNext() {
  isGameStart = true;
  const min = 0;
  const max = 3;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  const pads = $(".pad");

  if ($(pads[random]).hasClass("active") === false) {
    $(pads[random]).addClass("active");
    $(pads[random]).addClass("b-pad");
    playSound($(pads)[random].id);
  }
  if (level > 0) {
    $(".heading h2")[0].innerText =
      message[Math.floor(Math.random() * message.length)];
  }
  setTimeout(() => {
    $(pads[random]).removeClass("active");
    $(pads[random]).removeClass("b-pad");
  }, 1000);
  memory.push(random);
  $(".start").addClass("hide");
}

/**1);
 * Re start Game and reset data in memory
 */
function reStart() {
  memory = [];
  player = [];
  level = 0;
  activateNext();
  $(".score")[0].innerText = "Level: " + level;
  $(".heading h2")[0].innerText = "";
  $(".heading h2").addClass("hide");
}

/**
 * Event Listener to player's clicks
 */
$(".pad").on("click", function (event) {
  if (isGameStart) {
    player.push(Number(event.target.attributes[1].nodeValue));
    animateZoom(event.target.id);
    playSound(event.target.id);
    levelUp(memory, player);
    gameOver(memory, player);
  }
});

/**
 * Checks if human's memory is the same with the computer memory then level-up
 * @param {computer memory} computer
 * @param {player} human
 */
function levelUp(computer, human) {
  isMatch = JSON.stringify(computer) === JSON.stringify(human);
  if (isMatch && computer.length === human.length && computer.length !== 0) {
    setTimeout(() => {
      activateNext();
    }, 500);
    player = [];
    level++;
    $(".score")[0].innerText = "Level: " + level;
  }
}

/**
 * Check if both array patterns are the same else game over
 * @param {memory} computer
 * @param {player} human
 */
function gameOver(computer, human) {
  if (computer.length === human.length) {
    if (isMatch === false) {
      $(".heading h2")[0].innerText = "Game Over!";

      // Making it blink multiple times using a loop
      for (let i = 0; i < 5; i++) {
        $(".heading h2").fadeOut(200).fadeIn(200);
      }
      // unhide start button & change onClick event target
      $(".start").removeClass("hide");
      $(".start").attr("onClick", "reStart()");

      // play sound
      playSound("wrong");
    }
  }
}

/**
 * Apply zoom event
 * @param {event id} event
 */
function animateZoom(event) {
  $("#" + event).addClass("zoom");
  $("#" + event).addClass("b-pad");

  setTimeout(() => {
    $("#" + event).removeClass("zoom");
    $("#" + event).removeClass("b-pad");
  }, 500);
}

/**
 * Handle play sound
 * @param {sound file name} sound
 */
function playSound(sound) {
  var mp3 = new Audio("./sounds/" + sound + ".mp3");
  mp3.play();
}
