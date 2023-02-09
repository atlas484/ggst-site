import {
  d as I,
  r as u,
  c,
  a as F,
  f as o,
  t as i,
  w as T,
  g as d,
  v as S,
  h as g,
  F as h,
  i as m,
  o as p,
  _ as V,
  b as $,
} from "./main-73498727.js";
const k = o("h1", null, "Input Sets", -1),
  C = { id: "last-set" },
  D = { id: "inputs" },
  E = { class: "character", id: "character-1" },
  N = { class: "labeled" },
  K = o("label", { for: "date" }, "Date: ", -1),
  M = ["src"],
  A = ["value"],
  B = o("p", { id: "vs" }, "VS", -1),
  O = { class: "character", id: "character-2" },
  x = { class: "labeled" },
  L = o("label", { for: "opponent" }, "Opponent: ", -1),
  U = ["value"],
  Y = o("option", { value: "#10" }, "Floor 10", -1),
  q = ["value"],
  G = ["src"],
  H = ["value"],
  P = I({
    __name: "App",
    setup(X) {
      const s = u({
          date: w(new Date().toLocaleDateString()),
          opponent: "Raghav",
          character1: "SO",
          character2: "KY",
          games: "",
        }),
        n = u({
          date: "",
          opponent: "",
          oppString: "",
          character1: "",
          character2: "",
          wins: 0,
          losses: 0,
          lastSetString: "",
        }),
        r = u({}),
        v = u({
          Raghav: "Raghav",
          Kyle: "Kyle",
          Yonas: "Yonas",
          "#CE": "Celestial",
          "*Random": "Random",
          "*Tournament": "Tournament",
        });
      function w(t) {
        const e = t.split("/"),
          a = e[2],
          l = e[0].length > 1 ? e[0] : "0" + e[0],
          b = e[1].length > 1 ? e[1] : "0" + e[1];
        return a + "-" + b + "-" + l;
      }
      function _(t) {
        return "./src/assets/characters/faces/" + t + ".png";
      }
      function y(t) {
        return "#0" + t.toString();
      }
      function f() {
        let t = new XMLHttpRequest();
        t.open("GET", "./src/php/last_set.php"),
          (t.onload = function () {
            const e = JSON.parse(this.response);
            e.successful
              ? ((n.date = e.date),
                (n.opponent = e.opponent),
                (n.character1 = e.character_1),
                (n.character2 = e.character_2),
                (n.wins = parseInt(e.won)),
                (n.losses = parseInt(e.played) - n.wins),
                n.opponent == "Ranked"
                  ? (n.oppString = " in ranked")
                  : n.opponent == "Tournament"
                  ? (n.oppString = " in tournament")
                  : n.opponent == "Random"
                  ? (n.oppString = " against a random opponent")
                  : (n.oppString = ` against ${n.opponent}`),
                (n.lastSetString = `The last set was on ${n.date}${n.oppString}, ${n.character1} vs ${n.character2}, ${n.wins}-${n.losses}`))
              : (n.lastSetString =
                  "Failed to retrieve data on the last set played");
          }),
          t.send();
      }
      function R() {
        const t = new FormData();
        t.append("date", s.date),
          t.append("character-1", s.character1),
          t.append("opponent", s.opponent),
          t.append("character-2", s.character2),
          t.append("games", s.games);
        let e = new XMLHttpRequest();
        return (
          e.open("POST", "./src/php/input.php"),
          (e.onload = function () {
            console.log(this.response), (s.games = ""), f();
          }),
          e.send(t),
          !1
        );
      }
      return (
        fetch("./src/assets/characters/codes.json", { cache: "no-cache" })
          .then((t) => t.json())
          .then((t) => {
            for (const e in t) r[e] = t[e].name_long;
          })
          .catch((t) => {
            (r.SO = "Sol Badguy"),
              (r.KY = "Ky Kiske"),
              (r.GI = "Giovanna"),
              (r.MI = "Millia Rage"),
              (r.NA = "Nagoriyuki"),
              (r.BR = "Bridget"),
              (r.FA = "Faust"),
              (r.CH = "Chipp Zanuff"),
              (r.RA = "Ramlethal Valentine"),
              (r.IN = "I-No");
          }),
        fetch("./src/assets/characters/defaults.json", { cache: "no-cache" })
          .then((t) => t.json())
          .then((t) => {
            (s.character1 = t.me),
              (s.opponent = t.opponent.name),
              (s.character2 = t.opponent.character);
          }),
        f(),
        (t, e) => (
          p(),
          c(
            h,
            null,
            [
              F(V, { pageName: "Input" }),
              o("main", null, [
                k,
                o("p", C, i(n.lastSetString), 1),
                o(
                  "form",
                  {
                    id: "form",
                    autocomplete: "off",
                    onSubmit:
                      e[6] ||
                      (e[6] = T(
                        (...a) => t.onSubmit && t.onSubmit(...a),
                        ["prevent"]
                      )),
                  },
                  [
                    o("div", D, [
                      o("div", E, [
                        o("div", N, [
                          K,
                          d(
                            o(
                              "input",
                              {
                                type: "date",
                                "onUpdate:modelValue":
                                  e[0] || (e[0] = (a) => (s.date = a)),
                                class: "formElement",
                              },
                              null,
                              512
                            ),
                            [[S, s.date]]
                          ),
                        ]),
                        o(
                          "img",
                          {
                            src: _(s.character1),
                            alt: "Character 1 img",
                            width: "360",
                            height: "360",
                          },
                          null,
                          8,
                          M
                        ),
                        d(
                          o(
                            "select",
                            {
                              "onUpdate:modelValue":
                                e[1] || (e[1] = (a) => (s.character1 = a)),
                              id: "char-dropdown-1",
                              class: "formElement",
                            },
                            [
                              (p(!0),
                              c(
                                h,
                                null,
                                m(
                                  r,
                                  (a, l) => (
                                    p(), c("option", { value: l }, i(a), 9, A)
                                  )
                                ),
                                256
                              )),
                            ],
                            512
                          ),
                          [[g, s.character1]]
                        ),
                      ]),
                      B,
                      o("div", O, [
                        o("div", x, [
                          L,
                          d(
                            o(
                              "select",
                              {
                                "onUpdate:modelValue":
                                  e[2] || (e[2] = (a) => (s.opponent = a)),
                                class: "formElement",
                              },
                              [
                                (p(!0),
                                c(
                                  h,
                                  null,
                                  m(
                                    v,
                                    (a, l) => (
                                      p(), c("option", { value: l }, i(a), 9, U)
                                    )
                                  ),
                                  256
                                )),
                                Y,
                                (p(),
                                c(
                                  h,
                                  null,
                                  m(9, (a) =>
                                    o(
                                      "option",
                                      { value: y(10 - a) },
                                      i("Floor " + (10 - a).toString()),
                                      9,
                                      q
                                    )
                                  ),
                                  64
                                )),
                              ],
                              512
                            ),
                            [[g, s.opponent]]
                          ),
                        ]),
                        o(
                          "img",
                          {
                            src: _(s.character2),
                            alt: "Character 2 img",
                            width: "360",
                            height: "360",
                          },
                          null,
                          8,
                          G
                        ),
                        d(
                          o(
                            "select",
                            {
                              "onUpdate:modelValue":
                                e[3] || (e[3] = (a) => (s.character2 = a)),
                              class: "formElement",
                            },
                            [
                              (p(!0),
                              c(
                                h,
                                null,
                                m(
                                  r,
                                  (a, l) => (
                                    p(), c("option", { value: l }, i(a), 9, H)
                                  )
                                ),
                                256
                              )),
                            ],
                            512
                          ),
                          [[g, s.character2]]
                        ),
                      ]),
                    ]),
                    d(
                      o(
                        "textarea",
                        {
                          "onUpdate:modelValue":
                            e[4] || (e[4] = (a) => (s.games = a)),
                          class: "formElement games",
                          rows: "5",
                          maxlength: "255",
                          required: "true",
                          placeholder: `Input games here (up to 255)
1 = 2-0
2 = 2-1
3 = 1-2
4 = 0-2`,
                        },
                        null,
                        512
                      ),
                      [[S, s.games]]
                    ),
                    o("input", {
                      type: "submit",
                      value: "Submit",
                      id: "submit-button",
                      onClick: e[5] || (e[5] = (a) => R()),
                    }),
                  ],
                  32
                ),
              ]),
            ],
            64
          )
        )
      );
    },
  });
$(P).mount("#app");
