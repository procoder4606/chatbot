const flow = {
  start: {
    message: "Hello 👋",
    next: "end",
  },
  end: {
    message: "Done!",
    end: true,
  },
};

export default flow;