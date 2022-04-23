class WeightsWorkout {
  constructor() {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.date = new Date(
      Math.floor(Math.random()*(2023 - 2020) + 2020),
      Math.floor(Math.random()*11),
      Math.floor(Math.random()*28))
    this.notes = "";
    this.type = {
      name: `W-Workout ${Math.floor(10 + Math.random() * 50)}`,
      category:"weights"
    };
    this.data = {
      weights: Math.floor(Math.random() *(12 - 8) + 8),
      sets: [
        Math.floor(Math.random() * (15 - 11) + 11),
        Math.floor(Math.random() * (12 - 9) + 9),
        Math.floor(Math.random() * (11 - 8) + 8),
      ],
    };
  }
}
class DistanceWorkout {
  constructor() {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.date = new Date(
      Math.floor(Math.random()*(2023 - 2020) + 2020),
      Math.floor(Math.random()*11),
      Math.floor(Math.random()*28))
    this.notes = "";
    this.type = {
      name: `D-Workout ${Math.floor(10 + Math.random() * 50)}`,
      category:"distance"
    };
    this.data = {
      distance: Math.round((Math.random()*(10 - 6) + 6) * 100) / 100,
      rounds: [
        `${Math.floor(Math.random() * 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}`,
        `${Math.floor(Math.random() * 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}`,
        `${Math.floor(Math.random() * 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}:${Math.floor(Math.random() * (60 - 1) + 1)}`,
      ],
    };
  }
}

class BodyweightWorkout {
  constructor() {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.date = new Date(
      Math.floor(Math.random()*(2023 - 2020) + 2020),
      Math.floor(Math.random()*11),
      Math.floor(Math.random()*28))
    this.notes = "";
    this.type = {
      name: `B-Workout ${Math.floor(10 + Math.random() * 50)}`,
      category:"bodyweight"
    };
    this.data = {
      sets: [
        Math.floor(Math.random() * (15 - 11) + 11),
        Math.floor(Math.random() * (12 - 9) + 9),
        Math.floor(Math.random() * (11 - 8) + 8),
      ],
    };
  }
}

const mockArray = () => {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(new WeightsWorkout());
  }

  for (let i = 0; i < 15; i++) {
    arr.push(new DistanceWorkout());
  }

  for (let i = 0; i < 15; i++) {
    arr.push(new BodyweightWorkout());
  }

  const sorted = arr.sort((a,b) => {
    return a.date - b.date
  })

  return sorted;
};

// const mockArray = [
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2015,0,1),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2016,5,25),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2017,7,16),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2017,5,12),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2018,3,11),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2018,9,3),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2018,1,12),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2019,10,9),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2019,0,22),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2020,5,11),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2021,0,22),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2021,1,11),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2021,2,14),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,0,30),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,1,14),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,2,22),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,3,18),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,3,19),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"weights"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,1,14),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"bodyweight"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,2,22),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"bodyweight"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,3,18),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"bodyweight"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
//   {
//     id: Math.floor(100000 + Math.random() * 900000),
//     date: new Date(2022,3,19),
//     notes: "",
//     type: {
//       name: "workout name 1",
//       category:"bodyweight"
//     },
//     data: {
//       weights: Math.floor(4 + Math.random() * 15),
//       sets: [
//         Math.floor(Math.random() * 15) + 12,
//         Math.floor(Math.random() * 11) + 8,
//         Math.floor(Math.random() * 7) + 5,
//       ],
//     },
//   },
// ];

export default mockArray;
