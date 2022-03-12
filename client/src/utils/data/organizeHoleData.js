export function organizeHoleData(data) {
    if (data[1].tee_1_par !== "0") {
        const holeData = [];
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: data[i].hole_num, par: data[i].tee_1_par, length: data[i].tee_1_len};
            holeData.push(obj);  
        }
        return holeData;
    } else if (data[1].tee_2_par !== "0") {
        const holeData = [];
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: data[i].hole_num, par: data[i].tee_2_par, length: data[i].tee_2_len};
            holeData.push(obj);  
        }
        return holeData;
    } else {
        const holeData = [];
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: data[i].hole_num, par: "3", length: "-"};
            holeData.push(obj);  
        }
        return holeData;  
    }
}