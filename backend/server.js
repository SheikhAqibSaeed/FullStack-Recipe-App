// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

import express from 'express';
import dotenv from "dotenv";
import db from "./config/db.js"
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
dotenv.config();

const app  = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res)=>{
    res.status(200).json({success:true})
})
app.get('/', (req, res) => {
  res.send('Hello! Welcome to Fork & Find');
});

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