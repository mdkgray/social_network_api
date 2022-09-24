const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Matthew',
    'Andrew',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Alexi',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Robert',
    'Nathaniel',
    'Parker',
];

class RandomUser {
    constructor () {
    this.name1 = this.getRandomArrItem(names);
    this.name2 = this.getRandomArrItem(names);
    }

    getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


    // Gets a random full name
    getRandomUsername = () => {
        console.log(this.name1, this.name2)
        const userName = `${name1} ${name2}`;
        return userName;
    }

    // creates a random email
    getRandomEmail = (name1, name2) => {
        console.log(this.name1, this.name2)

        const userEmail = `${this.name1}${this.name2}@gmail.com`;
        return userEmail;
    };
}

module.exports = { RandomUser };