"use client";
import arrow from "@/img/right.svg";
import Image from "next/image";
import "@/app/index.css";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import React from "react";
import GenerateInfo from "@/lib/GenerateInfo";
export default function Home() {
  const [form, setForm] = React.useState({
    v: 20,
    a: 45,
    g: 9.8,
    y: 50,
    x: 0,
  });
  const [isNew, setIsNew] = React.useState(false);
  const [dots, setDots] = React.useState([]);
  const [answers, setAnswers] = React.useState({
    time: 0,
    length: 0,
    height: 0,
  });
  let maxX = Math.max(...dots.map((dot) => dot[0]));
  let maxY = Math.max(...dots.map((dot) => dot[1]));
  let aspectRatio = maxX / maxY;
  function handleSubmit() {
    const { flightTime, maxHeight, flightLength, dots } = GenerateInfo(
      form.v,
      form.a,
      form.g,
      form.x,
      form.y
    );
    setAnswers({
      ...answers,
      time: flightTime.toFixed(2),
      length: flightLength.toFixed(2),
      height: maxHeight.toFixed(2),
    });
    setDots(dots);
    setIsNew(false);
  }
  return (
    <main className="main-section">
      <section className="section">
        <h2>Данные задачи</h2>
        <div className="form">
          <label htmlFor="">
            Начальная скорость
            <div className="input">
              <input
                onChange={(e) => {
                  setIsNew(true);
                  setForm({ ...form, v: e.target.value });
                }}
                value={form.v}
                type="number"
              />
              <p>м/с</p>
            </div>
          </label>
          <label htmlFor="">
            Значение угла
            <div style={{ alignItems: "start" }} className="input">
              <input
                onChange={(e) => {
                  setIsNew(true);
                  setForm({ ...form, a: e.target.value });
                }}
                value={form.a}
                type="number"
              />
              <p>°</p>
            </div>
          </label>
          <label htmlFor="">
            Ускорение свободного падения
            <div className="input">
              <input
                onChange={(e) => {
                  setIsNew(true);
                  setForm({ ...form, g: e.target.value });
                }}
                value={form.g}
                type="number"
              />
              <p>
                м/с<sup>2</sup>
              </p>
            </div>
          </label>
          <label htmlFor="">
            Смещение по оси Y
            <div className="input">
              <input
                onChange={(e) => {
                  setIsNew(true);
                  setForm({ ...form, y: e.target.value });
                }}
                value={form.y}
                type="number"
              />
              <p>м</p>
            </div>
          </label>
          <label htmlFor="">
            Смещение по оси X
            <div className="input">
              <input
                onChange={(e) => {
                  setIsNew(true);
                  setForm({ ...form, x: e.target.value });
                }}
                value={form.x}
                type="number"
              />
              <p>м</p>
            </div>
          </label>
        </div>

        <button onClick={handleSubmit} className={isNew ? "" : "disabled"}>
          Рассчитать <Image src={arrow} alt="arrow right" />
        </button>
      </section>
      <div className="right-side">
        <section className="section">
          <h2>Результаты вычислений</h2>
          <div className="group">
            <h3>Числовые значения</h3>
            <label htmlFor="">
              Время полета<p className="answer">{answers.time}с</p>
            </label>
            <label htmlFor="">
              Дальность полета<p className="answer">{answers.length}м</p>
            </label>
            <label htmlFor="">
              Максимальная высота<p className="answer">{answers.height}м</p>
            </label>
          </div>
          <div className="group">
            <h3>Траектория</h3>
            <Plot
              className="plot"
              data={[
                {
                  x: dots.map((dot) => dot[0]),
                  y: dots.map((dot) => dot[1]),
                  mode: "lines",
                  type: "scatter",
                  marker: { color: "#D2954E" },
                },
              ]}
              layout={{
                title: "Траектория полета",
                xaxis: {
                  range: [0, maxX],
                  title: "Координата X (м)",
                },
                yaxis: {
                  range: [0, maxY * aspectRatio],
                  title: "Координата Y (м)",
                },
                scene: {
                  aspectratio: {
                    x: 1,
                    y: aspectRatio,
                  },
                },
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </section>
        <section className="section"></section>
      </div>
    </main>
  );
}
