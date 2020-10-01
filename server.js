const app = require("./app");
const port = app.get("port");
app.listen(3000, () => {
  console.log("Express is listening on port", port);
});
