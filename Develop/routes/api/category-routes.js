const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product
    });
    res.status(200).json(categories)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;
  try {
    const category = await Category.findOne({
      where: {
        id: categoryId
      },
      include: Product
    });
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
try {
  const category = await Category.create({
    id: req.params.id,
    category_name: req.body.category_name
  });
  res.status(200).json(category)
} catch (err) {
  res.status(500).json(err)
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'No category with this id!' })
    };
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destory({
      where: {
        id: req.params.id
      },
    });
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'No category found with this id! '})
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
