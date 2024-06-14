import Form from "@/app/components/Form";

const Login = () => {
    return (
        <div className="flex flex-col mx-auto my-auto w-1/2 h-3/5">
            <h2 className="mb-5 text-center text-5xl">Register</h2>
            <Form route="/api/user/register/" method="register" />
        </div>
    )
}

export default Login;
