dotenv.config({ path: './../../.env' })
2nd user details:
{
    "email": "test12@gmail.com",
    "password": "test",
    "user_name": "Test",
    "phone_number": "080999",
    "country": "Turkey"

}

{
    "email": "doe1@gmail.com",
    "password": "test12",
    "user_name": "Test",
    "phone_number": "08165328999",
    "country": "Hawaii"

}


 public async login(email: string): Promise<User> {
      const [user] = await knex('users').select('*').where({ email });
      return user;
    }



    in repository:
    async login(email: string, password: string): Promise<IUser | undefined> {
      const user: any = await User.query().where('email', email);
        const checkPassword = await new Encrypt().compare(
            password,
            user.password
        );

        
        if (!checkPassword) {
            return undefined;
        }
        return user;
    }

    in service
    
    async login(email: string, password: string): Promise<string> {
        const user = await this.authRepository.login(email, password);
        if (!user) {
          throw new BadRequestError('Invalid email or password');
        }
        const checkPassword = await this.encrypt.compare(password, user.password);
        if (!checkPassword) {
          throw new Error('Incorrect password');
        }
        const token = await this.encrypt.generateAccessToken([user]);
        return token;
      }

      in controller
       public async logUser(req: Request, res: Response){
        try {
          const { email, password } = req.body;
          const token = await this.authService.login(email, password);
          res.setHeader('Set-Cookie', token);
          res.cookie('token', token, {
            expires: new Date(Date.now() + 2000),
          });
          return res.status(StatusCodes.ACCEPTED).json({
            message: 'Login Successful',
          });
        } catch (error) {
           return res.status(StatusCodes.BAD_REQUEST).json({message: 'Wrong login credentials', error});
          logger.error(error)
      }

IN the repository

       // async login(email: string, password: string): Promise<User | undefined> {
    //   const user: any = await User.query().where('email', email);
    //     const checkPassword = await new Encrypt().compare(
    //         password,
    //         user.password
    //     );

        
    //     if (!checkPassword) {
    //         return undefined;
    //     }
    //     return user;
    // }


    <!-- Create User -->
    async register(payload : RegisterI): Promise<IUser> {

    const userExist= await this.authRepository.findByEmail(payload.email)
    if (userExist && !userExist.deleted){
        throw new BadRequestError('Email already in use')
    }
    if (userExist && userExist.deleted){
      await this.authRepository.userExits(existingUser.id);
    }

    const verificationToken = 'Fake token';
    const hashedPassword = await this.encrypt.bcrypt(payload.password)
        const user = await this.authRepository.create({
            email: payload.email,
            password : hashedPassword,
            user_name : payload.user_name, 
            phone_number : payload.phone_number,
            country : payload.country,
            verificationToken : verificationToken,
            deleted : false
        })
        return user;
    }

    <!--  public async register(payload: RegisterI): Promise<IUser> {
    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser && !existingUser.deleted) {
      throw new BadRequestError('Email already in use');
    }
    if (existingUser && existingUser.deleted) {
      await this.authRepository.userExits(existingUser.id);
    }
    const verificationToken = 'Fake token';
    const hashedPassword = await this.encrypt.bcrypt(payload.password);
    const user = await this.authRepository.create({
      email: payload.email,
      password: hashedPassword,
      user_name: payload.user_name,
      phone_number: payload.phone_number,
      country: payload.country,
      verificationToken: verificationToken,
    });
    return user;
  } -->


// host: '127.0.0.1',
// user: `postgres`,
// password: 'postoat4',
// database: `gift_card`,


<!-- 
async login(email: string, password: string): Promise<string> {
  try {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }
    const checkPassword = await this.encrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new BadRequestError(`Incorrect ${user.password} password`);
    }
    if(!user.isVerified){
      throw new UnAuthenticatedError('Please verify your email')
    }
    const token = await this.encrypt.generateAccessToken([user]);
    return token;
  } catch (error) {
    if (error instanceof BadRequestError) {
      return 'Invalid email or password'; // return a string instead of throwing the error
    } else if (error instanceof UnAuthenticatedError) {
      return 'Please verify your email'; // return a string instead of throwing the error
    } else {
      logger.error(error);
      return 'An unexpected error occurred'; // return a string instead of throwing the error
    }
  }
}
 -->

 <!-- For Ternary operators
 
 // (user.isVerified = true), (user.isVerified =Date.now())
  -->




  <!-- WEBVITALS -->
  import express, { Request, Response } from 'express';
import { NextWebVitalsMetric } from 'next/dist/next-server/lib/utils';

// Import and configure Mongoose for MongoDB
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/webVitalsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schema for the web vitals data
const webVitalsSchema = new mongoose.Schema({
  id: String,
  type: String,
  value: Number,
  url: String,
  startTime: Number,
  endTime: Number,
  ipAddress: String,
  userAccount: String,
});

// Create Mongoose model for the web vitals data
const WebVitals = mongoose.model('WebVitals', webVitalsSchema);

// Create Express app
const app = express();
app.use(express.json());

