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

// const mockArray = () => {
//   const arr = [];

//   for (let i = 0; i < 15; i++) {
//     arr.push(new MockObject());
//   }
//   return arr;
// };

const mockArray = [
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2015,0,1),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2016,5,25),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2017,7,16),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2017,5,12),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2018,3,11),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2018,9,3),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2018,1,12),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2019,10,9),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2019,0,22),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2020,5,11),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2021,0,22),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2021,1,11),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2021,2,14),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2022,0,30),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2022,1,14),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2022,2,22),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 1`,
    date: new Date(2022,3,18),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
  {
    id: Math.floor(100000 + Math.random() * 900000),
    workoutName: `Workout 2`,
    date: new Date(2022,3,19),
    notes: "",
    type: {
      name: "weights",
    },
    data: {
      weights: Math.floor(4 + Math.random() * 15),
      sets: [
        Math.floor(Math.random() * 15) + 12,
        Math.floor(Math.random() * 11) + 8,
        Math.floor(Math.random() * 7) + 5,
      ],
    },
  },
];

export default mockArray;
