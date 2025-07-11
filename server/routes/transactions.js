const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const verifyToken = require("../middleware/verifyToken");

// POST NEW TRANSACTION
router.post("/", verifyToken, async (req, res) => {
  const { subcategory, amount, date, description, recurring } = req.body;

  try {
    const newTransaction = new Transaction({
      user: req.userId,
      subcategory,
      amount,
      date,
      description,
      recurring,
    });

    const saved = await newTransaction.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//GET ALL USER TRANSACTIONS
router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate("subcategory")
      .sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE TRANSACTION
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//DELETE TRANSACTION
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ err: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully!" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//DELETE ALL SUBCATEGORIES OF A SUBCOMPONENT

module.exports = router;
