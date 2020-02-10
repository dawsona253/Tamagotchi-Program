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
}
function update(pet) {
  setInterval(() => {
    updateStats(pet);
  }, 500);
}

$(document).ready(function() {
  let pet;

  $("#start").click(function(event) {
    event.preventDefault();
    $("#start").hide();
    pet = new Tamagotchi();
    update(pet);
    pet.makeHungry();
    pet.pottyIncrease();
    pet.increaseAge();
  });

  $("#med").click(function(event) {
    event.preventDefault();
    update(pet);
    pet.giveMedicine();
  });
});
