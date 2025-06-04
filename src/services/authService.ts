import supabase from "./supabase"

interface SignUpProps {
    email: string;
    password: string;
}

const signUpUser = async (values: SignUpProps) => {
    const {data,error} = await supabase.auth.signUp(values);
    if(error) {
        throw error.message;
    }
    return data;
}

export {signUpUser};