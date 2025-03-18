


const userLogout = async (req, res) => {
  try {
    res.clearCookie("jwtToken");
    res.json({
        message:'Loggedout successfully!',
        error:false,
        success:true,
        data:[]
    })
  } catch(error) {
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = userLogout;