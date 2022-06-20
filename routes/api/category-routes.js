const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
        include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
        include: [{ model: Product, as: 'products' }],
    });

    if (!categoryDataById) {
        res.status(404).json({ message: 'No category found with that id.' })
        return;
    }

    res.status(200).json(categoryDataById);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);

    res.status(201).json(newCategoryData);
} catch (err) {
    res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update({
        category_name: req.body.category_name,
    }, {
        where: {
            id: req.params.id
        },
    });
    if (!updatedCategory) {
        res.status(404).json({ message: "No category found with that id!" });
        return;
    }
    res.status(200).json(updatedCategory);
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!deleteCategory) {
        res.status(404).json({ message: "No category found with that id!" });
        return;
    }

    res.status(200).json(deleteCategory);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
