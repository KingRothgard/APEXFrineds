require('dotenv').config();
const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const {
    json
} = require("express");
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



            



// might be able to make an array of all the usernames and then rund a for loop, this would be a refactor step do not try to do it right off the bat 




app.get("/", function (req, res) {

  let name = "";
  
    // KingRothgard   Origin
    
    const url = "https://public-api.tracker.gg/v2/apex/standard/profile/origin/KingRothgard?" + process.env.API + "&Accept=json&Accept-Encoding=gzip";
    
    https.get(url, function (response) {

        let chunks = [];
        let  name = "";
        let lifeTimeKills = "";
        let lifeTimeDamage = "";
        let level = "";
        let rank = "";
        let legends=[];
        let main = "";
        let mainName;
        let mainUrl;

        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {

            let data = Buffer.concat(chunks);
            let kingRothgard = JSON.parse(data);


            // putting into varible
            name = kingRothgard.data.platformInfo.platformUserId;
           

            lifeTimeKills = kingRothgard.data.segments[0].stats.kills.value;
          

            lifeTimeDamage = kingRothgard.data.segments[0].stats.damage.value;
           

            level =kingRothgard.data.segments[0].stats.level.value;
           

            rank = kingRothgard.data.segments[0].stats.rankScore.metadata.iconUrl;
          



            var i;

            for (i = 1; i <13; i++) {

            const kills = kingRothgard.data.segments[i].stats.kills.value;
            const name = kingRothgard.data.segments[i].metadata.name;
            const imgUrl = kingRothgard.data.segments[i].metadata.bgImageUrl;
            const legend = {kills, name, imgUrl};
            legends.push(legend);

            }

            // compare all the values to find the highest 
            

            // find the max value in the array of objects
            var topKills = Math.max.apply(Math,legends.map(function(o){return o.kills;}))

            // uses topKills values and looks throught array of onjects and returns the onbject with that value
            main = legends.find(function(o){ return o.kills == topKills; })

         

            // display name and img as background
            mainName = main.name;
            mainUrl = main.imgUrl;
            
           
            
            
            res.render("landingpage", {
                nameKey: name,
                lifeTimeKillsKey: lifeTimeKills,
                lifeTimeDamageKey: lifeTimeDamage,
                levelKey: level,
                rankKey: rank,
                mainNameKey: mainName,
                mainUrlKey: mainUrl
    
             });
           
        });
      
    });
});
   





app.get("/:user", function(req, res){
  
    let requestedPlayer = req.params.user;
    let name = "hi";
    
    let player = "hi";
   console.log (requestedPlayer);
   
//  do https request with requestedPlayer
    let url = "https://public-api.tracker.gg/v2/apex/standard/profile/origin/" + requestedPlayer + "?" + process.env.API + "&Accept=json&Accept-Encoding=gzip";





  res.render("playerprofile" , {
    name: name  
  } )
});

















app.listen(2000, function () {
    console.log("SEVER IS LIVE");
});



// api format 
// TRN-Api-Key: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
// api key
// check postman fo