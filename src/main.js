import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { Tamagotchi } from "./tamagotchi";

const url =
  "https://api.giphy.com/v1/gifs/random?api_key=NugGuaZWltD1aGOEFjEYel1ihO71FVuP&tag=cat&rating=G";

function updateStats(pet) {
  $("#health").text(`Health: ${pet.health}`);
  $("#potty").text(`Potty: ${pet.potty}`);
  $("#hunger").text(`Hunger: ${pet.hunger}`);
  $("#age").text(`Age: ${pet.getAge()}`);
  $("#happy").text(`Happy: ${pet.happy}`);
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

function engine(pet) {
  pet.decreaseHappy();
  pet.makeHungry();
  pet.pottyIncrease();
  pet.increaseAge();
  update(pet);
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
    engine(pet);
  });

  $("#med-btn").click(function(event) {
    event.preventDefault();
    pet.giveMedicine();
  });

  $("#bathroom-btn").click(function(event) {
    event.preventDefault();
    pet.useToilet();
  });

  $("#feed-btn").click(function(event) {
    event.preventDefault();
    pet.giveFood();
  });

  $("#happy-btn").click(function(event) {
    event.preventDefault();
    pet.increaseHappy();
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        let imageUrl = jsonifiedResponse.data.image_url;
        setBackG(imageUrl);
      });
    const setBackG = function(imageUrl) {
      $("#gif").css("background-image", "url(" + imageUrl + ")");
    };
  });
});
