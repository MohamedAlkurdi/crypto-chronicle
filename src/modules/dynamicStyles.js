export function handleColor(input){
    if(parseFloat(input) < 0){
        return 'text-red-600'
    }
    return 'text-green-600'
}