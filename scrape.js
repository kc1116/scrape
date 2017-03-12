var testindex = 0;
var loadInProgress = false; //This is set to true when a page is still loading
 
/*********SETTINGS*********************/
const webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
/*********SETTINGS END*****************/
 
page.onConsoleMessage = function(msg) {
    console.log(msg)
};
/**********DEFINE STEPS THAT PHANTOM SHOULD DO***********************/
steps = [
 
	//Step 0 - Open Amazon home page
    ()=>{
        page.open("https://amazon.com", function(status){
			
		});
    },
	//Step 1 - Populate and submit the login form
    (code)=>{
		page.evaluate((code)=>{
			document.getElementById("twotabsearchtextbox").value = code;
            var els = document.getElementsByClassName("nav-input")[0].click();
		}, code);
    },
	//Step 2 - evaluate page
    (code)=>{
		 var result = page.evaluate((code)=>{
			var product = document.getElementsByClassName("a-size-medium a-color-null s-inline scx-truncate s-access-title  color-variation-title-replacement a-text-normal")[0].innerHTML;
            console.log("-------------------------RESULTS----------------------------")
            console.log("Code: " + code + "\n\tProduct: " +product);
		}, code);
    },
];
/**********END STEPS THAT FANTOM SHOULD DO***********************/
 
//Execute steps one by one
interval = setInterval(executeRequestsStepByStep,50);
 
function executeRequestsStepByStep(){
    var codes = ["B0009YYPCG"];
    var codeIndex = 0;
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        if(testindex == 1){
            steps[testindex](codes[codeIndex]);
        } else if(testindex == 2) {
            steps[testindex](codes[codeIndex]);
        } else {
            steps[testindex]();
        }
        testindex++;
        codeIndex++;
    }
    if (typeof steps[testindex] != "function") {
        phantom.exit();
    }
}
 
/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = () => {
    loadInProgress = true;
    console.log('STARTING')
};
page.onLoadFinished = () => {
    loadInProgress = false;
    console.log('FINISHED')
};
page.onConsoleMessage = (msg) => {
    console.log(msg);
}