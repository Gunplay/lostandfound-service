import React from "react";
import { Switch } from "antd";

const onChange = (checked: boolean) => {};

export const Switcher: React.FC = () => <Switch defaultChecked onChange={onChange} />;
