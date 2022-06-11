// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: 'product_id',
  as: 'tagIds',
});

// Tags belongToMany Products (through ProductTag)
TimeRanges.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: 'tag_id',
  as: 'taggedProducts',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
