import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Grocery Buddy</h1>
          <p className="py-4">Please log in or sign up to continue</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button formAction={login} className="btn btn-primary">
                Log in
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="form-control">
              <button formAction={signup} className="btn btn-outline">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}