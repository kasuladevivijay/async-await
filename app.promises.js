const users = [{
    id: 1,
    name: 'Vijay Kumar',
    schoolId: 101
},{
    id: 2,
    name: 'Jessica',
    schoolId: 999
}];
const grades = [{
    id: 1,
    schoolId: 101,
    grade: 88
},{
    id: 2,
    schoolId: 999,
    grade: 100
},{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUsers = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });

        if(user) {
            resolve(user);
        }else {
            reject(`Unable to find the user with id ${id}`);
        }
    });
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => {
            return grade.schoolId === schoolId;
        }))
    })
}

const getStatus = (userId) => {
    let user;
    return getUsers(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    })
    .then((grades) => {
        let average = 0;
        if(grades.length > 0){
            average = grades.map((grade) => {
                return grade.grade;
            }).reduce((a, b) => {
                return a + b;
            }) / grades.length;
        }

        return `${user.name} has a average of ${average}% in class`;
    })
}

//  using async-await

const getStatusAlt = async (userId) => {
    const user = await getUsers(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => {
            return grade.grade;
        }).reduce((a, b) => {
            return a + b;
        }) / grades.length;
    }

    return `${user.name} has a average of ${average}% in class`;
}

// getUsers(1).then((user) => {
//     console.log(JSON.stringify(user, '', 2));
// }).catch((e) => {
//     console.log(e)
// });

// getGrades(101).then((grades) => {
//     console.log(`grades for schoolId: ` + JSON.stringify(grades, '', 2));
// }).catch((e) => {
//     console.log(e);
// })

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e)
})