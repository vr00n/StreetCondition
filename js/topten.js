var w=250;
var h =250;
console.log("width is :"+w);
console.log("height is :"+h);


var margin = {top: 0, right: 50, bottom: 10, left: 20},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");


var compliants = function(wcar,wincome,wstreet){
    var link1='data/proto1.csv'
    d3.csv(""+link1,function(calls){
            data = calls.map(function(d){
                street = +(d['rstreet']);
                income =  +(d['rincome']);
                car=  +(d['rveh']);
                census = (d['BoroCT2010'])
                score = Math.ceil(((wstreet*street)+(wincome*income)+(wcar*car))/3);
                return {"street":wstreet*street,"income":wincome*income,"car":wcar*car,"score":score,"census":census};
            })
            bars(data);
        })
        }
        
        var percent = d3.format('%');

var bars = function(data){
            var max =d3.max(data,function(d){
                   return d['score'];
                   })
                     
             var sorted = data.sort(function(x, y){
               return d3.descending(x.score, y.score);
            });
            
          
            
             //console.log(sorted)
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Score based ranks:</strong> <span style='color:red'>" +d['census']+":</span><strong>"+d['score']+'</strong>';
                      })
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("rect.bar")
                        .data(sorted)
 
            vis.call(tip);
            
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar")
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            bars.exit()
                .remove()
            
            
            
            var w = 7;
            bars
                .attr("stroke-width", 5)
                .attr("width", w)  
                 .attr("x", function(d, i) {
                        if(i<20){
                       return (i * 10);
                        }
                    })
                .transition()
                    .delay(200)
                    .ease("exp")
                    .attr("height", function(d,i) 
                          {
                    if(i<20){
                    //console.log("top ten:"+max);
                    return ((d.score/max)*height);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                    return (height - (((d.score/max)*height)));
                        }
                    })
            
             
        }
        
    function initbar()
    {
 
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMaxYMid")
            .attr("viewBox", "0 0 280 280")
            .classed("svg-container", true)
            .classed("svg-content-responsive", true); 
        
        
   //class to make it responsive
            
        //console.log("svg", svg)
        svg.append("svg4:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "none")
            .attr("fill", "none")
            

        svg.append("svg4:g")
            .attr("id", "barcharta")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        
        
    }
