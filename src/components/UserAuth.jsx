import { useState } from "react";
import img1 from "../images/123.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebase"
import { useNavigate } from "react-router";

const UserAuth = () => {

    const navigate=useNavigate();
    const [login, setlogin] = useState(false);

    const [value, setvalues] = useState({
        name: "",
        email: "",
        password: "",
    })
    function loginsignupsetup() {
        setlogin(prev => !prev);
    }

    const [submitbuttondisabled,setsubmitbuttondisabled]=useState(false);

    const [errMsg,seterrMsg]=useState("");
    function handlesubmission(){
        if(!value.name  || !value.email || !value.password){
            seterrMsg("Fill all fields");
            return ;
        }
        seterrMsg("");
        setsubmitbuttondisabled(true); 
        console.log(value);
        
        createUserWithEmailAndPassword(auth,value.email,value.password).then(
            async(res)=>{
                setsubmitbuttondisabled(false);
                const user=res.user;
                await updateProfile(user,{
                    displayName:value.name,
                });
                navigate("/");
            }
        ).catch((err)=>{seterrMsg("Err: "+err.message); setsubmitbuttondisabled(false)})
    } 
    
    return <div className="flex flex-col py-10 justify-center items-center bg-purple-300">
        {
            !login ?
                (<div className="flex flex-col p-10 rounded-lg gap-y-6 bg-white w-1/4">
                    <h1 className="text-3xl text-bold">Sign Up</h1>
                    <button className="flex flex-row justify-evenly border-2 w-full rounded-lg py-1">
                        <div>
                            <img src={img1} className="w-6 h-6" />
                        </div>
                        
                        <div>
                            Sign Up with Google
                        </div>
                    </button>
                    <div className="flex flex-col gap-x-5">
                        <div><label for="Name">Name</label></div>
                        <div><input onChange={(e) => { setvalues(prev => ({ ...prev, name: e.target.value })) }} label="Name" placeholder="Name" type="text" className="outline-none border-2 border-black rounded-md px-2 py-1 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-x-5">
                        <div><label for="Email">Email</label></div>
                        <div><input onChange={(e) => { setvalues(prev => ({ ...prev, email: e.target.value })) }} label="Email" placeholder="Email" type="email" className="outline-none border-2 border-black rounded-md px-2 py-1 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-x-5">
                        <div><label for="Password">Password</label></div>
                        <div><input minLength={8} onChange={(e) => { setvalues(prev => ({ ...prev, password: e.target.value })) }} label="Password" placeholder="Password" type="password" className="outline-none border-2 border-black rounded-md px-2 py-1 w-full" /></div>
                    </div>
                    <div>
                         <p className="text-red-700">{errMsg}</p>
                        <button disabled={submitbuttondisabled} onClick={()=>{handlesubmission()}} className="bg-purple-300 px-6 py-2 w-full rounded-lg disabled:bg-red-500">Sign Up</button>
                        <p>
                            Already have an account?{" "}
                            <span className=" text-blue-700" onClick={() => { loginsignupsetup() }}>Login In</span>
                        </p>
                    </div>
                </div>) :
                (<div className="flex flex-col bg-white p-10 rounded-lg gap-y-6  w-1/4">
                    <h1 className="text-3xl text-bold">Login</h1>
                    <button className="flex flex-row justify-evenly border-2 w-full rounded-lg py-1">
                        <div>
                            <img src={img1} className="w-6 h-6" />
                        </div>
                        <div>
                            Login with Google
                        </div>
                    </button>
                    <div className="flex flex-col gap-x-5">
                        <div><label for="Email">Email</label></div>
                        <div><input label="Email" placeholder="Enter Your Email" type="email" className="outline-none border-2 border-black rounded-md px-2 py-1 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-x-5">
                        <div><label for="Password">Password</label></div>
                        <div><input label="Password" placeholder="Enter Your Password" type="password" className="outline-none border-2 border-black rounded-md px-2 py-1 w-full" /></div>
                    </div>
                    <div>
                        <button className="bg-purple-300 px-6 py-2 w-full rounded-lg">Login</button>
                        <p>
                            Not having an account?{" "}
                            <span className=" text-blue-700" onClick={() => { loginsignupsetup() }}>Sign Up</span>
                        </p>
                    </div>
                </div>)
        }
    </div>
}
export default UserAuth;