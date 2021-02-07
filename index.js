// import packages
// const => 不可變動的變數宣告
// express => 變數名稱
// require => nodejs用來import套件的function
// javascript 使用function都要()
// 引號代表內容物是字串
// 沒有引號的話就是變數
const express = require('express'); // webserver
const line = require('@line/bot-sdk'); //line bot

// The required data to send message to line
// {} => 物件
// 變數的型態(數字) const a = 1 
// 變數的型態(字串) const a = '1'
// 變數的型態(布林) const a = true
// 變數的型態(物件) const a = { 屬性: 值 }
// const phone = {
//   phonenumber: '0987654321',
//   volumn: '64GB'
// }
// 變數的型態(陣列) const a = []
// 變數的型態(function) const a = function(x){ do something depends on x. }

const config = {
  channelAccessToken: '3b5Adf8NYirx8Wv7JMjOd4peLBOT6Hq0VvhZm43SugHaywCrO4LZs7WxHlX2cItDnR47Vanfl0uOcAY0ny2xHq8VH3WM7T4XELF14Jgksd9ufUZC1g+IaOHH1n+iMOr4FsZa56A6dGcuWfW1lA5PmwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '924acf12d4dacee4e3fb90cb61072d54'
};

const client = new line.Client(config);
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

app.get('/tagall', async (req, res) => {
  const sampleMessage = {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "title": "兜幾",
      "text": "我全都要",
      "actions": [
        {
          "type": "message",
          "label": "puipui",
          "text": "Discount Service"
        },
        {
          "type": "message",
          "label": "南方四賤客",
          "text": "Mileage Service"
        }
      ]
    }
  }
  const mids = await client.getGroupMemberIds('c067913d25a8656232b2d6428455a8c21')
  console.log(mids);
  // client.pushMessage('c067913d25a8656232b2d6428455a8c21', sampleMessage).catch(err => console.error(err))
  res.send('ok')
})


function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Shut the fxxk up.'
  });
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('application start at', port);
});