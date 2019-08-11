const express=require(`express`)
const multer=require(`multer`)
const uploadRouter= express.Router();
const upload=multer({
    dest: 'public/'
})
uploadRouter.post('/image', upload.single(`image`),(req,res) => {
console.log(req.file)
res.json({
    success: true,
})
})
module.exports=uploadRouter;