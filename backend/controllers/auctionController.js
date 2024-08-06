const AuctionItem = require("../models/AuctionItem");
const Bid = require("../models/Bid");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createAuctionItem = async (req, res) => {
	const { title, description, startingBid, endDate } = req.body;
	const userId = req.user.id;

	try {
		const auctionItem = await AuctionItem.create({
			title,
			description,
			startingBid,
			endDate,
			createdBy: userId,
		});

		res.status(201).json(auctionItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAuctionItems = async (req, res) => {
	try {
		const auctionItems = await AuctionItem.find();
		res.status(200).json(auctionItems);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAuctionItemById = async (req, res) => {
	const { id } = req.params;
	try {
		const auctionItem = await AuctionItem.findById(id);
		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}
		res.status(200).json(auctionItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAuctionItemsByUser = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const { id } = jwt.decode(token, process.env.JWT_SECRET, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: err.message });
			}
		});
		const auctionItems = await AuctionItem.find({ createdBy: id });
		res.status(200).json({
			auctionItems,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

const updateAuctionItem = async (req, res) => {
	const { id } = req.params;
	const { title, description, startingBid, endDate } = req.body;
	const userId = req.user.id;

	try {
		const auctionItem = await AuctionItem.findById(id);

		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}

		if (auctionItem.createdBy.toString() !== userId) {
			return res.status(403).json({ message: "Unauthorized action" });
		}

		auctionItem.title = title || auctionItem.title;
		auctionItem.description = description || auctionItem.description;
		auctionItem.startingBid = startingBid || auctionItem.startingBid;
		auctionItem.endDate = endDate || auctionItem.endDate;
		auctionItem.updatedAt = Date.now();

		await auctionItem.save();

		res.json(auctionItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteAuctionItem = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	try {
		const auctionItem = await AuctionItem.findById(id);

		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}

		if (auctionItem.createdBy.toString() !== userId) {
			return res.status(403).json({ message: "Unauthorized action" });
		}

		const bids = await Bid.find({ auctionItemId: id });
		for (const bid of bids) {
			await bid.remove();
		}

		await auctionItem.remove();

		res.json({ message: "Auction item removed" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAuctionWinner = async (req, res) => {
	const { id } = req.params;
	try {
		const auctionItem = await AuctionItem.findById(id);
		if (!auctionItem) {
			return res
				.status(404)
				.json({ winner: "", message: "Auction item not found" });
		}

		const bids = await Bid.find({ auctionItemId: id });
		if (bids.length === 0) {
			return res
				.status(300)
				.json({ winner: "", message: "No bids found" });
		}

		let winner = bids[0];
		for (const bid of bids) {
			if (bid.bidAmount > winner.bidAmount) {
				winner = bid;
			}
		}

		winner = await User.findById(winner.userId);
		if (!winner) {
			return res
				.status(404)
				.json({ winner: "", message: "Winner not found" });
		}

		res.status(200).json(winner);
	} catch (error) {
		console.error("Error fetching auction winner:", error);
		res.status(500).json({ message: error.message });
	}
};

const getAuctionsWonByUser = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const { id } = jwt.decode(token, process.env.JWT_SECRET, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: err.message });
			}
		});

		const bidsByUser = await Bid.find({ userId: id });
		const auctionIds = bidsByUser.map((bid) => bid.auctionItemId);

		let wonAuctions = [];

		for (let i = 0; i < auctionIds.length; i++) {
			const bids = await Bid.find({ auctionItemId: auctionIds[i] });
			let winningBid = bids[0];
			for (const bid of bids) {
				if (bid.bidAmount > winningBid.bidAmount) {
					winningBid = bid;
				}
			}
			let winner = await User.findById(winningBid.userId);
			if (winner._id.toString() === id) {
				const auctionItem = await AuctionItem.findById(auctionIds[i]);
				winner = {};
				winner.auctionId = auctionIds[i];
				winner.title = auctionItem.title;
				winner.description = auctionItem.description;
				winner.winningBid = winningBid.bidAmount;
				winner.endDate = auctionItem.endDate;
				wonAuctions.push(winner);
			}
		}
		res.status(200).json({
			wonAuctions,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createAuctionItem,
	getAuctionItems,
	updateAuctionItem,
	deleteAuctionItem,
	getAuctionItemById,
	getAuctionItemsByUser,
	getAuctionWinner,
	getAuctionsWonByUser,
};
