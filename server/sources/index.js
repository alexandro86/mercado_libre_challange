const https = require("https");
const options = "https://api.mercadolibre.com/sites/MLA/search?q=:query";

/**
 * Return a result of query all items over api
 * @param {options} of request, it could be an url or an object 
 */
function getProducts(options) {
    let results;
    let chunks = [];
    
    const req = https.request(options, res => {
        res
            .on("data", data => {
                chunks.push(data);
            })
            .on("end", () => {
                let bufferArray = Buffer.concat(chunks);
                let schema = JSON.parse(bufferArray);
                results = schema.results;
                console.log(results)
            })
    });
    
    req.on("error", e => {
      console.error(e);
    });
    req.end();

}

module.exports = {
    options,
    getProducts
}
