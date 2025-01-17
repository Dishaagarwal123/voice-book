import {React,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authActions} from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () =>{
  const [Values,setValues] = useState({
    username: "",password:"",
});
const navigate = useNavigate();
const dispatch = useDispatch();
const change = (e) =>{
    const {name,value} = e.target;
    setValues({...Values,[name]:value});
}
const submit = async () => {
    console.log("clicked");
    try {
        if(
Values.username===""||Values.password===""
        ){alert("All fields are required!");}
        else{    
            const response = await axios.post("http://localhost:5500/auth/login", 
            Values
            );
            dispatch(authActions.login());
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token",response.data.token);
            // console.log(response.data);
            navigate("/");
        }
    
          
    } catch (error) {
        alert(error.response.data.message);
    }
};



return(

<div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
  
    <div className="max-w-sm rounded-3xl bg-gradient-to-b from-orange-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
      <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Login to your account</h1>
          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">Don't have an account ? <Link to="/signup" className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400">Signup</Link> for free</p>
        </div>

        <div className="mt-8 space-y-8">
          <div className="space-y-6">
            <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Your Username" type="text" name="username" id="username" value={Values.username} onChange={change} />

            <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Your Password" type="password" name="password" id="password" value={Values.password} onChange={change} />
          </div>

          <button className="h-9 px-3 w-full bg-orange-500 hover:bg-orange-700 active:bg-orange-800 focus:bg-orange-700 transition duration-500 rounded-md text-white" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  
</div>
)
}
export default Login;