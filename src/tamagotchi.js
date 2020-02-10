export class Tamagotchi {
  constructor() {
    this.hunger = 20;
    this.potty = 0;
    this.health = 50;
    this.isAlive = true;
    this.age = 0;
  }

  increaseAge() {
    setInterval(() => {
      this.age++;
      if (this.age > 20) {
        this.isAlive = false;
      }
    }, 60000);
  }

  getAge() {
    if (this.age <= 2) return "baby";
    else if (this.age > 2 && this.age <= 5) {
      return "child";
    } else if (this.age > 5 && this.age <= 8) {
      return "teen";
    } else if (this.age > 8 && this.age < 20) {
      return "adult";
    } else return "dead";
  }

  addHealth(num) {
    this.health += num;
    if (this.health >= 51) {
      this.health = 50;
    }
  }

  decreaseHealth(num) {
    this.health -= num;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }
  makeHungry() {
    setInterval(() => {
      this.hunger--;
      if (this.hunger <= 3 && this.hunger > 0) {
        this.health -= 5;
      } else if (this.hunger === 0) {
        deacreaseHealth(50);
      }
    }, 7000);
  }

  giveFood() {
    if (this.hunger <= 16 && this.isAlive) {
      this.hunger += 4;
    } else if (this.isAlive) {
      this.hunger = 20;
    }
  }
  giveMedicine() {
    addHealth(30);
  }
  useToilet() {
    this.potty = 0;
    addHealth(15);
  }
  pottyIncrease() {
    setInterval(() => {
      this.potty++;
      if (this.potty === 25) {
        this.haveAccident();
      }
    }, 8000);
  }

  haveAccident() {
    this.potty = 0;
    decreaseHealth(this.health / 2);
  }
}
