   weights = function(){
                var car = parseInt(layer.feature.properties['rveh']);
                var income=parseInt(layer.feature.properties['rincome']);
                var street = parseInt(layer.feature.properties['rstreet']);
                var wtcar = $('#rankcar').val();
                var wtincome = $("#rankincome").val();
                var wtstreet = $("#rankcomplaint").val();
                if(wtcar==''){
                    wtcar=1;
                }
                if(wtincome==''){
                    wtincome=1;
                }
                if(wtstreet==''){
                    wtstreet=1;
                }
                var score= (wtcar*car)+(wtincome*income)+(wtstreet*street);
                document.getElementById("score").innerHTML=Math.ceil(score/3)
                sumwts=wtcar+wtincome+wtstreet;
                console.log(sumwts);
                queue.push(sumwts);
                console.log(queue, queue.length)
                if(queue.length>2){
                    queue.shift();
                }
                if(queue.length>1 && queue[0]!=queue[1])
                 {
                
                compliants(wtcar,wtincome,wtstreet);
                }
                //console.log(rankcar);
            }