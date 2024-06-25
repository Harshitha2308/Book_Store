import express from "express";
import mongoose from "mongoose";;
import cors from "cors";

const app=express();
const port=4000;
const mongoUrl="mongodb+srv://saiharshitha:Harshi2308!@cluster0.n01aeu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl);
const bookSchema= new mongoose.Schema({
    title:String,
    author:String,
    gener:String,
    description:String,
    price:Number,
    image:String
});

const Book = mongoose.model("Book",bookSchema);

const seedDatabase = async () => {
    try {
        
        await Book.deleteMany();
        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 220, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 1115, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
           
          ];
        
        await Book.insertMany(books);
        console.log("database connectes");
    }catch(error){
        console.error('error',error);
    }
};
seedDatabase();
app.use(cors())

app.get("/api/books",async (req,res)=>{
    try{
        //fetch all books
        const allBooks=await Book.find()
        res.json(allBooks);
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:"internal server error"
        });
    }
});

app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})