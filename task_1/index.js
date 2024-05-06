import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)


function decode(encArr, glossary) {
    const ids = new Set()

    const decodedArr = encArr.map(({ mediaId, groupId, service, formatSize, ca }) => {
        ids.add(mediaId);
        const decodedElm = {
            mediaId: glossary[mediaId],
            groupId,
            service,
            formatSize,
            ca
        }
        return decodedElm;
    })

    return ({
        uniqueIds: Array.from(ids),
        decoded: decodedArr
    })
}

console.log(decode(encoded, translations))
