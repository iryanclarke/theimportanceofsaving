//
// @title   Vue Application
// @desc    Initializes the Vue application and binds it
//          to the #tios page wrapper
var app = new Vue({
  el: '#tios',
  data: {
    additions: '400',
    additionFrequency: 'monthly',
    interest: '4',
    time: '30',
    principal: '10000',
    compounded: 'monthly',
    increase: '100'
  },
  computed: {
    totalValue: function() {
      updateGraph(this.principal, this.interest, this.time, 12)
      return roundCompoundInterest(this.principal, this.interest, this.time, 12)
    }
  },
  methods: {
    getValue: _.debounce(
      function () {
        return roundCompoundInterest(this.principal, this.interest, this.time, 12)
      },
      // This is the number of milliseconds we wait for the
      // user to stop typing.
      500
    )
  },
  watch: {
    principal: function(newData) {

    }
  }
});

//
// @title   Basic Compound Interest
// @desc    Uses the basic compound interest formula to calculate the value of money
//          after certain interest rate and other parameters.
// @usage   roundCompoundInterest(),
//          doValueOfMoney()
function doCompoundInterest(principal, interestRate, time, compoundFactor ) {
  var p = principal;
  var i = interestRate/100;
  var t = time;
  var c = compoundFactor;

  var exponent = t * c;
  var fraction = i / c;

  var onePlus = 1 + fraction;
  var exponential = Math.pow(onePlus, exponent);

  //console.log('Exponent: ' + exponent);
  //console.log('Fraction: ' + fraction);
  //console.log('OnePlus: ' + onePlus);
  //console.log('Exponentialing: ' + exponential);

  // Plug in numbers to equation for final values
  var amount = p * (exponential);
  return amount;
}


//
// @title   Rounded Compound Interest
// @desc    Rounds the result of the Compound Interest with passed in parameters
// @usage   'getValue' method
//
function roundCompoundInterest(principal, interestRate, time, compoundFactor ) {
  return Math.round(doCompoundInterest(principal, interestRate, time, compoundFactor));
}


//
// @title   Value of Money
// @desc    Total Money Value after adding in future values and addition on money
//
// @usage   none
//
function doValueOfMoney(principal, interestRate, time, compoundFactor ) {

  // Get Principal money value
  var principalInterest = doCompoundInterest(currentValue, 5, 1, 12);

  // Get Future Value of Series
  var futureValue = 1;

  var valueOfMoney = principalInterest + futureValue;
}

//
// @title   Draw Graph
// @desc    Draws the initial D3 graph
//
// @usage   $(document).ready();
function drawGraph(data, margin, width, height) {
  var x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.year; })])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
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
    .attr("width", '100%')
    .attr("height", '100%')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .transition()
      .duration( 1500 );

  console.log(svg);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
}


//
// @title   Update Graph
// @desc    Updates the graph using new data from Vue.JS
//
// @usage   $(document).ready();
function updateGraph(principal, interestRate, time, compoundFactor) {

   // D3 Graph
   var margin = {top: 20, right: 20, bottom: 40, left: 50},
      container = $('#d3'),
      width = container.width() - margin.left - margin.right,
      height = container.height() - margin.bottom - margin.top

    // Get new JSON data
    var data = [];
    var currentValue = principal;
    for( var i = 0; i < 30; i++) {
      var value = doCompoundInterest(currentValue, interestRate, 1, compoundFactor);

      entry = {}
      entry ["year"] = i;
      entry ["value"] = value;

      data.push(entry);
      currentValue = value;
    }

    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.year; })])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)

    var yAxis = d3.axisLeft()
        .scale(y)

  	// Scale the range of the data again
  	x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("svg#area").transition();

    var area = d3.area()
        .x(function(d) { return x(d.year); })
        .y0(height)
        .y1(function(d) { return y(d.value); });

   console.log(area);

    // Make the changes
    // var area = svg.select("g").select(".area").data(data);
    // area.exit().remove();
    // area.enter().append("path").attr("class", "area").attr("d", area);
    // area.transition().duration(750);

    var test = svg.select(".area");

    console.log(test);

    svg.select(".area")
        .duration(750)
        .attr("d", area);



    // svg.selectAll("path")
    //     .duration(750)
    //     .attr("d", area);
    svg.select(".x.axis") // change the x axis
        .duration(750)
        .call(xAxis);
    svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(yAxis);


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
      container = $('#d3'),
      width = container.width() - margin.left - margin.right,
      height = container.height() - margin.bottom - margin.top

  drawGraph(newData, margin, width, height);

});
