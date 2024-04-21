const express = require('express')
const cors = require('cors')
require('./db/config')
const users=require('./db/user')
const Car = require('./db/car')
const mybookings = require('./db/Mybookings')
const multer = require('multer');



// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage }); 


const app = express();

app.use(express.json())
app.use(cors(
  {
      origin: ["http://localhost:3001"],
      methods: ["POST", "GET", "DELETE", "PUT"],
      credentials: true
  }
))

app.use('/uploads', express.static('uploads'));


//  login api
app.post('/login', (req, resp) => {  
  const { email, password } = req.body;   
  users.findOne({ email: email })
      .then(user => {
          if (user) {
              if (user.password === password) {
                  return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })
              } else {
                  resp.json("login fail")
              }
          } else {
              resp.json("no user")
          }
      })
})

// Register Api
app.post('/register', (req, resp) => {
  const { name, email, password } = req.body;
  users.findOne({ email: email })
      .then(use => {
          if (use) {
              resp.json("Already have an account")
          } else {
              users.create({ email: email, name: name, password: password })
                  .then(result => resp.json("  Account Created"))
                  .catch(err => resp.json(err))
          }
      }).catch(err => resp.json("failed "))
})
//users//
app.get('/getusers', async (req, res) => {
  try {
    // Fetch all car insurance records from the database
    const bike = await users.find();
    res.status(200).json(bike);
  } catch (error) {
    console.error('Error fetching car insurance data: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/getuser/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const event = await users.findById({_id: id });
      res.json(event);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put('/useredit/:id', (req, res) => {
  const id = req.params.id;
  users.findByIdAndUpdate({ _id: id }, {
      name: req.body.name,
     email: req.body.email,
      
  })
      .then(users => res.json(users))
      .catch(err => res.json(err))
})

app.delete('/userdelete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await users.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//car //
// app.post('/cars', async (req, res) => {
//   const { carname,cartype,carno } = req.body;

//   try {
//     const car = new Car({ carname,cartype,carno});
//     await car.save();
//     res.status(201).json(car);
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to create policy' });
//   }
// });
app.post('/cars', upload.single('carImage'), async (req, res) => {
  const { drivername,carname, cartype, carno,price } = req.body;
  const carImage = req.file.path; // The path to the uploaded image

  try {
    const car = new Car({ drivername,carname, cartype, carno, carImage,price });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create car' });
  }
});

app.get('/cars', async (req, res) => {
  try {
    const images = await Car.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/car/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const event = await Car.find({_id: id });
      res.json(event);
  } catch (err) {
      res.status(500).json({ error: "err"});
  }
});

app.get('/acar/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const event = await Car.findById({_id: id });
      res.json(event);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.put('/acaredit/:id', (req, res) => {
  const id = req.params.id;
  Car.findByIdAndUpdate({ _id: id }, {
      drivername: req.body.drivernamename,
       carname: req.body.carname,   
       cartype:req.body.cartype ,
        carno: req.body.carno,
        price:req.body.price                           
      
  })
      .then(users => res.json(users))
      .catch(err => res.json(err))
})

app.delete('/cardelete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Car.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {  
    res.status(500).json({ error: 'Internal server error' });
  }
});

                                 // Bookings //
app.post('/rides', async (req, res) => {
  const {  selectedPickupState, selectedPickupCity, selectedDropState, selectedDropCity, pickupdate, pickuptime,dropdate,droptime,bookeddate,userId,userName,drivername,fare,carname, cartype, carno,price } = req.body;
  try {
    const book = new mybookings({ selectedPickupState, selectedPickupCity, selectedDropState, selectedDropCity,pickupdate, pickuptime,dropdate,droptime,bookeddate,userId,userName,drivername,fare,carname, cartype, carno,price });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create car' });
  }
});
// Admin //
app.get('/getrides', async (req, res) => {
  try {
    const rides = await mybookings.find();   
    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');   
  }
});

app.delete('/usercardelete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await mybookings.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// for users    //
app.get('/getrides/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await mybookings.find({userId}).sort('position');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


app.listen(8000, () => {
  console.log("listening at 8000")
})