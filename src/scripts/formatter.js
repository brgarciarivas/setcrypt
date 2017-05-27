
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



// console.log('graphData')
// console.log(data)
// var last = data[0][0]['y'];
// var first = data[0][data[0].length - 1]['y'];
// var change = last - first;
// change = change / first;
// change = change * 100
// console.log( 'first = ' + first + ' last = ' + last)