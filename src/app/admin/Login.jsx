import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email");
  }

  return (
    <div className="p-10">
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        className="text-black px-3 py-2"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
