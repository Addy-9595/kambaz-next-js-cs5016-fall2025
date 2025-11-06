"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER =
      process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PathParameters() {

  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
    return (
    <div id="wd-query-parameters">
 <h3>Query Parameters</h3>

 <FormControl defaultValue={a} type="number"
    onChange={(e) => setA(e.target.value)} />

 <FormControl defaultValue={b} type="number"
    onChange={(e) => setB(e.target.value)} />

    <a href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
    Add {a} + {b} </a>

  <a href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
    Substract {a} - {b} </a>

</div>
);}
