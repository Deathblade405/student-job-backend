const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs (with optional status filter)
router.get('/', async (req, res) => {
  const { status } = req.query;
  const jobs = await Job.find(status ? { status } : {}).sort({ date: -1 });
  res.json(jobs);
});

// POST new job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  const saved = await job.save();
  res.json(saved);
});

// PUT update job status
router.put('/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE job
router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
