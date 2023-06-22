class BankCategory {

    constructor(keyWordArray){
        this._keyWordArray = keyWordArray
    }

    compareToKeywords(data){
        for(i=0; i < this._keyWordArray.length; i++){

            if(data.includes(this._keyWordArray[i])){
                return true
            }
        }
        return false
    }


}