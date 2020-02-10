import { Tamagotchi } from "../src/tamagotchi";

describe("Tamagotchi", () => {
  jest.useFakeTimers();
  let pet;

  beforeEach(() => {
    pet = new Tamagotchi();
  });

  afterEach(function() {
    jest.clearAllTimers();
  });

  test("should correctly create a tamagotchi object with hunger, potty, health, isAlive, and age", () => {
    expect(pet.hunger).toEqual(20);
    expect(pet.potty).toEqual(0);
    expect(pet.health).toEqual(50);
    expect(pet.isAlive).toEqual(true);
    expect(pet.age).toEqual(0);
  });

  test("should increase age by 1 every minute", () => {
    pet.increaseAge();
    jest.advanceTimersByTime(60001);
    expect(pet.age).toEqual(1);
  });

  test("should kill tamagotchi if age > 20", () => {
    pet.increaseAge();
    jest.advanceTimersByTime(1260001);
    expect(pet.isAlive).toEqual(false);
  });

  test("should return 'teen' for age after tamagotchi is 6 minutes old", () => {
    pet.increaseAge();
    jest.advanceTimersByTime(420001);
    expect(pet.getAge()).toEqual("teen");
  });

  test("should increase tamagotchi's health without exceeding 50", () => {
    pet.health = 30;
    pet.addHealth(55);
    expect(pet.health).toEqual(50);
  });

  test("should decrease tamagotchi's health without going below zero", () => {
    pet.decreaseHealth(75);
    expect(pet.health).toEqual(0);
  });

  test("should kill tamagotchi if health decreases to zero", () => {
    pet.decreaseHealth(75);
    expect(pet.isAlive).toEqual(false);
  });

  test("should decrease hunger by 1 every 7 seconds", () => {
    pet.makeHungry();
    jest.advanceTimersByTime(7001);
    expect(pet.hunger).toEqual(19);
  });

  test("should decrease health by 5 for each of the final 3 hunger points", () => {
    pet.makeHungry();
    jest.advanceTimersByTime(126001);
    expect(pet.health).toEqual(40);
  });

  test("should kill tamagotchi if hunger is 0", () => {
    pet.makeHungry();
    jest.advanceTimersByTime(140001);
    expect(pet.isAlive).toEqual(false);
  });

  test("should feed tamagotchi 4 hunger points if hunger is 16 or below", () => {
    pet.hunger = 15;
    pet.giveFood();
    expect(pet.hunger).toEqual(19);
  });

  test("should feed tamagotchi back to 20 hunger points if hunger is above 16", () => {
    pet.hunger = 18;
    pet.giveFood();
    expect(pet.hunger).toEqual(20);
  });

  test("should increase health by 30", () => {
    pet.health = 15;
    pet.giveMedicine();
    expect(pet.health).toEqual(45);
  });

  test("should reset potty to zero when tamagotchi uses toilet", () => {
    pet.potty = 20;
    pet.useToilet();
    expect(pet.potty).toEqual(0);
  });

  test("should increase health by 15 when tamagotchi uses toilet", () => {
    pet.health = 20;
    pet.useToilet();
    expect(pet.health).toEqual(35);
  });

  test("should increase potty by 1 every 8 seconds", () => {
    pet.pottyIncrease();
    jest.advanceTimersByTime(8001);
    expect(pet.potty).toEqual(1);
  });

  test("should have accident if potty reaches 25", () => {
    pet.pottyIncrease();
    jest.advanceTimersByTime(200001);
    expect(pet.potty).toEqual(0);
    expect(pet.health).toEqual(25);
  });

  test("should set potty to 0 and decrease health by half if tamagotchi has accident", () => {
    pet.potty = 20;
    pet.haveAccident();
    expect(pet.potty).toEqual(0);
    expect(pet.health).toEqual(25);
  });
});
