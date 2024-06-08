import moment from "moment";

export function getRandomNumberInRange(min=0, max) {
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
        throw new Error('Invalid input: min and max should be numbers and min should be less than or equal to max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomSetOfNumbers(max) {
    const set = new Set();
    while (set.size < 3) {
        set.add(getRandomNumberInRange(0, max - 1)); 
    }
    return set;
}

export function prepareChartData(array,division){
    let length = array.length;
        const gap = Math.ceil(length/division)
        let indecies = []
        for(let i=0;i<length;i+=gap){
            indecies.push(i);
        }
        indecies.push(length-1)
        return indecies.map((el)=>{
            return {date:moment(moment(array[el][0]).format('YYYY-MM-DD HH:mm:ss')).format('MM-DD'),price:array[el][1]};
        })
}