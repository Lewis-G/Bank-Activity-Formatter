class BankCategory {

    constructor(categoryName, keyWordArray=[]){
        this._categoryName = categoryName;
        this._keyWordArray = keyWordArray;
        this._totalValue = 0;
        this._transactionsList = "";
    }

    compareToKeywords(inputString){

        for(let i=0; i < this._keyWordArray.length; i++){

            if(inputString.includes(this._keyWordArray[i])){
                return true;
            }
        }
        return false;
    }

    addToListAndValue(date, value, data){

        this._transactionsList += `Date: ${date} , Value: $${value}, Description: ${data}\n`;
        this._totalValue += value;
    }

    get categoryName(){
        return this._categoryName;
    }

    get categoryKeyWords(){
        return this._keyWordArray;
    }

    get totalValue(){
        return this._totalValue;
    }

    get transactionsList(){
        return this._transactionsList;
    }
}

module.exports = BankCategory;