const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
var http = require('http');
const mongoose = require("mongoose");
const {v4: uuidv4} = require('uuid');

const {Server} = require("socket.io");
var {Subscriber} = require("./rabbitmq/subscriber");

var {Subscriber} = require("./rabbitmq/subscriber");

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
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {test: 'hello'});
});

const handleDemande = (data) => {
  let components = []
  let totalPrice = 0
  if (Math.floor(data.max_budget / data.rooms) < 766) {
    for (let i = 0; i < data.rooms; i++) {
      components = components.concat({hardware: One_Room_low, quantity: Math.floor(Math.random() * 10)})
      totalPrice = totalPrice + 620
    }
  } else if (Math.floor(data.max_budget / data.rooms) < 1502) {
    if (data.surface > 200) {
      for (let i = 0; i < data.rooms; i++) {
        One_Room_low.forEach((room) => {
          components = components.concat({hardware: room, quantity: Math.floor(Math.random() * 10)})
        })
        totalPrice = totalPrice + 620
      }
    } else {
      for (let i = 0; i < data.rooms; i++) {
        One_Room_mid.forEach((room) => {
          components = components.concat({hardware: room, quantity: Math.floor(Math.random() * 10)})
        })
        totalPrice = totalPrice + 766
      }
    }
  } else if (Math.floor(data.max_budget / data.rooms) > 1502) {
    if (data.surface > 300) {
      for (let i = 0; i < data.rooms; i++) {
        One_Room_hig.forEach((room) => {
          components = components.concat({hardware: room, quantity: Math.floor(Math.random() * 10)})
        })
        totalPrice = totalPrice + 1502
      }
    } else if (data.surface > 200) {
      for (let i = 0; i < data.rooms; i++) {
        One_Room_low.forEach((room) => {
          components = components.concat({hardware: room, quantity: Math.floor(Math.random() * 10)})
        })
        totalPrice = totalPrice + 620
      }
    } else {
      for (let i = 0; i < data.rooms; i++) {
        One_Room_mid.forEach((room) => {
          components = components.concat({hardware: room, quantity: Math.floor(Math.random() * 10)})
        })
        totalPrice = totalPrice + 766
      }
    }
  }
  return {
    components,
    totalPrice
  }
}

const Order = require("./models/Order")

app.post("/demand", async (req, res) => {
  let data = req.body

  if (data) {
    const {components, totalPrice} = handleDemande(data);
    const order = new Order({
      orderId: uuidv4(),
      dateOfRequest: Date(),
      status: 0,
      totalPrice: totalPrice,
      components: components,
      softwareVersion: "V1.0"
    });
    try {
      await order.save();
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  } else
    res.json({message: " No data provided "})

})

app.set('port', 3002)

var server = http.createServer(app);

server.listen(3002)

const io = new Server(server, {cors: {origin: "*"}});


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
  const {hardware, totalPrice} = handleDemande(newMessage);
  io.emit('data', {
    demandId: 2,
    userId: newMessage.userId,
    houseData: hardware,
    totalBudget: totalPrice
  })

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

// DB Connection
const username = "user1";
const password = "NFDjRWqVwLWlvwoy";
const cluster = "cluster0.1xb4gu3";
const dbname = "";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log("Not Connecteddd \n\n\n")
      console.log(err)
    } else
      console.log('Connected to MongoDB!!!')
  }
);
