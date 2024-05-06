const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: Product
    });
    res.status(200).json(tags)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  try {
    const tag = await Tag.findOne({
      where: {
        id: tagId
      },
      include: Product
    });
    if (tag) {
      res.status(200).json(tag)
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      id: req.params.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (tag) {
      res.status(200).json(tag)
    } else {
      res.status(404).json({ message: 'No tag with this id!' })
    };
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destory({
      where: {
        id: req.params.id
      },
    });
    if (tag) {
      res.status(200).json(tag)
    } else {
      res.status(404).json({ message: 'No tag found with this id! '})
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
