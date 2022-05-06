import { Button } from "../components/Button";
import {Input} from "../components/forms/Input"

export const Profile = () => {
  return (
    <div className="justify-items-center grid gap-2">
      <div className="inputContainer">
        <Input id="fname" type="text" placeholder="First name"/>
        <Input id="lname" type="text" placeholder="Last name"/>
        <Input id="city" type="text" placeholder="City"/>
        <Input id="region" type="text" placeholder="Region"/>
        </div>
      <div className="justify-items-center grid gap-2">
        <Input id="phone" type="number" placeholder="Phone number"/>
        <Input id="password" type="password" placeholder="Password"/>
        <Input id="password1" type="password" placeholder="New password"/>
        <Input id="password2" type="password" placeholder="Retype password"/>
        <Button type="submit" value="Save changes" text="Save changes"/>
      </div>
    </div>

  );
};
