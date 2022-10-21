const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const CreateUser = async (req, res, next) => {
  const { name, country, city } = req.body;
  const medias = req.files;
  try {
    const response = await medias.reduce(
      async (memo, { mimetype, filename }) => {
        const obj = {
          name,
          country,
          city,
          profilePhoto: {
            data: fs.readFileSync(
              path.resolve(__dirname, `../../uploads/${filename}`)
            ),
            contentType: mimetype,
          },
        };
        await User.create(obj);
        fs.unlinkSync(path.resolve(__dirname, `../../uploads/${filename}`));
      },
      []
    );
    res.status(200).json({ result: true });
  } catch (err) {
    next(err);
  }
};

const GetUsers = async () => {
  const users = await User.find({});
  return { users };
};

module.exports = {
  CreateUser,
  GetUsers,
};
