export const validate = (IValidate) => async (req, res, next) =>{
    await IValidate.validate(req.body)

    next()
}