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
        id: "3",
        name: "Master Steaker"
    },
    {
        id: '133242',
        name: "Scrote Inspector"
    }
]

jerbs.findIndex(job => job.name.includes("Scrote")) //3

jerbs.find(job => job.id === '3') //{ id: '3', name: 'Master Steaker' }
jerbs.find(job => job.dick === true) //undefined
undefined === false //false