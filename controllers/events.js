const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  //verify tha event is valid
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();
    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error in create event",
    });
  }

  //   res.status(201).json({
  //     ok: true,
  //     msg: "create events",
  //   });
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);

    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "not authorized to edit event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error in update event",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);

    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "not authorized to delete event",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: "event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error in delete event",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
