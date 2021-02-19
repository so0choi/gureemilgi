const app = require("./app");
app.listen(3000, () => {
  console.log("Express is listening on port", process.env.PORT || 3000);
});
