const express = require("express");
const mongoUtil = require("./utils/mongoUtil");

const app = express();
app.use(express.json());

mongoUtil.connectDB((err) => {
  if (err) console.log(err);
  app.use("/channels", require("./routes/channelRoutes"));
  app.use("/posts", require("./routes/postRoutes"));
  const PORT = 5000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
});
