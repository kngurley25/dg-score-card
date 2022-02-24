const holeData = [];
for (let i = 0; i < 18; i++) {
    const holeNumber = i + 1;
    const par = 3;
    holeData.push({ holeNumber, par });
}

const courseData = [
    {
        courseName: 'Swope Park Disc Golf Course',
        location: 'Missouri',
        holeCount: 18,
        holes: holeData
    },
    {
        courseName: 'Rosedal Disc Golf Course',
        location: 'Kansas',
        holeCount: 18,
        holes: holeData
    },
    {
        courseName: 'Lenexa Disc Golf Course',
        location: 'Kansas',
        holeCount: 18,
        holes: holeData
    },
    {
        courseName: 'Blue Valley Park Disc Golf Course',
        location: 'Missouri',
        holeCount: 18,
        holes: holeData
    },
    {
        courseName: 'California Trail Disc Golf Course',
        location: 'Kansas',
        holeCount: 18,
        holes: holeData
    },
]

module.exports = courseData;