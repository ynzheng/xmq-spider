const sp = require("superagent");
const schedule = require('node-schedule')
const Message = require("./models/message");

const ytid = '518455544414'
const zcid = '481222581158'
const bzid = '281285214811'
const bsid = '158185288822'

const {
  pushMessage
} = require("./controller/message");
const rule = new schedule.RecurrenceRule()
// rule.minute = [1, 3, 6, 7, 9, 12, 13, 15, 18, 19, 21, 24, 25, 27, 30, 31, 33, 36, 37, 39, 42, 43, 45, 48, 49, 51, 54, 55, 57]
let arr = []
for (let i = 0; i < 60; i++) {
  arr.push(i)
}
rule.minute = arr
var j = schedule.scheduleJob(rule, function () {
  main()
})

function clearData(str) {
  return str.replace(/<e.*\/>/g, '')
}

function getMessage(id) {
  let api = `https://wapi.xiaomiquan.com/v1.6/groups/${id}/topics/limit`
  sp.get(api).set("Accept", "application/json").end(function (err, res) {
    if (err || !res.ok) {
      console.log("oh! shit");
    } else {
      const body = res.body;
      const resp_data = body.resp_data;
      const topics = resp_data.topics;
      if (topics[0].type == 'talk') {
        topics[0].talk.text = clearData(topics[0].talk.text)
      } else if (topics[0].type == 'q&a') {
          topics[0].question.text = clearData(topics[0].question.text)
      }
      let item = {
        id: topics[0].topic_id,
        gid: id,
        date: topics[0].create_time.split('.')[0],
        uid: topics[0].type == 'talk' ? topics[0].talk.owner.user_id : topics[0].question.owner.user_id,
        type: topics[0].type,
        data: topics[0]
      };
      pushMessage(item);
    }
  });
}

let main = async () => {
  await getMessage(ytid);
  await getMessage(zcid);
  await getMessage(bzid);
  await getMessage(bsid);
}

// main()