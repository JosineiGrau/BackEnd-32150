export const getNumRandoms = (cant) => {
    const numbers = {}
    console.log(typeof cant)
    for (let i = 0; i < cant; i++) {
        const element = Math.floor(Math.random() * (cant - i + 1)) + i
        numbers[element] = numbers[element] ? numbers[element] + 1 : 1
    }
    return numbers
}