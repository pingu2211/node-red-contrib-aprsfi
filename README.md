# node-red-contrib-APRS
A [Node RED](https://nodered.org/) Wrapper of the [APRS.FI API](https://aprs.fi/page/api)

This node provides a wrapper for the api however it is left to the user to comply with the 



## How to use

1. Get a APRS.fi API key and secret from [here](https://aprs.fi/account/)
2. Insert the Aprs node into the workspace
3. Open the nodes properties and click the "new aprsfi-credentials" button
4. Enter API key and save
5. Select the new credentials from the drop down list
6. Either Fill the remaining details OR ensure the incoming msg object includes the msg.what and msg.call

## Input Message
msg.what must be a string containing the type of request, the options are 'loc', 'msg', or 'wx'
msg.call should be 1 or more comma sepperated call signs/ station id's i.e "vk2bha,vk2bha-1,vk2jma-9"
## Output Message

msg.payload will be discarded and replaced with the passed JSON string reply from aprs.fi
## example location data
{ command: 'get',
  result: 'ok',
  what: 'loc',
  found: 1,
  entries:
   [ { class: 'a',
       name: 'VK2JMA-9',
       type: 'l',
       time: '1518516135',
       lasttime: '1518516135',
       lat: '-31.04267',
       lng: '150.93200',
       speed: 5.0914054431091,
       symbol: '/>',
       srccall: 'VK2JMA-9',
       dstcall: 'APOT21',
       comment: '13.3V 22C G\'Day',
       status: '13.7V 14C G\'Day',
       status_lasttime: '1508647975',
       path: 'WIDE1-1,WIDE2-2,qAR,VK2YGV-5' } ] }




