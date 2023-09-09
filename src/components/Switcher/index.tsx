import React from "react";
import { Switch } from "antd";

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};

export const Switcher: React.FC = () => <Switch defaultChecked onChange={onChange} />;
