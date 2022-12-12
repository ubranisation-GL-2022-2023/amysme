const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
var http = require('http');

const { Server } = require("socket.io");
var { Subscriber } = require("./rabbitmq/subscriber");

var { Subscriber } = require("./rabbitmq/subscriber");

 //   766$
const One_Room_mid = [
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 2,
    name: "smartDisplay",
    price: "248",
  },
  {
    id: 3,
    name: "smartThermostat",
    price: "78",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
]

// 1 502$
const One_Room_hig = [
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 2,
    name: "smartDisplay",
    price: "248",
  },
  {
    id: 3,
    name: "smartThermostat",
    price: "78",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
]

// 620$
const One_Room_low = [
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 0,
    name: "smart Bulb",
    price: "48",
  },
  {
    id: 1,
    name: "smartSpeaker",
    price: "148",
  },
  {
    id: 2,
    name: "smartDisplay",
    price: "248",
  },
  {
    id: 3,
    name: "smartThermostat",
    price: "78",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
  {
    id: 4,
    name: "sensor",
    price: "25",
  },
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {test: 'hello'});
});

const handleDemande = (data) => {
  let hardware = []
  let totalPrice = 0
  if(Math.floor(data.max_budget / data.rooms) < 766) {
    for(let i = 0; i < data.rooms; i++) {
      hardware = hardware.concat(One_Room_low)
      totalPrice = totalPrice + 620
    }
  } else if(Math.floor(data.max_budget / data.rooms) < 1502 ) {
    if(data.surface > 200) {
      for(let i = 0; i < data.rooms; i++) {
        hardware = hardware.concat(One_Room_low)
        totalPrice = totalPrice + 620
      }
    } else {
      for(let i = 0; i < data.rooms; i++) {
        hardware = hardware.concat(One_Room_mid)
        totalPrice = totalPrice + 766
      }
    } 
  } else if(Math.floor(data.max_budget / data.rooms) > 1502 ) {
    if(data.surface > 300){
      for(let i = 0; i < data.rooms; i++) {
        hardware = hardware.concat(One_Room_hig)
        totalPrice = totalPrice + 1502
      }
    } else if(data.surface > 200) {
      for(let i = 0; i < data.rooms; i++) {
        hardware = hardware.concat(One_Room_low)
        totalPrice = totalPrice + 620
      }
    } else {
      for(let i = 0; i < data.rooms; i++) {
        hardware = hardware.concat(One_Room_mid)
        totalPrice = totalPrice + 766
      }
    } 
  } 
  return {
    hardware,
    totalPrice
  }
}

app.post("/demand", (req, res) => {
  let data  = req.body

  if(data) {
    const {hardware, totalPrice} = handleDemande(data);
    res.json({
      demandId: 1,
      userId: data.userId,
      houseData: hardware,
      totalBudget: totalPrice
    });
  
  } else
  res.json({message:" No data provided "})

})

app.set('port',3002)

var server = http.createServer(app);

server.listen(3002)

const io = new Server(server,{cors:{origin:"*"}});


var subscriberOptions = {
    exchange: "Documents_Exchange",
    queueName: "generated_data_queue",
    routingKeys: ["generated_data"],
  };

function onIncomingMessage(message) {
    // console.log("message", message);
    const newMessage = JSON.parse(message.content.toString())
    subscriber.ack(message)
    console.log(newMessage);
    if(newMessage.type === "csv" || newMessage.type === "pdf" || newMessage.type === "excel" || newMessage.type === "yaml" ) {
      console.log(newMessage.content);
    }
    else {
      const {hardware, totalPrice} = handleDemande(newMessage.content);
      io.emit('data',{
        demandId: 2,
        userId: newMessage.userId,
        houseData: hardware,
        totalBudget: totalPrice
      })
    }


}

io.on('connection', (socket) => {
  let previousId;

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };
});

var subscriber = new Subscriber(subscriberOptions);
subscriber.start(onIncomingMessage);
