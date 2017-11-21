function rollDice() {
  var numbersArray = [1,2,3,4,5,6,7];

  var roll = numbersArray[Math.floor(Math.random() * numbersArray.length)];

  return roll;

}

var rollValue = rollDice();

module.exports = rollValue;
