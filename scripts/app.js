
// Defining new Vue application
var app = new Vue({
  el: '#tios',
  data: {
    additions: '400',
    additionFrequency: 'monthly',
    interest: '4',
    principal: '10000',
    compounded: 'monthly',
    increase: '100'
  }
});


// Define a new component called todo-item
Vue.component('scenario', {
  template: '<li>This is a todo</li>'
})

// Compount Interest function
function doCompoundInterest(principal, interestRate, time, compoundFactor ) {
  var p = principal;
  var i = interestRate/100;
  var t = time;
  var c = compoundFactor;

  var exponent = t * c;
  var fraction = i / c;

  var onePlus = 1 + fraction;
  var exponential = Math.pow(onePlus, exponent);

  console.log('Exponent: ' + exponent);
  console.log('Fraction: ' + fraction);
  console.log('OnePlus: ' + onePlus);
  console.log('Exponentialing: ' + exponential);

  // Plug in numbers to equation for final values
  var amount = p * (exponential);
  return amount;
}

// Compount Interest function
function doValueOfMoney(principal, interestRate, time, compoundFactor ) {

  // Get Principal money value
  var principalInterest = doCompoundInterest(currentValue, 5, 1, 12);

  // Get Future Value of Series
  var futureValue = 1;

  var valueOfMoney = principalInterest + futureValue;
}




$(document).ready( function(e)  {

  var newData = [];
  var currentValue = 10000;
  // Get data points for chart
  for( var i = 0; i < 30; i++) {
    var value = doCompoundInterest(currentValue, 5, 1, 12);

    entry = {}
    entry ["year"] = i;
    entry ["value"] = value;

    newData.push(entry);
    currentValue = value;
  }



  // D3 Graph
  var margin = {top: 20, right: 20, bottom: 40, left: 50},
      width = 575 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
      .domain([0, d3.max(newData, function(d) { return d.year; })])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([0, d3.max(newData, function(d) { return d.value; })])
      .range([height, 0]);

  var xAxis = d3.axisBottom()
      .scale(x)

  var yAxis = d3.axisLeft()
      .scale(y)

  var area = d3.area()
      .x(function(d) { return x(d.year); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

  var svg = d3.select("svg#area")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("path")
      .datum(newData)
      .attr("class", "area")
      .attr("d", area);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

});
