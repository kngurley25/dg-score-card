const holeData = [];
for (let i = 0; i < 18; i++) {
    const holeNumber = i;
    const par = 3;
    holeData.push({ holeNumber, par });
}

const courseData = [
    {
        courseName: 'Swope Park Disc Golf Course',
        location: 'Missouri',
        holes: holeData
    },
    {
        courseName: 'Rosedal Disc Golf Course',
        location: 'Kansas',
        holes: holeData
    },
    {
        courseName: 'Lenexa Disc Golf Course',
        location: 'Kansas',
        holes: holeData
    },
    {
        courseName: 'Blue Valley Park Disc Golf Course',
        location: 'Missouri',
        holes: holeData
    },
    {
        courseName: 'California Trail Disc Golf Course',
        location: 'Kansas',
        holes: holeData
    },
]

module.exports = courseData;