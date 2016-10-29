var w=300;
var h =280;
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


var compliants = function(zip){
    var link1=''
    if(document.getElementById("ctmain").checked){
            link1 = 'data/callsfiltered2.csv'
         }
    else{
            link1 = 'data/complainfilternta.csv'
        }  
        d3.csv(""+link1,function(calls){
            data = calls.map(function(d){
                call = +(d[''+zip]);
                ct =  (d['Complaints']);
                return {"callsmade":call,"Cencus":ct};
            })
            bars(data);
        })
        }
        
        var percent = d3.format('%');

var bars = function(data){
            var max =d3.max(data,function(d){
                   return d['callsmade'];
                   })
                     
             var sorted = data.sort(function(x, y){
               return d3.descending(x.callsmade, y.callsmade);
            });
            
          
            
             console.log(sorted)
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Complain Type:</strong> <span style='color:red'>" +d['Cencus']+":</span><strong>"+d['callsmade']+'</strong>';
                      })
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("rect.bar")
                        .data(sorted)
             
            //x.domain(data.map(function(d) { return d.Cencus; }));
            //y.domain([50, d3.max(sorted, function(d) { return d.callsmade/100; })]);
            //console.log(x);
            //console.log(y);
            vis.call(tip);
            
            var result = $.grep(data, function(e){ return e["callsmade"] == (max); });
            
//            vis.append('g')
//                .attr("class", "x axis")
//                  .attr("transform", "translate(0," + height + ")")
//                  .call(xAxis)
//                  .append("text")
//                    //.attr("dy", ".71em")
//                    .style("text-anchor", "end")
//                    .text("Type of Complaint(Please Hover)")
//                    .attr('x','180')
//                    .attr('x','210')
//                    .attr('y','10');
//    
//             vis.append("g")
//              .attr("class", "y axis")
//              .call(yAxis)
//            .append("text")
//              .attr("transform", "rotate(-90)")
//              .attr("y", 6)
//              //.attr("x")
//              //.attr("dy", ".71em")
//              .style("text-anchor", "end")
//              .text("Frequency");
            
           
            //console.log(function(d){return d['Cencus']})
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar")
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                //.on('mouseclick',mapupdate(function(d){return d['Census'];}));
            bars.on('click',function(d){
                console.log(d)
                mapupdate(d['Cencus']);
            })
            bars.exit()
                .remove()
            
            
            
            var h = 7;
            bars
                .attr("stroke-width", 4)
                .attr("width", h)  
                 .attr("x", function(d, i) {
                        if(i<20){
                       return (i * 12);
                        }
                    })
                .transition()
                    .delay(200)
                    .ease("exp")
                    .attr("height", function(d,i) 
                          {
                    if(i<20){
                    //console.log("top ten:"+max);
                    return ((d.callsmade/max)*height);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                    return (height - (((d.callsmade/max)*height)));
                        }
                    })
            
             
        }
        
    function initbar()
    {
 
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.attr("preserveAspectRatio", "xMaxYMid")
            //.attr("viewBox", "0 0 280 280")
            //.classed("svg-container", true)
            //.classed("svg-content-responsive", true); 
        
        
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
