import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { Tamagotchi } from "./tamagotchi";

function updateStats(pet) {
  $("#health").text(`Health: ${pet.health}`);
  $("#potty").text(`Potty: ${pet.potty}`);
  $("#hunger").text(`Hunger: ${pet.hunger}`);
  $("#age").text(`Age: ${pet.getAge()}`);
  if ($("#pet-img").hasClass("pet-1")) {
    $("#pet-img").removeClass();
    $("#pet-img").addClass("pet-2");
  } else if ($("#pet-img").hasClass("pet-2")) {
    $("#pet-img").removeClass();
    $("#pet-img").addClass("pet-1");
  }
}
function update(pet) {
  setInterval(() => {
    updateStats(pet);
  }, 500);
}

$(document).ready(function() {
  let pet;
  $("#egg-bg").hide();

  $("#begin").submit(function(event) {
    event.preventDefault();
    $("#begin").hide();
    $("#pet-img").show();
    $("#egg-bg").show();
    pet = new Tamagotchi($("#name").val());
    $("#pet-name").text(pet.name);
    update(pet);
    pet.makeHungry();
    pet.pottyIncrease();
    pet.increaseAge();
  });

  $("#med").click(function(event) {
    event.preventDefault();
    pet.giveMedicine();
  });

  $("#bathroom").click(function(event) {
    event.preventDefault();
    pet.useToilet();
  });

  $("#feed").click(function(event) {
    event.preventDefault();
    pet.giveFood();
  });
});
