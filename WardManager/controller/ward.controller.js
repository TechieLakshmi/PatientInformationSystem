const Wardmodel = require("../models/ward.model.js");

//Asign Ward bed against new patient if ward not exists else try creating ward 
exports.assignWard=(req, res)=>{
  var body = req.body;
  // Checks if the Ward and Bed exists 
  const filter ={bedNumber:body.bedNumber,wardNumber:body.wardNumber}
  Wardmodel.find(filter).exec() 
  .then(result => {
      if(result.length > 0) {
          if(result[0]['bedOccupancy']===true && body.bedOccupancy===true)
          { 
              console.log(result[0]['bedOccupancy'])
              console.log("ward bed already occupied")
              res({message:"Ward aleady occupied"});  //return current bed occupancy details
          }
          else
             {
                //If not occupied assign ward against ward bed
                console.log("Updated ward ocuupancy")
                const update = {
                  wardNumber: body.wardNumber,
                  doctorIncharge: body.doctorIncharge,
                  staffIncharge: body.staffIncharge,
                  staffContactNumber: body.staffContactNumber,
                  patientName: body.patientName,
                  patientcontactNumber: body.patientcontactNumber,
                  admissionTime: body.admissionTime,
                  bedNumber: body.bedNumber,
                  bedOccupancy: body.bedOccupancy
              };
                Wardmodel.findOneAndUpdate(filter,update,{  
                  new: true
                }).exec().then(
                    result => {
                        console.log(result);
                        res(result);
                    }
                ).catch( err => {
                  res({err})
                });

             }
      } else {
          console.log("No matching records found creating new record")
          // If not then create a new ward istance
          const warddetails = new Wardmodel({
             //_id: new mongoose.Types.ObjectId,
              wardNumber: body.wardNumber,
              doctorIncharge: body.doctorIncharge,
              staffIncharge: body.staffIncharge,
              staffContactNumber: body.staffContactNumber,
              patientName: body.patientName,
              patientcontactNumber: body.patientcontactNumber,
              admissionTime: body.admissionTime,
              bedNumber: body.bedNumber,
              bedOccupancy: body.bedOccupancy
          });
          warddetails.save()
              .then(result => {
                res(result);
              })
              .catch(err=> {
                res({err});
              })
      }
  })
  .catch(err => {
    res({err});
  });
}
// Update the Ward information using ward and bed number
exports.releaseWard=(req, res) => {
  var body = req.body;
  const filter = {wardNumber: body.wardNumber,bednumber:body.bednumber};
  const update = {
      wardNumber: body.wardNumber,
      doctorIncharge: "",
      staffIncharge: "",
      staffContactNumber: 0,
      patientName: "",
      patientcontactNumber: 0,
      admissionTime: null,
      bedNumber: body.bedNumber,
      bedOccupancy: false
  };
  Wardmodel.findOneAndUpdate(filter,update,{ 
    new: true
  }).exec().then(
      result => {
          res(result);
      }
  ).catch( err => {
    res({err})
  });
}
// return all ward bed details
exports.listallWards = async (req, res) => {
  console.log("Get all wards request received");
  const wards = await Wardmodel.find({});
  try {
    res(wards);
  } catch (error) {
    res({error});
  }
};
// Delete all Wards from the database.
exports.deleteAllWards = (req, res) => {
  console.log("Trying to delete ward");           
  Wardmodel.deleteMany({})
    .then(data => {
      res({message: `${data.deletedCount} wards were deleted successfully!`});
    })
    .catch( err => {
      res({err})
  });
};
// Delete Ward with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.wardNumber;
  Wardmodel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res({message: `Cannot delete Ward with number=${id}. Maybe Ward was not found!`});
      } else 
      {
        res({message: "deleted ward successfully!"});
      }
    })
    .catch(err => {
      res({err});
    });
};

// Find all occupied wards
exports.findAllOccupiedwards= (req, res) => {
  console.log("Finding all occupied ward")
  Wardmodel.find({ bedOccupancy: true })
    .then(data => {
      res(data);
    })
    .catch(err => {
      res({err});
    });
};

exports.validateToken= (req, res)=> {
  const secretKey = 'PTS_Secret_Key';
  try {
      const token = req.header("TOKEN_HEADER_KEY");
      if(!token){
          return false;
      }
      const user = jwt.verify(token, secretKey);
      if(  user && user.designation =="doctor" && user.designation =="nurse"&& user.designation =="paramedic"){
          return true;
      }else {
          // Access Denied
          return false;
      }
  } catch (error) {
      // Access Denied
      return false;
  }

}
