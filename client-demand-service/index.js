const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");


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

app.post("/demande", (req, res) => {
  let data  = req.body
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

  res.render("index", {
    demandId: 1,
    userId: data.userId,
    houseData: hardware,
    totalBudget: totalPrice
  });
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});