class BankCategory {

    constructor(categoryName, keyWordArray=[]){
        this._categoryName = categoryName;
        this._keyWordArray = [];
        this._keyWordArray = keyWordArray;
        this._totalValue;
        this._transactionsLog;
    }

    compareToKeywords(data){

        
        
        for(let i=0; i < this._keyWordArray.length; i++){

            if(data.includes(this._keyWordArray[i])){
                return true;
            }
        }
        return false;
    }

    addToLog(date, value, data){

        this._transactionsLog = `\n${date} , ${value}, ${data}`;
        this._totalValue += value;
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

    getTransactionsLog(){
        return this._transactionsLog;
    }
}

module.exports = BankCategory;