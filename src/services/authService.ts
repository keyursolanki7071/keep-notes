import supabase from "./supabase"

interface AuthProps {
    email: string;
    password: string;
}

const signUpUser = async (values: AuthProps) => {
    const {data,error} = await supabase.auth.signUp(values);
    if(error) {
        throw error.message;
    }
    return data;
}

const loginUser = async (values: AuthProps) => {
    const {data, error} = await supabase.auth.signInWithPassword(values);
    if(error) throw error.message;
    return data;
}

export {signUpUser, loginUser};