import express from 'express';
import models from './../db/models';
import bodyParser from 'body-parser';

const router = express.Router();

// Get All Recipes
router.get('/api/recipes', (req, res) => {
    models.Recipe.findAll()
        .then(recipesFromDB => {
            res.status(200).json({
                recipes: recipesFromDB
            });
        })
        .catch(e => console.log(e));
});


// Get Recipe by Record ID
router.get('/api/recipe/:id', (req, res) => {
    if( !isNaN(req.params.id) ) {
        models.Recipe.findByPk(req.params.id)
            .then(recipe => {
                if (recipe !== null) {
                    res.status(200).json({ recipe: recipe });
                } else {
                    res.status(404).json({ error: 'Recipe Not Found'});
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID'});
    }
});

// Create new Recipe
router.post('/api/recipe', (req, res) => {
    models.Recipe.create(req.body)
      .then(recipeNewFromDB => {
          res.status(201).json({ recipe: recipeNewFromDB });
      })
      .catch(e => console.log(e));
      
});

// Update an existing Recipe
router.put('/api/recipe/:id', (req, res) => {
  // Find recipe By ID sent to us by User in the URL
  models.Recipe.findByPk(req.params.id).then(recipe => {
    // Call the Update function on the Recipe the database sent us back.
    // Only update the fields I care about.
    recipe.update({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      body: req.body.body
    }).then(recipe => {
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
      res.status(200).json({ recipe: recipe });
    }).catch(e => console.log(e));

  }).catch(e => console.log(e));
});

// Delete existing Recipe by Record ID
router.delete('/api/recipe/:id', (req, res) => {
    models.Recipe.findByPk(req.params.id)
    .then(recipe => {
        recipe.destroy().then(() => {
            res.status(200).json({
                result: `Record ID ${req.params.id} Deleted`,
                success: true
            });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

export default router;

