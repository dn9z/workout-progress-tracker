class MockObject {
  constructor() {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.workoutName = `Workout ${Math.floor(10 + Math.random() * 50)}`;
    this.date = new Date();
    this.notes = "";
    this.type = {
      name: "weights",
    };
    this.data = {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    };
  }
}

const mockArray = () => {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(new MockObject());
  }
  return arr;
};

export default mockArray;
