const express = require("express");
//creating express instance
const app = express();

app.use(express.urlencoded({
    extended: true
  }))
  
app.use(express.json())

// This variable hold the value of total points in account
let totalPoints = 0;

/* This object will hold different payer's name as property . 
   This property will hold total points of that payer .   */
let data = {};

/**
 * This array will hold Objects with three properties:
 * payer (String), points (Int), timestamp (Date)
 * Sorted from oldest date - most recent date.
 */
let timeStampData = []

/**
 * This function will update the Data Array with adding points .
 * Return True if added succesfully .
 * Return False if failed to add points. 
 */
function insertIntoData(transactionObj) {
    //  If there is existing payer && sum of payer's points and adding points is less then 0, return false
    if (data.hasOwnProperty(transactionObj.payer)) {
        let sum = data[transactionObj.payer] + transactionObj.points;
        if (sum < 0) {
            return false;
        }else {
            data[transactionObj.payer] = sum;
            return true;
        }
    }
    //  If the payer is not already existed && adding points is less then 0, return false
    else if (transactionObj.points < 0) {
        return false;
    }
    //  Else, create new payer object holding adding point and push it to data. 
    else {
        data[transactionObj.payer] = transactionObj.points;
        return true;
    }
}

/**
 * This function will update the Data Array with points being spent . 
 */
 function updateData(payerObj, pointSpent) {
    data[payerObj.payer] -= pointSpent;
}

/**
 * This function will make change to timeStampData, eliminating negative Points value .
 * Combine Index holding negative Points value to the smaller Index that hold the same payer . 
 */
function removeNegativePoints(payerPoint) {
    let negativePoints = payerPoint.points

    // Find the Negative Points position
    for(let i = timeStampData.length - 1; i >= 0; i--) {
        if (timeStampData[i].points == payerPoint.points) {
            var tempPosition = i
            timeStampData.splice(i);
            break;
        }
    }
    for (let i = tempPosition - 1; i >= 0; i++) {
        if (timeStampData[i].payer == payerPoint.payer) {
            timeStampData[i].points = timeStampData[i].points + negativePoints
            if (timeStampData[i].point < 0) {
                negativePoints = timeStampData[i].points
                timeStampData.splice(i);
            }else {
                break;
            }
        }
    } 
}

/**
 * This function will spend point according to timeStampData Array (Sorted) .
 * Return spendList array that holds total spending points for each payer . 
 */
function spendPoint(point) {
    let spendList = []
    // Assuming point is larger than 0
    while (timeStampData.length > 0 && point > 0) {
        if ( (point - timeStampData[0].points) >= 0) {
            point = point - timeStampData[0].points;
            updateData(timeStampData[0], timeStampData[0].points)

            

            // Updating spendList Array
            let notExisted = true;
            for (let i = 0; i < spendList.length; i++) {
                if (spendList[i].payer == timeStampData[0].payer) {
                    notExisted = false;
                    spendList[i].points += -timeStampData[0].points
                }
            }
            if (notExisted) {
                let object = {
                    "payer": timeStampData[0].payer,
                    "points": -timeStampData[0].points
                }
                spendList.push(object)
            }

            totalPoints = totalPoints - timeStampData[0].points;
            timeStampData.shift();
        }
        // if timeStampData[0].points is > than current points need to be spent
        else{ 
            timeStampData[0].points = timeStampData[0].points - point;
            updateData(timeStampData[0], point)
            totalPoints = totalPoints - point;

            // Updating spendList Array
            let notExisted = true;
            for (let i = 0; i < spendList.length; i++) {
                if (spendList[i].payer == timeStampData[0].payer) {
                    notExisted = false;
                    spendList[i].points += -point
                }
            }
            if (notExisted) {
                let object = {
                    "payer": timeStampData[0].payer,
                    "points": -point
                }
                spendList.push(object)
            }
            point = 0;
        }
    }
    return spendList;
}

/**
 * /add route
 * Accepting POST request
 */
app.post('/add', (req, res) => {
    req.body; // JavaScript object containing the parse JSON
    let transactionObj = req.body;
    if (insertIntoData(transactionObj)) {
        transactionObj.timestamp = new Date(transactionObj.timestamp)
        timeStampData.push(transactionObj);

        //Sort timeStampData Array according to timestamp (Odest - Most Recent)
        timeStampData.sort(function(x, y){
            return x.timestamp - y.timestamp;
        })

        if (transactionObj.points < 0) {
            removeNegativePoints(transactionObj);
        }
        totalPoints += transactionObj.points;
        res.send("Points added.")
    }
    // Else, return Error message.
    else {
        res.send("Failed to add transaction.")
    }
    res.end()
});

/**
 * /spend route
 * Accepting POST request
 */
app.post("/spend", function(req, res) {
    req.body; // JavaScript object containing the parse JSON
    let transactionObj = req.body;
    let spendingPoint = transactionObj.points;

    // if spendingPoint is bigger than current total points, return Error Message .
    if (spendingPoint > totalPoints) {
        res.send("Not enought points")
    }
    // Else, execute spending
    else {
        let spendList = spendPoint(spendingPoint)
        res.json(spendList);
    }

    res.end()
});

/**
 * /balance route
 * Accepting GET request
 */
app.get("/balance", function(req, res) {
    res.json(data)
    res.end()
});

app.listen(8000, function() {
 console.log("Node server is running on port 8000..");
});