require('dotenv').config(); 
const db=require('../models/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const saltRounds=10;
const secret_key = process.env.SECRET_KEY;

async function sampleservice (){
    const et=10;
    try{
    if(et===10)
    {
        return {et,message:'success'}
    }
}
    catch (err) {
        throw new Error('Error registering user: ' + err.message);
    }
    }
    async function registerUser(FirstName, LastName, Email, PhoneNumber, Password, Pincode, City, Role) {
        const checkQuery = 'SELECT COUNT(*) AS count FROM User WHERE Email = ?';
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(Password, salt);
    
        // Define valid roles
        const validRoles = ['Seller', 'Buyer', 'Agent'];
    
        // Ensure Role is an array
        if (!Array.isArray(Role)) {
            throw new Error('Role must be an array');
        }
    
        // Validate and sanitize roles
        const roleValues = Role.map(role => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()).filter(role => validRoles.includes(role));
    
        if (roleValues.length !== Role.length) {
            throw new Error('One or more roles are invalid');
        }
    
        // Convert array to JSON string
        const roleString = JSON.stringify(roleValues);
    
        const insertQuery = 'INSERT INTO User (FirstName, LastName, Email, PhoneNumber, Password, Pincode, City, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
        try {
            // Check if the user already exists
            const [checkResult] = await db.query(checkQuery, [Email]);
            if (checkResult[0].count > 0) {
                throw new Error('Email already exists');
            }
    
            // Insert the new user into the database
            const [insertResult] = await db.query(insertQuery, [FirstName, LastName, Email, PhoneNumber, hashedPassword, Pincode, City, roleString]);
            
            return { id: insertResult.insertId, message: 'User registered successfully' };
        } catch (err) {
            throw new Error('Error registering user: ' + err.message);
        }
    }
  async function loginuser(Email, Password) {
    const query = 'SELECT user_id, Email, Password,Role FROM User WHERE Email = ?';
    
    try {
        const [rows] = await db.query(query, [Email]);
        if (rows.length === 0) {
            throw new Error('User does not exist');
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (isMatch) {
            const token = jwt.sign(
                { user: { user_id: user.user_id, Email: user.Email,Role: user.Role} },
                secret_key,
                { expiresIn: '3h' }
            );
            const role=user.Role;
            return { token, role, message: 'Login successful' };
        } else {
            throw new Error('Invalid password or email');
        }
    } catch (err) {
        console.error('Error during login:', err.message);
        throw new Error('Error during login: ' + err.message);
    }
}


const getProfile = async (user_id) => {
    try {
    const [rows] = await db.query('SELECT * FROM User WHERE user_id = ?', [user_id]);

    return rows[0]; // Return the first result, if any
    } catch (err) {
    console.error('Error fetching user by user_id:', err);
    throw err; // Rethrow the error to handle it in the controller
    }
    };
    



// getting seller info based on userid in properties table
const getSellerInfo = async (userId) => {
    try {
    const [rows] = await db.query(
    `SELECT u.*
    FROM User u
    JOIN Properties p ON u.user_id = p.user_id
    WHERE p.user_id = ?`,
    [userId]
    );
    return rows[0]; // Assuming you want the first matching user
    } catch (err) {
    console.error('Error fetching user details:', err);
    throw err;
    }
    };
    
    
    // Function to insert user rating into the database
    const insertUserRating = async ({ rating, review, user_id }) => {
    const query = 'INSERT INTO UserReview (user_id, rating, review) VALUES (?, ?, ?)';
    console.log(rating);
    try {
    await db.query(query, [user_id, rating, review]);
    } catch (error) {
    console.error('Error inserting rating:', error);
    throw error;
    }
    };
    
    
    


module.exports = { registerUser, loginuser ,getProfile,getSellerInfo,insertUserRating,sampleservice};