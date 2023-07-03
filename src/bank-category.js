class BankCategory {

    constructor(categoryName, keyWordArray){
        this._categoryName = categoryName;
        this._keyWordArray = [];
        this._keyWordArray = keyWordArray;
        this._totalValue;
        this._transactionsLog;
    }

    compareToKeywords(data){
        for(i=0; i < this._keyWordArray.length; i++){

            if((this._keyWordArray[i]).includes(data)){
                return true
            }
        }
        return false
    }

    addToLog(date, value, data){

        this._transactionsLog += date + " " + value + " " + data + "\n"; 

        if(value[0] === "-"){

            value = value.substring(1, value.length);
            value = value.toInt();
            this._totalValue =- value

        } else {

            value = value.toInt();
            this._totalValue =+ value
        }
    }

    parseLine(line){

        if(line === null){
            return;
        }

        lineArray = line.split(",");

        date = lineArray[0];
        value = lineArray[1];
        data = lineArray[2];

        if(date === null || value === null || data === null){
            return;
        }

        if(this.compareToKeywords(data)){
            this.addToLog(date, value, data);
        }
    }

    getCategoryName(){
        return this._categoryName;
    }

    getCategoryKeyWords(){
        return this._keyWordArray;
    }

    getTotalValue(){
        return this._totalValue;
    }

    printLog(){
        console.log(this._transactionsLog);
    }
}

module.exports = BankCategory;