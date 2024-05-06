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
  } catch (err) {
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

// router.post('/', (req, res) => {
//   // create a new tag
//   Tag.create(req.body)
//     .then((tag) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((product_id) => {
//           return {
//             tag_id: tag.id,
//             product_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(tag);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

router.post('/', (req, res) => {   // create a new tag   
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model       
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr).then((productTagIds) => res.status(200).json(productTagIds));
      }
      // if no product tags, just respond       
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
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
      res.status(404).json({ message: 'No tag found with this id! ' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
