const { job } = require("cron");

const jerbs = [
    {
        id: "1",
        name: "Coffee Bitch"
    },
    {
        id: "2",
        name: "Dishwasher"
    },
    {
        id: '133242',
        name: "Scrote Inspector"
    }
]

// const newJerbs = jerbs.filter(jerb => {
//     return jerb.id != 2
// })

let currJerb = jerbs.find(jerb => jerb.id === '1')
currJerb.name = "Oregano Smeller"
console.log(
    jerbs
);