var w=250;
var h =260;
//console.log("width is :"+w);
//console.log("height is :"+h);
    var kol=0;
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

var compliants = function(wcar,wincome,wstreet,wsquid,max,min,boro='All Boroughs',srange='None'){
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
                        score = Math.ceil(((wstreet*street)+(wincome*(2159-income))+(wcar*car)+(wsquid*squid))/4);
                       //console.log(wincome*(2159-income));
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
            //console.log(maxscore_default)
            
            if(boro!='All Boroughs'){
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
        

            var colortip=function(cords){
                
                //c=0
                //polygon=0
                c = getcoordinate(cords)
                //console.log(c)
                polygon = L.polygon(c,{color:'black',fillColor:Randomcolor(),fillOpacity: 0.99}).addTo(map);
                
                //console.log(polygon)
                return polygon
                //console.log(c[0])
            }
            
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("text.bar")
                        .data(sorted)
            var poly=0;
            var poly1=0;
            var test=0;
            var clicked={};
            var assetLayerGroup = new L.LayerGroup();
            //var polytracker={};
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
                poly=colortip(d)
                return poly;   
            })
                .on('mouseout', function(){
                //d3.selectAll("text").remove();
                document.getElementById("ct").innerHTML='Select'
                document.getElementById("nhood").innerHTML='Select'
                document.getElementById("boro").innerHTML='Select'
                document.getElementById("score").innerHTML='Score'
               
                return map.removeLayer(poly);
                //polygon=0
                
            })
                .on('click',function(d){
                
                //console.log(poly1);
                if(clicked[d.census]==0)
                {
                    poly1=colortip(d)
                    
                    console.log('hello');
                    //console.log(getLayer(poly1));
                    clicked[d.census]=poly1;
                    
                    return assetLayerGroup.addLayer(poly1)
                    //return poly1.addTo(map)
                }
                else{
                    //console.log(map.getActiveOverlayLayers());
                    var poly2 = clicked[d.census]
                    console.log(poly2);
                    clicked[d.census]=0
                    map.removeLayer(poly2)
                    //assetLayerGroup.clearLayers();
                
                    return assetLayerGroup.clearLayers();
                }
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
                            if(i<10){
                                return (20+(30*i));
                            }})
                    .text(function(d,i){
                            if(i<10){
                            //console.log(d.census)
                             clicked[d.census]=0;
                            return i+1+'. '+(d.label).split(',')[0]+','+(d.BoroName)
                           
                            }})
                    .attr("font-size", "20px")
                }
        
    function initbar()
    {
 
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", "0 0 300 300")
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
