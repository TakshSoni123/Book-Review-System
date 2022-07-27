export const parseError = err => {
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export const sessionizeUser = user => {
    return { userId: user.id, username:user.username }
}   