/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
const https = require('https');

module.exports = function(RED) {
    function APRSRequest(n) {
        RED.nodes.createNode(this,n);
        var node=this;

        node.creds = RED.nodes.getNode(n.creds);

        node.on('input',function(msg){

            if (!msg.call && !n.call || !msg.what&&!n.what){
                node.status({fill:"red",shape:"ring",text:"you missed something, try again"});
            }

            var CALL=msg.call||n.call;
            var WHAT=msg.what||n.what;
            var APIKEY=node.creds.apiKEY;

            var request;
            if (WHAT!=="msg"){
                request="https://api.aprs.fi/api/get?name="+CALL+"&what="+WHAT+"&apikey="+APIKEY+"&format=json"
            } else{
                request="https://api.aprs.fi/api/get?dst="+CALL+"&what="+WHAT+"&apikey="+APIKEY+"&format=json"
            }

            https.get(request, function (responce){
                const { statusCode } = responce;
                const contentType = responce.headers['content-type'];
              
                let error;
                if (statusCode !== 200) {
                  error = new Error('Request Failed.\n' +
                                    `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                  error = new Error('Invalid content-type.\n' +
                                    `Expected application/json but received ${contentType}`);
                }
                if (error) {
                  console.error(error.message);
                  // consume response data to free up memory
                  responce.resume();
                  return;
                }
              
                responce.setEncoding('utf8');
                let rawData = '';
                responce.on('data', (chunk) => { rawData += chunk; });
                responce.on('end', () => {
                  try {
                    const parsedData = JSON.parse(rawData);
                    msg.payload=parsedData;
                    node.send(msg);
                  } catch (e) {
                    console.error(e.message);
                  }
                });
            });
        });  
    }
    RED.nodes.registerType("APRS",APRSRequest);
}