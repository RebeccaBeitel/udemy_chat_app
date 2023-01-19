module.exports = function (Users, async) {
  return {
    SetRouting: function (router) {
      router.get("/group/:name", this.groupPage);
    },
    groupPage: function (req, res) {
      const name = req.params.name;
      res.render("groupchat/group", {
        title: "Udemy Chat App - Group",
        user: req.user,
        groupName: name,
      });
    },
  };
};