// Endpoint for recording Next.js server request data
app.post('/api/vitals/request', async (req: Request, res: Response) => {
  try {
    // Extract data from request body
    const { id, type, startTime, url } = req.body;

    // Create new web vitals document
    const webVitals = new WebVitals({
      id,
      type,
      startTime,
      url,
    });

    // Save web vitals data to MongoDB
    await webVitals.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for recording client page load data
app.post('/api/vitals/load', async (req: Request, res: Response) => {
  try {
    // Extract data from request body
    const { id, type, endTime, ipAddress, userAccount } = req.body;

    // Update web vitals document with end time, IP address, and user account
    const webVitals = await WebVitals.findOneAndUpdate(
      { id, type },
      { endTime, ipAddress, userAccount },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Express server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

Sure! Here's an example of how you can test the /api/vitals/request and /api/vitals/load endpoints using Postman:

Request for recording the request time:
Set the HTTP method to POST.
Set the URL to http://localhost:3000/api/vitals/request (assuming your server is running on localhost and port 3000).
In the request body, provide the required data in JSON format, for example:
json
Copy code
{
  "id": "1234567890123",
  "type": "TTFB",
  "startTime": "2023-04-14T10:30:00Z",
  "url": "https://example.com/page"
}
Click on the "Send" button to send the request to the server.
Request for recording the load time:
Set the HTTP method to POST.
Set the URL to http://localhost:3000/api/vitals/load (assuming your server is running on localhost and port 3000).
In the request body, provide the required data in JSON format, for example:
json
Copy code
{
  "id": "1234567890123",
  "type": "FCP",
  "endTime": "2023-04-14T10:45:00Z",
  "url": "https://example.com/page"
}
Click on the "Send" button to send the request to the server.
Note: Make sure to update the request body data with appropriate values based on your actual use case and server implementation. Also, ensure that the URL in Postman matches the actual URL of your running Node.js server.



import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';

// Define a Mongoose schema for the page load data
interface IPageLoad extends Document {
  ipAddress: string;
  userAccount?: string;
  url: string;
  startTime: Date;
  endTime?: Date;
}

const pageLoadSchema = new mongoose.Schema<IPageLoad>({
  ipAddress: { type: String, required: true },
  userAccount: { type: String },
  url: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

// Create a Mongoose model for the page load data
const PageLoad = mongoose.model<IPageLoad>('PageLoad', pageLoadSchema);

// Create an Express app
const app = express();

// Endpoint to record the request time and URL of the requested page
app.post('/api/page-load/start', async (req: Request, res: Response) => {
  try {
    const { ipAddress, userAccount, url, startTime } = req.body;

    // Create a new PageLoad document with the provided data
    const pageLoad = new PageLoad({
      ipAddress,
      userAccount,
      url,
      startTime: new Date(startTime),
    });

    // Save the document to the database
    await pageLoad.save();

    res.status(201).json({ message: 'Page load start time recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record page load start time' });
  }
});

// Endpoint to record the load time and update the existing document
app.post('/api/page-load/end', async (req: Request, res: Response) => {
  try {
    const { ipAddress, userAccount, endTime } = req.body;

    // Find the PageLoad document with the provided IP address and user account (if available)
    const pageLoad = await PageLoad.findOneAndUpdate(
      { ipAddress, userAccount },
      { endTime: new Date(endTime) },
      { new: true }
    );

    if (!pageLoad) {
      return res.status(404).json({ error: 'Page load data not found' });
    }

    res.json({ message: 'Page load end time recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record page load end time' });
  }
});

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/page_load_data', { useNewUrlParser: true });

// Start the Express app
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



<!-- 
EXAMPLE of how to code a webvital metrics in the backend using node js typescript  and mongodb on the bases of next js in the frontend

Sure! Here's an example of how you can record web vitals metrics in the backend using Node.js, TypeScript, and MongoDB based on Next.js in the frontend:

Frontend (Next.js):
typescript
Copy code
// Import the reportWebVitals function from Next.js
import { reportWebVitals } from 'next/dist/next-server/lib/utils';

// Call reportWebVitals with the metric object
reportWebVitals(metric => {
  // Check if the metric is TTFB (Time to First Byte) or FCP (First Contentful Paint)
  if (metric.name === 'TTFB' || metric.name === 'FCP') {
    // Send the metric object to the backend endpoint
    fetch('/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
Backend (Node.js with Express, TypeScript, and Mongoose):
typescript
Copy code
import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';

// Define a Mongoose schema for the web vitals data
interface IWebVitals extends Document {
  id: string;
  name: string;
  value: number;
}

const webVitalsSchema = new mongoose.Schema<IWebVitals>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

// Create a Mongoose model for the web vitals data
const WebVitals = mongoose.model<IWebVitals>('WebVitals', webVitalsSchema);

// Create an Express app
const app = express();

// Parse request body as JSON
app.use(express.json());

// Endpoint to record the web vitals data
app.post('/api/web-vitals', async (req: Request, res: Response) => {
  try {
    const { id, name, value } = req.body;

    // Create a new WebVitals document with the provided data
    const webVitals = new WebVitals({ id, name, value });

    // Save the document to the database
    await webVitals.save();

    res.status(201).json({ message: 'Web Vitals data recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record Web Vitals data' });
  }
});

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/web_vitals_data', { useNewUrlParser: true });

// Start the Express app
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
Please note that this is a basic example and may need to be adapted to your specific requirements, such as adding authentication, validation, error handling, and other necessary features for a production-ready application. Additionally, you would need to set up a MongoDB database and replace the connection URL in the mongoose.connect() function with your own database URL.
 -->