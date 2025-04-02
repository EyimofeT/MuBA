export function clean_user_object(user){
    delete user.password

    return user
}