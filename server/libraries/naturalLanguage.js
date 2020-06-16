const language = require('@google-cloud/language');
const colors = require('colors/safe');



async function annotateText(nombre, text) {
    const client = new language.LanguageServiceClient();
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    // analiza sintaxis 
    const encodingType = 'UTF8';
    // Detects the sentiment of the document
    const features = {
        extractSyntax: true,
        extractEntities: true,
        extractDocumentSentiment: true,
        extractEntitySentiment: true,
        // classifyText: true
    }
    let [annotateText] = await client.annotateText({ document, features, encodingType: 'NONE' }).catch(err => console.log(err));
    let tags = nombre;
    annotateText.tokens.forEach(entity => {
        if (
            (entity.partOfSpeech.tag === 'NOUN' && (entity.dependencyEdge.label === 'NSUBJ' || entity.dependencyEdge.label === 'DOBJ' || entity.dependencyEdge.label === 'POBJ' || entity.dependencyEdge.label === 'CONJ')) ||
            (entity.partOfSpeech.tag === 'ADV' && entity.dependencyEdge.label === 'NEG') ||
            (entity.partOfSpeech.tag === 'ADP' && (entity.dependencyEdge.label === 'MARK' || entity.dependencyEdge.label === 'DEP')) ||
            (entity.partOfSpeech.tag === 'VERB' && (entity.dependencyEdge.label === 'PARATAXIS' || entity.dependencyEdge.label === 'ROOT' || entity.dependencyEdge.label === 'XCOMP' || entity.dependencyEdge.label === 'VMOD' || entity.dependencyEdge.label === 'CONJ'))) {

            tags += ` ${entity.text.content}`;
        }
        if (entity.partOfSpeech.tag === 'PUNCT' && entity.dependencyEdge.label === 'P') {
            tags += ','
        }
        console.log(`PALABRA :${colors.blue(entity.text.content)}   LABEL:${colors.green(entity.dependencyEdge.label)}   tags: ${colors.red(entity.partOfSpeech.tag)}  aspecto: ${colors.blue(entity.partOfSpeech.aspect)}`);
    });

    return tags;

}


module.exports = {
    annotateText
}