import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'

const userRegister = async () => {
    connectToDatabase()
    try {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_NAME) {
            throw new Error("Missing required environment variables for admin creation")
        }
        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        const newUser = new User({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch(error) {
        console.log(error)
    }
}

userRegister();