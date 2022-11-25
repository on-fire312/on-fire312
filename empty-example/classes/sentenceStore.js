//Written by Oscar Hitchcock-Smith
//This is the dataStore class this is used to store the settings from local storage to easily save/load it
class dataStore {
    constructor(nSentence, nFilter) {
        this.filter = nFilter
        this.sentence = nSentence
    }
};