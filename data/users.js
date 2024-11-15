import {users} from '../config/mongoCollections.js';

export const createUser = async(firstName, lastName, Usertype) => {
    if(!firstName || !lastName)
        throw 'name must be provided'
    firstName = firstName.trim();
    lastName = lastName.trim();
    if(firstName || !lastName)
        throw 'name cannot be empty spaces'
    Usertype = 'default'
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        Usertype: Usertype
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    const newId = insertInfo.insertedId.toString();
    return {
        _id: newId,
        firstName: firstName,
        lastName: lastName,
        Usertype: Usertype
    }
}

