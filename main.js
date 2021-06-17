// Problem:
// Provide some Python code that can be used to measure how long a function takes to run in a friendly
// format. The amount of time can range from less than a second to several hours and should be easy
// for a human to read (for example “00:00:00:00012” is not a good output).

// At first sight, there are two ways of solving this: 1) Using perfomance.now() and 2) Using Date()
async function timeMeter(functionToRun) {
    let timeShow = null
    let timeShow2 = null
    timeShow = document.querySelector("#timeShow") // This is just for showing the result of elapsed time in the HTML.
    timeShow2 = document.querySelector("#timeShow2") // This is just for showing the result of elapsed time in the HTML.
    
    let initTime = performance.now()            //  <-- 1st approach using performance.now()
    // let initTime = new Date().getTime()      // <-- 2nd way to solve using Date()
    await new Promise((resolve, reject) => {    // I use promises to properly wait until the execution of the function has finished.
        resolve ( functionToRun() )             // In this case, I just show an alert of the "return" of the Function I want to measure.
    })
    let finishTime = performance.now()
    // let finishTime = new Date().getTime()    // <-- 2nd way to solve using Date()
    let timeDiff = ((finishTime - initTime)/1000) // This is the original amount of time taken by the function to run. In milliseconds.


    // From now on... I just use the original timeDiff to separate from seconds, minutes, hours and days.
    const MILLISECONDS = timeDiff.toFixed(3)
    const SECONDS = Math.floor(timeDiff)
    timeDiff = Math.floor(timeDiff / 60)
    const MINUTES = Math.round(timeDiff % 60)
    timeDiff    = Math.floor(timeDiff / 60)
    const HOURS = Math.round(timeDiff % 24)
    timeDiff    = Math.floor(timeDiff / 24)
    const DAYS = Math.round(timeDiff % 365)
    timeDiff = Math.floor(timeDiff / 365)

    // This function is just to console.log another format.
    function betterFormat() {
        if (MILLISECONDS < 0.1) {
            timeShow.innerHTML = (`${DAYS}d:${HOURS}h:${MINUTES}m:${MILLISECONDS}s`)
        }
        else {
            timeShow.innerHTML = (`${DAYS}d:${HOURS}h:${MINUTES}m:${SECONDS}.${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000}s`)
        }
    }

    // Conditionals to properly output in the console, the result. My first Approach, then I use the betterFormat function.
    if (DAYS > 0) {
        timeShow2.innerHTML =  (`Time elased: ${DAYS} days, ${HOURS - DAYS*24} hours, ${MINUTES - HOURS*60} minutes and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        console.log(`Time elased: ${DAYS} days, ${HOURS - DAYS*24} hours, ${MINUTES - HOURS*60} minutes and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        betterFormat()
    } else if (HOURS > 0) {
        timeShow2.innerHTML = (`Time elased: ${HOURS} hours, ${MINUTES - HOURS*60} minutes and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        console.log(`Time elased: ${HOURS} hours, ${MINUTES - HOURS*60} minutes and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        betterFormat()
    } else if (MINUTES > 0) {
        timeShow2.innerHTML = (`Time elased: ${MINUTES} min and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        console.log(`Time elased: ${MINUTES} min and ${SECONDS - MINUTES*60} seconds with ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        betterFormat()
    } else if (SECONDS >= 1 ) {
        timeShow2.innerHTML = (`Time elased: ${SECONDS} seconds and ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        console.log(`Time elased: ${SECONDS} seconds and ${MILLISECONDS*1000 - Math.floor(MILLISECONDS)*1000} milliseconds`)
        betterFormat()
    } else if (MILLISECONDS >= 0) {
        timeShow2.innerHTML = (`Time elased: ${MILLISECONDS} seconds`)
        console.log(`Time elased: ${MILLISECONDS} seconds`)
        betterFormat()
    }
    else return
}
// Inside this goes the function that is going to be measured.
// Observation: Just change the value of n. n = 50000 in my laptop runs in 11 seconds, but a value of n = 200000 can take up to 3 minutes (2 mins 47 seconds to be precise).
function functionToMeasure(){
    var n = parseInt(document.getElementById('a').value) // Here I get the value from the html Input
    for (let x of Array(n).keys() ) {
        for (let y of Array(n).keys()) {
            let a = Math.sqrt(x*y) - 2
        }
    }
}

// this functions is self invoked when accessign the index.html in the browser.
// timeMeter(functionToMeasure)