const Shoe = require('../models/Shoe');

exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(shoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addShoe = async (req, res) => {
  const shoe = new Shoe(req.body);
  try {
    const newShoe = await shoe.save();
    res.status(201).json(newShoe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateShoe = async (req, res) => {
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(updatedShoe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteShoe = async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);
    if (!deletedShoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json({ message: 'Shoe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
