const app = require("./app");
const port = app.get("port");
app.listen(port, () => {
  console.log("Express is listening on port", port);
});
