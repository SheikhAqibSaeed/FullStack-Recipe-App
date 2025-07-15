// import express from 'express';
// import dotenv from "dotenv";
// import db from "./config/db.js"
// import { favoritesTable } from "./db/schema.js";
// import { and, eq } from "drizzle-orm";
// dotenv.config();

// const app  = express();
// app.use(express.json());
// const PORT = process.env.PORT || 5000;

// app.get("/api/health", (req, res)=>{
//     res.status(200).json({success:true})
// })


// app.post("/api/favorites", async (req, res) => {
//     // console.log("Test body:", req.body);
//     // res.json({ received: req.body });
//     try {
//       const { userId, recipeId, title, image, cookTime, servings } = req.body;
  
//       if (!userId || !recipeId || !title) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }
  
//       const newFavorite = await db
//         .insert(favoritesTable)
//         .values({
//           userId,
//           recipeId,
//           title,
//           image,
//           cookTime,
//           servings,
//         })
//         .returning();
//         res.status(201).json(newFavorite[0]);
//     } catch (error) {
//       console.log("Error adding favorite", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   });

//   app.get("/api/favorites/:userId", async (req, res) => {
//     try {
//       const { userId } = req.params;
  
//       const userFavorites = await db
//         .select()
//         .from(favoritesTable)
//         .where(eq(favoritesTable.userId, userId));
  
//       res.status(200).json(userFavorites);
//     } catch (error) {
//       console.log("Error fetching the favorites", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   });

//   app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
//     try {
//       const { userId, recipeId } = req.params;
  
//       await db
//         .delete(favoritesTable)
//         .where(
//           and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
//         );
  
//       res.status(200).json({ message: "Favorite removed successfully" });
//     } catch (error) {
//       console.log("Error removing a favorite", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   });
  
// app.listen(PORT, ()=>{
// console.log("Server is running on this Port:", PORT);

// })

// app.get('/', (req, res) => {
//   res.send('Hello! Welcome to Fork & Find');
// });

import express from 'express';
import dotenv from "dotenv";
import db from "./config/db.js"
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";
dotenv.config();

const app  = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
// if (ENV.NODE_ENV === "production") job.start();
if(process.env.NODE_ENV === "production") job.start();

app.use(express.json()); // Middleware to parse JSON request bodies

// app.use((req, res, next) => {
//     console.log("Request received:", req.method);
//     next(); // Call the next middleware or route handler
// }
// );


app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok"});
});
app.get('/', (req, res) => {
    res.send('Hello, World!111111111111');
});
// connectDB = process.env.DATABASE_URL;    

app.post("/api/favorites", async (req, res) => {
    // console.log("Test body:", req.body);
    // res.json({ received: req.body });
    try {
      const { userId, recipeId, title, image, cookTime, servings } = req.body;
  
      if (!userId || !recipeId || !title) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newFavorite = await db
        .insert(favoritesTable)
        .values({
          userId,
          recipeId,
          title,
          image,
          cookTime,
          servings,
        })
        .returning();
        res.status(201).json(newFavorite[0]);
    } catch (error) {
      console.log("Error adding favorite", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userFavorites = await db
        .select()
        .from(favoritesTable)
        .where(eq(favoritesTable.userId, userId));
  
      res.status(200).json(userFavorites);
    } catch (error) {
      console.log("Error fetching the favorites", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
      const { userId, recipeId } = req.params;
  
      await db
        .delete(favoritesTable)
        .where(
          and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
        );
  
      res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.log("Error removing a favorite", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, ()=>{
console.log("Server is running on this Port:", PORT);

})