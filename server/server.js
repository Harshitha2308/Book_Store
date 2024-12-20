import express from "express";
import mongoose from "mongoose";
import cors from "cors";             
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { type } from "os";
import { error } from "console";

const app = express();
const port = 4000;
const mongoUrl = "mongodb+srv://saiharshitha:Harshi2308!@cluster0.n01aeu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const secretKey = "yourSecretKey";
mongoose.connect(mongoUrl);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/imges')
        },
    filename: (req, file, cb) => {
      cb(null, file.filename + "_" + Date.now()+path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    cart: [bookSchema],  // Array to store books added to the cart
    toRead: [bookSchema] // Array to store books added to the "want to read" list
});


const Book = mongoose.model("Book", bookSchema);
const User = mongoose.model("User", userSchema);

const seedDatabase = async () => {
    try {
        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 220, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 1115, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
        ];
        await Book.deleteMany({ title: { $in: books.map(book => book.title) } });

        await Book.insertMany(books);
        console.log("database connected");
    } catch (error) {
        console.error('error', error);
    }
};
seedDatabase();

app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    credentials: true
}));
app.use(express.json()); 
app.use(cookieParser()); // Add this line to parse cookies
app.use(express.static('uploads'));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

app.get("/api/books", async (req, res) => {
    try {
        // Fetch all books
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "internal server error"
        });
    }
});
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post("/api/newbooks", authenticateToken,upload.single("image"),async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body;
        const newBook = new Book({ title, author, genre, description,  price,image: req.file ? `/uploads/${req.file.filename}` : '' });
        await newBook.save();
        res.status(201).json({ message: "user added books successfully" });
    } catch (error) {
        console.error("error", error)
        res.status(500).json({ error: "error in inserting books" });
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password, phone ,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, phone ,role});
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "invalid username" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "invalid password" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "login successful",userId:user._id, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error in logging" });
    }
});

app.put("/api/add-to-read",authenticateToken,async(req,res)=>{
    const {userId}=req.params
    const {book}=req.body
    try{
        const user= await User.findById(userId)

        if(!user){
            return res.status(401).json({error:"user not found"})

        }
        user.toRead.push(book)

        await user.save();
        res.status(200).json({message:"updates sucess"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Error updating want to read list" });
    }
})


app.put("/api/add-to-cart/:userId",authenticateToken,async(req,res)=>{
    const userId=req.params.userId
    const {book}=req.body
    console.log(book)
    if (!book) {
        return res.status(400).json({ error: "Book data is required" });
    }
    try{
        const user= await User.findById(userId)

        if(!user){
            return res.status(401).json({error:"user not found"})

        }
        user.cart.push(book)

        await user.save();
        res.status(200).json({message:"updates sucess"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Error updating list" });
    }
})

app.delete("/api/remove-cart/:userId", authenticateToken, async (req, res) => {
    const { userId } = req.params;
    const { index } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Check if index is valid
        if (index >= 0 && index < user.cart.length) {
            user.cart.splice(index, 1);  // Remove the item from the cart array
            await user.save();  // Save the updated user document

            res.status(200).json({ message: "Item deleted successfully" });
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error in deleting", error);
        res.status(500).json({ error: "Error deleting item from cart" });
    }
});

app.get("/api/to-read/:userId", authenticateToken, async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        res.status(200).json({ toRead: user.toRead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching 'To Read' list" });
    }
});


app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});
