import React from "react";
import "./index.css";

export default function BackgroundColors() {
    return (
        <div id="wd-css-bgcolors">
  <h2>Background Colors</h2>
  <h3 className="wd-bg-color-blue">Background color</h3>
  <p className="wd-bg-color-red">
    The background color of this paragraph is red but
    <span className="wd-bg-color-green wd-fg-color-white"> this span has a green background</span>
  </p>
</div>
    )
};
