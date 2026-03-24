const express = require("express");
const router = express.Router();
const candidateModel = require("../models/candidatemodel");
const { jwtauth } = require("../midlleware/jwt");
// const usermodel = require("../models/usermodel");

//  FIXED: correct import name
const User = require("../models/usermodel");


// FIXED: correct model usage
const checkRole = async (userid) => {
  try {
    const user = await User.findById(userid);
    return user && user.role === "admin";
  } catch (err) {
    return false;
  }
};


//  make a candidate
router.post("/", jwtauth, async (req, res) => {
  try {
    if (!(await checkRole(req.user.id))) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    const data = req.body;

    const newCandidate = new candidateModel(data);
    const savedCandidate = await newCandidate.save();

    res.status(201).json({
      message: "Candidate registered successfully",
      user: savedCandidate,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update candidTE

router.put("/:id", jwtauth, async (req, res) => {
  try {
    if (!(await checkRole(req.user.id))) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    const candidateId = req.params.id;
    const updateData = req.body;

    const updatedCandidate = await candidateModel.findByIdAndUpdate(
      candidateId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  DELEETE CAND

router.delete("/:id", jwtauth, async (req, res) => {
  try {
    if (!(await checkRole(req.user.id))) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    const candidateId = req.params.id;

    const deletedCandidate = await candidateModel.findByIdAndDelete(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
      data: deletedCandidate,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//vote
router.post("/vote/:id", jwtauth, async (req, res) => {
  try {

    console.log("Decoded user:", req.user);
    console.log("User ID used:", req.user?.id);

    const userId = req.user.id; 
    const candidateId = req.params.id;

    // Fetch the logged-in user
    const user = await User.findById(userId); // ✅ use 'User', not 'usermodel'
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from voting
    if (user.role === "admin") return res.status(403).json({ message: "Admins cannot vote" });

    // Prevent multiple voting
    if (user.isvoted) return res.status(400).json({ message: "You have already voted" });

    // Fetch the candidate
    const candidate = await candidateModel.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // Register the vote
    candidate.votes.push({ user: userId }); 
    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save();

    // Mark user as voted
    user.isvoted = true;
    await user.save();

    res.status(200).json({ message: "Vote recorded successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//vote count

router.get("/vote/count", async (req, res) => {
  try {
    // Fetch all candidates with name and voteCount
    const candidates = await candidateModel
      .find({}, "name voteCount")
      .sort({ voteCount: -1 });

    // Map to simplified response
    const record = candidates.map((data) => ({
      party: data.name,
      count: data.voteCount
    }));

    res.status(200).json({
      message: "Vote counts fetched successfully",
      data: record
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


//ALL CANDIDATE

router.get("/cadidates", async (req, res) => {
  try {
    const candidates = await candidateModel
      .find({})
      .sort({ voteCount: -1 });

    res.status(200).json({
      message: "All candidates fetched successfully",
      data: candidates
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;