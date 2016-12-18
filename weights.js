weights = function(){
                var car = parseInt(layer.feature.properties['rveh']);
                var income=parseInt(layer.feature.properties['rincome']);
                var squid=parseInt(layer.feature.properties['squid']);
                var street=0
                // if min and max year is custom selected then mean of selected year's rank is returned as effective net complaint rank
                if((maxyear-minyear)!=11)
                    {
                        for(i=minyear;i<=maxyear;i++){
                        street+=parseInt(layer.feature.properties['rstreet'+i]);
                    }
                   // console.log(maxyear-minyear)
                    street=street/(maxyear-minyear);
                    }
                else{
                    street=parseInt(layer.feature.properties['rstreet']);
                }
                //console.log(street,'street');
                wtcar = $('#rankcar').val();
                wtincome = $("#rankincome").val();
                wtstreet = $("#rankcomplaint").val();
                wtsquid= $("#ranksquid").val();
                if(wtcar==''){
                    wtcar=1;
                }
                else if(wtcar>5 || wtcar<0){
                    $('#rankcar').effect("shake");
                    $('#rankcar').val('');
                    wtcar=1;
                }
                if(wtincome==''){
                    wtincome=1;
                }
                else if(wtincome>5 || wtincome<0){
                    $('#rankincome').effect("shake");
                    $('#rankincome').val('');
                    wtincome=1;
                }
                if(wtstreet==''){
                    wtstreet=1;
                }
                else if(wtstreet>5 || wtstreet<0){
                    $('#rankcomplaint').effect("shake");
                    $('#rankcomplaint').val('');
                    wtstreet=1;
                }
                if(wtsquid==''){
                    wtsquid=1;
                }
                else if(wtsquid>5 || wtsquid<0){
                    $('#ranksquid').effect("shake");
                    $('#ranksquid').val('');
                    wtsquid=1;
                }
                score= (wtcar*car)+(wtincome*(2159-income))+(wtstreet*street)+(wtsquid*squid);
                //console.log(score);
            
                sumwts=wtcar+wtincome+wtstreet+wtsquid;
                //console.log(sumwts);
                //if weights are changed then queue will update maps and top census tracts
                queue.push(sumwts);
                //if yearrange is changed then minqueue and maxqueus would track changes and update top census tracts.  
            
                //console.log(queue, queue.length)
                if(queue.length>2){
                    queue.shift();
                    
                }
             
//               needs update when weights are updated
                if(queue.length>1 && queue[0]!=queue[1])
                 {
                    //d3.selectAll("text").remove();
                    compliants(wtcar,wtincome,wtstreet,wtsquid,maxyear,minyear,bname,[minscore,maxscore]);
                    map.removeLayer(geojson);
                    readdata();
                    //layer.bringToFront();
                    
                }
                //console.log(maxscore_default)
                document.getElementById("score").innerHTML=Math.ceil(((score/maxscore_default)*100)/4)
              
                
                //console.log(rankcar);
            }