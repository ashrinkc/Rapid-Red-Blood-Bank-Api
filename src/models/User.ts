import mongoose, { model, Schema } from "mongoose";

interface User {
  profilePic: string;
  email: string;
  name: string;
  password: string;
  userType: string;
  bloodType: string;
  contact: string;
  status: string;
}

interface Donor extends User {
  bloodType: string;
}

interface Organization extends User {
  donorId: mongoose.Schema.Types.ObjectId;
  address: string;
}

const userSchema = new Schema(
  {
    profilePic: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["donor", "patient", "organization"],
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
  },
  {
    discriminatorKey: "userType",
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", userSchema);
const DonorModel = UserModel.discriminator<Donor>(
  "donor",
  new Schema({
    bloodType: {
      type: String,
      required: true,
    },
  })
);

const OrganizationModel = UserModel.discriminator<Organization>(
  "organization",
  new Schema({
    // donorId:{
    //     type:mongoose.Schema.Types.ObjectId,
    // },
    address: {
      type: String,
      required: true,
    },
  })
);

const PatientModel = UserModel.discriminator("patient", new Schema({}));

// userSchema.pre("save",async function(next){
//   let user = this as User
//     if (!user.isModified("password")) {
//       return next();
//     }
//     const salt = await bcrypt.genSalt(20);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     return next();
// })
// export const login = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.status(404).send("user not found");
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user!.password
//     );
//     !validPassword && res.status(400).json("Wrong password");

//     res.status(200).json(user);
//   } catch (err: any) {
//     res.status(500).json(err);
//   }
// };
export default { UserModel, DonorModel, OrganizationModel, PatientModel };
