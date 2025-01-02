function sum2nA(n: number) {
    let total = 0
    for (let index = 1; index <= n; index++) {
        total += index
    }
    return total
}
function sum2nB(n: number) {
   return  n * (n+1) / 2;
}
function sum2nC(n: number) {
    return Array(n).fill(n).map((_, index) => index + 1).reduce((sum, current) => sum + current, 0);

 }
console.log(sum2nA(5))
console.log(sum2nB(5))
console.log(sum2nC(5))