// asyncBreeds.js 
// Asynchronous Return Values: https://web.compass.lighthouselabs.ca/days/w02d2/activities/868

const fs = require('fs');

const breedDetailsFromFile = function(breed, callback) { //usually 'callback' is named 'done' to rep func thats run when things are done 
  console.log('breedDetailsFromFile: Calling readFile...');  
  //Since readFile is an asynchronous function, it takes in a callback and returns undefined immediately
  //After readFile returns undefined, breedDetailsFromFile has no other code to execute thereafter and also returns undefined
  //But readFile still has work to do --it reads from disk and executes its callback later
  //BUT REMEMBER HOW THE AUTOMATIC UNDEFINED RETURN, MADE breedDetailsFromFile also return undefined already? (before even get the data?)
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    // ISSUE: ONLY Returning DATA from *inner* callback function, not breedDetailsFromFile (breedDetails already returned the auto undefined and ended)
    //if (!error) return data;
    if (!error) callback(data);
  });
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
};

const printData = (breed) => { // essentially we are passing back out 'data' from above, but we can name the parameter whatever
  console.log('Return Value: ', breed)
}

// we try to get the return value
const bombay = breedDetailsFromFile('Bombay', printData);
//console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!
                                          // breedDetailsFromFile function will always return undefined.
                                          // move into another function see printData 

/* Instead of using return data, we would have to modify our breedDetailsFromFile function to give back the data without using return.

Since the breedDetailsFromFile function has already finished executing before we get our data back from the file system, it is not possible to return data in the synchronous way that we are attempting here.

Instead, a callback should be passed in, and it will be given the data. In other words we will change from return data to callback(data).


We saw why and how asynchronous functions such as readFile, and our function breedDetailsFromFile, cannot simply return their data. Instead they must use callback functions to pass that data back.
*/



