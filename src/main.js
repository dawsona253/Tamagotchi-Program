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
  }, 1000);
}

$(document).ready(function() {
  $("#start").click(function(event) {
    const pet = new Tamagotchi();
    update(pet);
    $("#start").hide();
    pet.makeHungry();

    event.preventDefault();
  });
});
