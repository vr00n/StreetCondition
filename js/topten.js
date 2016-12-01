var w=250;
var h =260;
//console.log("width is :"+w);
//console.log("height is :"+h);

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

var colors = ['#1abc9c','#5499c7','#af7ac5','#ec7063','#cd6155','#dc7633','#eb984e','#f5b041','#f4d03f','#58d68d','#52be80','#34495e'];
function Randomcolor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var compliants = function(wcar,wincome,wstreet,wsquid,max,min,boro='All',srange='None'){
    var link1='data/master5.csv'
    d3.csv(""+link1,function(calls){
            data = calls.map(function(d){
                 var readd3 = function(d){
                        geometry = (d['geometry'].replace(/\POLYGON |[()]|MULTI/g,'').split(','));
                        //street = +(d['rstreet']);
                        var street=0
                        if((max-min)!=11){
                            for(i=min;i<=max;i++){
                                street+=+(d['rstreet'+i]);
                            }
                            street=street/(max-min);
                            }
                        else{
                            street=+(d['rstreet']);
                        }
                        income =  +(d['rincome']);
                        car=  +(d['rveh']);
                        census = (d['BoroCT2010'])
                        geoLabel=(d['GEO.display-label'])
                        boroName = d['BoroName']
                        squid = d['squid']
                        nbrhood = d['NTAName']
                        score = Math.ceil(((wstreet*street)+(wincome*income)+(wcar*car)+(wsquid*squid))/4);
                     //console.log(score);
                        return {"label":geoLabel,"score":score,"census":census,"geometry":geometry,"BoroName":boroName,"neighbor":nbrhood};
                    }
                    return readd3(d);
                
                
            })
            bars(data,boro,srange);
        })
        }
        
        var percent = d3.format('%');

var bars = function(data,boro,srange){
            
            maxscore_default = d3.max(data,function(d){
                return d.score;
            })
            console.log(maxscore_default)
            
            if(boro!='All'){
                data= data.filter(function(data){
                    //console.log(data.BoroName)
                    return data.BoroName==boro;
                })
            }
    //console.log(srange);
            if(srange!='None'){
                data= data.filter(function(data){
                    //console.log(srange[0]*maxscore_default*0.01,srange[1]*maxscore_default*0.01+1);
                    return data.score>(srange[0]*maxscore_default*0.01) && data.score<(srange[1]*maxscore_default*0.01+1)
                })
            }
            //console.log(data);
             var sorted = data.sort(function(x, y){
               return d3.descending(x.score, y.score);
            });
            //console.log(sorted);
            var getcoordinate=function(d){
                coordinates=[]
                //console.log(d.geometry.length);
                for(j=0;j<d.geometry.length;j++)
                {
                    var v=d.geometry[j].trim().split(' ');
                    //console.log(v)
                    cor=[]
                    for(n=0;n<v.length;n++){
                        cor.push(parseFloat(v[v.length-1-n]));
                    }
                    coordinates.push(cor)
                }
                
                return coordinates
            }
        
            var polygon
            var c
            var colortip=function(cords){
                
                //c=0
                //polygon=0
                c = getcoordinate(cords)
                //console.log(c)
                polygon = L.polygon(c,{color:'black',fillColor:Randomcolor(),fillOpacity: 0.99}).addTo(map);
                //console.log(c[0])
            }
            
            //console.log(sorted);
           // var polygon1=0
            
          /*  if(polygon1!=0){
               
                map.removeLayer(polygon1)
            }
    
            var colortip1=function(cords){
                
                //console.log(cords);
                c=0
                //polygon1=0
                c = getcoordinate(cords)
                //console.log(c)
                polygon1 = L.polygon(c,{color:'black',fillColor: getColor1(cords.score),fillOpacity: 0.99}).addTo(map);
                //console.log(polygon)
            }*/
            
            //sorted.forEach(function(d,i){colortip1(d)});
             //map.removeLayer(geojson);
             //console.log(sorted)
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      
                      
                      
                      //.html(function(d) {
                    //    return "<strong>Score based ranks:</strong> <span style='color:red'>" +d['census']+":</span><strong>"+d['score']+'</strong>';
                     // })
              
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("text.bar")
                        .data(sorted)
 
            vis.call(tip);
            bars.enter()
                .append("svg:text")
                .attr("class", "bar")
                .on('mouseover', function(d){
                //console.log(d.census)
                document.getElementById("ct").innerHTML=d.census.toString().slice(6,9);
                document.getElementById("nhood").innerHTML=d.neighbor
                document.getElementById("boro").innerHTML=d.BoroName;
                document.getElementById("score").innerHTML=Math.ceil(((d.score/maxscore_default)*100));
                
                return colortip(d);   
            })
                .on('mouseout', function(){
                //d3.selectAll("text").remove();
                document.getElementById("ct").innerHTML='Select'
                document.getElementById("nhood").innerHTML='Select'
                document.getElementById("boro").innerHTML='Select'
                document.getElementById("score").innerHTML='Score'
                map.removeLayer(polygon);
                //polygon=0
                
            })
                .on('click',function(d){
                
                //return (this.tog = !this.tog) ?  colortip(d): map.removeLayer(polygon) ;
            })
            bars.exit()
                .remove()
            var w = 7;
            bars
            //    .attr("stroke-width", 5)
            //    .attr("width", w)  
              //   .attr("x", 20)
                .transition()
                    .delay(300)
                    .ease("linear")
                 //   .attr("height",10)
                    .attr("y", function(d,i){
                            if(i<6){
                                return (20+(30*i));
                            }})
                    .text(function(d,i){
                            if(i<5){
                            //console.log(d.census)
                            return i+1+'. '+(d.label).split(',')[0]
                            }})
                    .attr("font-size", "20px")
                }
        
    function initbar()
    {
 
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", "0 0 200 200")
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
