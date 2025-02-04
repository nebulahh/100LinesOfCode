http = require('http');
const fs = require('fs');
const url = require('url');

var file = "log.txt";
let date_ob = new Date();

function getFullDate() {
    // adjust 0 before single digit date
    let currentDate = ("0" + date_ob.getDate()).slice(-2);
    let currentMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let currentYear = date_ob.getFullYear();
    let currentHour = date_ob.getHours();
    let currentMinute = date_ob.getMinutes();
    
    var fullDate = `${currentYear}-${currentMonth}-${currentDate} ${currentHour}:${currentMinute}`;

    return fullDate;
}

http.createServer(function (req, res) {
    var fullDate = getFullDate();

    if (req.url === '/favicon.ico')  
        return res.end();
    else {
        var tempText = req.url.replace("/", " ");         
        var text = fullDate + tempText + "\n";
    }

    fs.appendFile(file, text, function(err) {
        if (err) console.log(err);
    });

    fs.readFile(file, function(err, data) {
        if (err) {
            return res.end("404 Not Found");
        } 
        res.write(data);
        return res.end();
    });

}).listen(3000);
