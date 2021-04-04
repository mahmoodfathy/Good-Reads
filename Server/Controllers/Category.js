const Category = require("../Models/Categories");

exports.addCategory = async (req, res, next) => {
  const { category } = req.body;

  if (!category) {
    return res
      .status(400)
      .json({ message: "No Category added,Please Try agaian" });
  }
  try {
    const newCategory = new Category({
      category,
    });
    await newCategory.save();
    return res.status(200).json({ message: "Category Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateCategroy = async (req, res, next) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({ message: "Category doesn't exist !" });
  }

  try {
    await category.updateOne({ category: categoryName });
    return res.status(200).json({ message: "Category Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCategroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Category Deleted Successfully !" });
  } catch (err) {
    return res
      .status(400)
      .josn({ message: "An Error ouccred during deletion!" });
  }
};
