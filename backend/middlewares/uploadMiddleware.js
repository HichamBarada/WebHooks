import multer from "multer";
const PATH = "./uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    const fileName = (Date.now() + " " + file.originalname)
      .split(" ")
      .join("-");
    console.log(fileName);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
  },
});

export { upload, storage };
