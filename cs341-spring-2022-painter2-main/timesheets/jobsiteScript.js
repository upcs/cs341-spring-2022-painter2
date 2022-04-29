//The script here is for version control the actuall script can be found on the google app scripts page for the jobsite spreadsheet
//https://script.google.com/home/projects/1EHd0q70ZReBgtorwWjNJG4QohMzQoy_4cNS-C9SsJARGDLudjW6-x81t/edit

//creates firestore entries from spreadsheet
function uploadData() {

    //determines which database to send data to
    const email = "timesheetdb-2b167@appspot.gserviceaccount.com";
    const key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwjgfI+fJXgLn+\nXe78KtV86bOErK5e2xiGtDLSH3ivQ90a+SofA3oQbCTdqwKB+B3fZF2aht3rcDgd\nGCF01oCh4QinGXAzYs+xG2ZkY2tQX88wQ4DG1gpz3ur+uIX95YKypKxjrt13Kxuu\nkNtsbKE2ypwAyGQplei0Z3nnPxBg8AAuhLluu2HA57Yum6+AOqIxCnFoTZSHzBSc\n6HKSCLrAkfx2DHOJN0xSFDJApXhn+q9p//UfLs2k0PQH6PiULEhCqOPfeIpMha4a\nxhmL9iSL4o8sTdlOttmkB2Ho5tfLQCCFPljpmZ7YRkJuSPYIv3svQo6kBsON/H5Y\nL0bIvc7dAgMBAAECggEAA26fZB7HwT+1XeaBkNFcWRNJ9BhPQ3TK40N5gXAvLmkJ\nUU7qrLOqmcsgZFbAs7oZCpCu6SQaCEukK5yeeeD5myv+uRDbh4QyOWUo9magXW2f\nX3bQeA0NIveAZfc8U5U0lzhwSXfKwlhKL3iNa2wpLiF+Kt26ZLyPS4J/cildriSz\n6tqLKsaq0lI2n2m7NxouwIAaJ3oJnXafo9wa+QHTTZBs2sDRixj3Swy9QYwK5ILo\nipL4Qg/qwXSUJ4oe1d9L7yM79gpewf5ZdaqXFyc/lL9QkozzApeePkyaA/kp8Mn4\nEVn/wL+xeXQ8CzK2UmahFSmHI4Z2ccDsSV/P1GnUgQKBgQDt1sNgzHqpUI5pKkjQ\nd9iY0QtdkFrikjRcWiFh6nzrYTyR+9gkIuetz4qKXGycISG7x+V1VyQC9MJ1e/b4\nAOlmRKkfPTxN/m/wKEEhn8/S5vmCV+/QIsNvhnU+/PiKu+0Gq3SyHixnvdXNlyMv\naJiZNnIYhwp+uiIQepIopDmfcQKBgQC+CUuXEAAZGCDY8pHXOr1LJY02fXxSaUmI\nVuxF4aiu8UWoiFYCQTxAEGVswc0RNs/mErqu/xCn2ZWbDoCYfSGQuXGurQUEXr3W\n3Gfhd+/qw0YFn2ouPLQmnZocYD19S6AXLI/10MMsbHtofvusrm230Oe1zRczgMpY\ngZAD+ZVILQKBgER2ar1FfxWX87aADn+7z+SFYEEpmY/YyCvBYhSefCEBV38qQJh+\nV7RnppiXbEgxHVXBf+KcF+il7ggFjBztnkHrB8fPR7mnwS8fV0hHiXpLNI15pLWE\nHD/RM5TTGvRMjjk6R5gyKVQfiBjrJZyy/iI0UvmOfc3m5IFb1xDN3SxxAoGACOJ2\nXkGpP4MZRgtRNjbQ0sqWp42GWnQBtBYcRcgfEs7E6vQ00TYrkvMxSrxk0gE2BxOp\nFrVmGfLaQ72R1Y9EGngREJGWQnYLehgj4y6wUNGAXJLva+n6ojOMGPeG6Gy4t1yl\n/mAcP99yhZgqPBCLoKRrsNw90XKcAzdLfGQWzqECgYAP2Fa2z1UEoVlX2P0e3y0o\nCOwWqb6oj3/E9JABpAXqMBQxaD7c2udetiSIK1AhmfxEpNxBxiLTe/1T/ygqGcpH\nAmbH3k+tdepBGNMTp0woRND8N/gGgDqdHzb9I32YCt/tkEPc4eFK5U780EP19JPK\nsrNCUOZmLQyo20a/LHk8tQ==\n-----END PRIVATE KEY-----\n";
    const projectID = "timesheetdb-2b167";
    
    var ui = SpreadsheetApp.getUi();
    var firestore = FirestoreApp.getFirestore(email,key,projectID);
  
    //clears the database
    const allDocs = firestore.getDocuments("jobsites");
    allDocs.forEach(js => {firestore.deleteDocument(js.path)})
  
    //gets document data
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "jobsites";
    var sheet = ss.getSheetByName(sheetName);
  
  
    //defines range of the spreadsheet
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if(lastRow == 1) {
      return;
    }
    var startRow =  2;
    var sourceRange = sheet.getRange(2,1,lastRow - startRow + 1, lastCol);
  
   
    //gets the data from spreadsheet
    var sourceData = sourceRange.getValues();
  
    var missingData = [];
  
    //could optimize this part by adding another loop, that checks the conditions 
    //this would minimize reads and writes, but would increase runtime
  
    //could also optimize by getting document on load and then comparing it to see what changed
    //Would reduce deletions and creations
    
    //loops through data and creates a firebase entry
    for(var i = 0; i < sourceData.length; i++) {
      if(sourceData[i][0] !== "" && sourceData[i][1] !== "" && sourceData[i][2] !== "" && sourceData[i][3] !== "" &&
      sourceData[i][4] !== "" && sourceData[i][5] !== "" && sourceData[i][6] !== ""  ) {
        var jobsiteData = {}
  
        jobsiteData.jobNum = sourceData[i][0];
        jobsiteData.customer = sourceData[i][1];
        jobsiteData.jobName = sourceData[i][2];
        jobsiteData.address = sourceData[i][3];
        jobsiteData.city = sourceData[i][4];
        jobsiteData.state = sourceData[i][5];
        jobsiteData.status = sourceData[i][6];
        
        firestore.createDocument("jobsites",jobsiteData);
      } else {
        missingData.push(i + startRow);
      }
    }
  
    //alerts user if any fields are missing
    if(missingData.length != 0){
      var missing = missingData.join(", ");
      ui.alert("please fill in missing data on rows: " + missing)  
    }
  }
  