
export function getPercentChange (data) {
    var prices = data[0]
    var length = data[0].length;
    var a = prices[length -1].y;
    console.log('a ');
    console.log(a)
    var b = prices[0].y
    console.log('b ');
    console.log(b)
    var diff = a - b;
    var div = diff / b;
    var change = div + 1
    change = change.toFixed(2);
    //return percentChange.toFixed(2);  
    return change
}


export function roundNumber (num, digits) {
    console.log('roundNumber')
    console.log(num)
    console.log(typeof num)
    var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "B" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
  }
  return num.toFixed(digits).replace(rx, "$1");
}