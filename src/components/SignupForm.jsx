import React, { useState } from "react";
import { Field } from "./Utils";
import { Button } from "./Utils";

export const SignupForm = ({ closeForm }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [plan, setPlan] = useState("g");
  const [politics, setPolitics] = useState(false);

  const errors = {
    user: user.length < 3,
    email: email.match(/^[^@]+@[a-z0-9\-\.]+\.[a-z]{2,}$/i) === null,
    birthdate: Date.parse(birthdate) >= Date.now(),
    password: password.length < 8,
    politics: !politics,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted successfully");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create an Account</legend>
          <p>With a user account, you can save your tasks and access them on any device.</p>
          <Field
            id="user"
            type="text"
            placeholder="alice"
            value={user}
            onValueChange={setUser}
            invalid={errors.user}
            error="The username must have at least 3 characters."
          >
            Username
          </Field>

          <Field
            id="email"
            type="email"
            placeholder="alice@example.org"
            value={email}
            onValueChange={setEmail}
            invalid={errors.email}
            error="Please enter a valid email address."
          >
            Email
          </Field>

          <Field
            id="password"
            type="password"
            value={password}
            onValueChange={setPassword}
            invalid={errors.password}
            error="The password must have at least 8 characters."
          >
            Password
          </Field>

          <Field
            id="birthdate"
            type="date"
            value={birthdate}
            onValueChange={setBirthdate}
            invalid={errors.birthdate}
            error="The birthdate cannot be after today."
          >
            Birthdate
          </Field>

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />

          <label htmlFor="plan">Select a plan</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value)} id="plan">
            <option value="g">Free (0€)</option>
            <option value="p">Pro (12€/year)</option>
          </select>

          {plan === "p" && (
            <>
              <Field id="card" maxLength="16" placeholder="1234 5678 1234 5678">
                Card number
              </Field>
              <Field id="expiry" maxLength="6" placeholder="MMYYYY">
                Expiry date
              </Field>
              <Field id="cvv" maxLength="3" placeholder="123">
                CVV
              </Field>
            </>
          )}

          <p>
            <input
              type="submit"
              value="Create account"
              disabled={Object.values(errors).some((v) => v)}
            />
          </p>

          <label>
            <input
              type="checkbox"
              checked={politics}
              onChange={(e) => setPolitics(e.target.checked)}
            />
            I have read and accept the privacy policy
          </label>
        </fieldset>
      </form>
      <button onClick={closeForm}>Close</button>
    </>
  );
};

export default SignupForm