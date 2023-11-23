import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName
} from './student.interface';
import config from '../../config';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
    maxlength: [20, "First Name can't be more than 20 charactors"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not Valid',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, "Middle Name can't be more than 20 charactors"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not Valid',
    },
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    trim: true,
    maxlength: [20, "Last Name can't be more than 20 charactors"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not Valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Student password is required'],
    maxlength: [20, "Passwaord length can't be more then 20 charectors"]
  },
  name: {
    type: userSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid!',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of Birth is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required'],
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not Valid Email. Please a a valid email',
    },
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood Group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required'],
  },
  profileImg: {
    type: String,
    required: [true, 'Profile Image URL is required'],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    required: [true, 'isActive status is required'],
  },
  isDeleted : {
    type: Boolean,
    default: false
  }
},{
  toJSON : {
    virtuals : true
  }
});

// pre save middleware/ hook: will work on create() save()

studentSchema.pre('save', async function(next) {
  // console.log(this, "pre hook : will save data")

  
  // hashing password and save into DB

  // Store hash in your password DB.

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password, 
    Number(config.bcrypt_salt_rounds)
    );
    next()

})

// post save middleware/ hook
studentSchema.post('save', function(doc, next) {
  doc.password='';
  next()
})


studentSchema.pre('find', function (next) {
  this.find({isDeleted : {$ne: true}})
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({isDeleted : {$ne: true}})
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift(
    {
      $match : {isDeleted : {$ne: true}}
    }
  )
  next()
})


studentSchema.virtual('fullname').get(
  function(){
    return (`${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`)
  }
)


// Creating a custom static method
/* ------------------------------------------------------- */

studentSchema.statics.isUserExists = async function name(id : string
  ) {
  const existingUser = await Student.findOne({id})
  return existingUser;
}

// Creating a custom instance method
// studentSchema.methods.isUserExists = async function name(id : string
//   ) {
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// }


export const Student = model<TStudent, StudentModel>('Student', studentSchema);
