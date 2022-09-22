jest.mock("sagas/ActionExecution/NavigateActionSaga", () => ({
  __esModule: true,
  default: "",
  NavigationTargetType: { SAME_WINDOW: "" },
}));

import { argsStringToArray, JSToString, stringToJS } from "./utils";

describe("Test argStringToArray", () => {
  const cases = [
    { index: 0, input: "", expected: [""] },
    { index: 1, input: "'a'", expected: ["'a'"] },
    { index: 2, input: "a", expected: ["a"] },
    { index: 3, input: "'a,b,c'", expected: ["'a,b,c'"] },
    { index: 4, input: "a,b,c", expected: ["a", "b", "c"] },
    { index: 5, input: "a, b, c", expected: ["a", " b", " c"] },
    { index: 6, input: "a , b , c", expected: ["a ", " b ", " c"] },
    { index: 7, input: "[a,b,c]", expected: ["[a,b,c]"] },
    { index: 8, input: "[a, b, c]", expected: ["[a, b, c]"] },
    {
      index: 9,
      input: "[\n\ta,\n\tb,\n\tc\n]",
      expected: ["[\n\ta,\n\tb,\n\tc\n]"],
    },
    { index: 10, input: "{a:1,b:2,c:3}", expected: ["{a:1,b:2,c:3}"] },
    {
      index: 11,
      input: '{"a":1,"b":2,"c":3}',
      expected: ['{"a":1,"b":2,"c":3}'],
    },
    {
      index: 12,
      input: "{\n\ta:1,\n\tb:2,\n\tc:3}",
      expected: ["{\n\ta:1,\n\tb:2,\n\tc:3}"],
    },
    {
      index: 13,
      input: "()=>{}",
      expected: ["()=>{}"],
    },
    {
      index: 14,
      input: "(a, b)=>{return a+b}",
      expected: ["(a, b)=>{return a+b}"],
    },
    {
      index: 15,
      input: "(a, b)=>{\n\treturn a+b;\n\t}",
      expected: ["(a, b)=>{\n\treturn a+b;\n\t}"],
    },
    {
      index: 16,
      input: "(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}",
      expected: ["(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}"],
    },
    {
      index: 17,
      input: `() => {return 5}`,
      expected: ["() => {return 5}"],
    },
    {
      index: 19,
      input: `(a) => {return a + 1}`,
      expected: ["(a) => {return a + 1}"],
    },
    {
      index: 19,
      input: `(a, b) => {return a + b}`,
      expected: ["(a, b) => {return a + b}"],
    },
  ];
  test.each(cases.map((x) => [x.index, x.input, x.expected]))(
    "test case %d",
    (_, input, expected) => {
      const result = argsStringToArray(input as string);
      expect(result).toStrictEqual(expected);
    },
  );
});

describe("Test stringToJS", () => {
  const cases = [
    { index: 1, input: "{{'a'}}", expected: "'a'" },
    { index: 2, input: "{{a}}", expected: "a" },
    { index: 3, input: "{{'a,b,c'}}", expected: "'a,b,c'" },
    { index: 4, input: "{{a,b,c}}", expected: "a,b,c" },
    { index: 5, input: "{{a, b, c}}", expected: "a, b, c" },
    { index: 6, input: "{{a , b , c}}", expected: "a , b , c" },
    { index: 7, input: "{{[a,b,c]}}", expected: "[a,b,c]" },
    { index: 8, input: "{{[a, b, c]}}", expected: "[a, b, c]" },
    {
      index: 9,
      input: "{{[\n\ta,\n\tb,\n\tc\n]}}",
      expected: "[\n\ta,\n\tb,\n\tc\n]",
    },
    { index: 10, input: "{{{a:1,b:2,c:3}}}", expected: "{a:1,b:2,c:3}" },
    {
      index: 11,
      input: '{{{"a":1,"b":2,"c":3}}}',
      expected: '{"a":1,"b":2,"c":3}',
    },
    {
      index: 12,
      input: "{{{\n\ta:1,\n\tb:2,\n\tc:3}}}",
      expected: "{\n\ta:1,\n\tb:2,\n\tc:3}",
    },
    {
      index: 13,
      input: "{{()=>{}}}",
      expected: "()=>{}",
    },
    {
      index: 14,
      input: "{{(a, b)=>{return a+b}}}",
      expected: "(a, b)=>{return a+b}",
    },
    {
      index: 15,
      input: "{{(a, b)=>{\n\treturn a+b;\n\t}}}",
      expected: "(a, b)=>{\n\treturn a+b;\n\t}",
    },
    {
      index: 16,
      input: "{{(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}}}",
      expected: "(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}",
    },
    {
      index: 17,
      input: "{{() => {return 5}}}",
      expected: "() => {return 5}",
    },
    {
      index: 18,
      input: "{{(a) => {return a + 1}}}",
      expected: "(a) => {return a + 1}",
    },
    {
      index: 19,
      input: "{{(a, b) => {return a + b}}}",
      expected: "(a, b) => {return a + b}",
    },
  ];
  test.each(cases.map((x) => [x.index, x.input, x.expected]))(
    "test case %d",
    (_, input, expected) => {
      const result = stringToJS(input as string);
      expect(result).toStrictEqual(expected);
    },
  );
});

describe("Test JSToString", () => {
  const cases = [
    { index: 1, input: "'a'", expected: "a" },
    { index: 2, input: "a", expected: "{{a}}" },
    { index: 3, input: "'a,b,c'", expected: "a,b,c" },
    { index: 4, input: "a,b,c", expected: "{{a,b,c}}" },
    { index: 5, input: "a, b, c", expected: "{{a, b, c}}" },
    { index: 6, input: "a , b , c", expected: "{{a , b , c}}" },
    { index: 7, input: "[a,b,c]", expected: "{{[a,b,c]}}" },
    { index: 8, input: "[a, b, c]", expected: "{{[a, b, c]}}" },
    {
      index: 9,
      input: "[\n\ta,\n\tb,\n\tc\n]",
      expected: "{{[\n\ta,\n\tb,\n\tc\n]}}",
    },
    { index: 10, input: "{a:1,b:2,c:3}", expected: "{{{a:1,b:2,c:3}}}" },
    {
      index: 11,
      input: '{"a":1,"b":2,"c":3}',
      expected: '{{{"a":1,"b":2,"c":3}}}',
    },
    {
      index: 12,
      input: "{\n\ta:1,\n\tb:2,\n\tc:3}",
      expected: "{{{\n\ta:1,\n\tb:2,\n\tc:3}}}",
    },
    {
      index: 13,
      input: "()=>{}",
      expected: "{{()=>{}}}",
    },
    {
      index: 14,
      input: "(a, b)=>{return a+b}",
      expected: "{{(a, b)=>{return a+b}}}",
    },
    {
      index: 15,
      input: "(a, b)=>{\n\treturn a+b;\n\t}",
      expected: "{{(a, b)=>{\n\treturn a+b;\n\t}}}",
    },
    {
      index: 16,
      input: "(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}",
      expected: "{{(\n\ta,\n\tb\n)=>{\n\treturn a+b;\n\t}}}",
    },
    {
      index: 17,
      input: "() => {return 5}",
      expected: "{{() => {return 5}}}",
    },
  ];
  test.each(cases.map((x) => [x.index, x.input, x.expected]))(
    "test case %d",
    (_, input, expected) => {
      const result = JSToString(input as string);
      expect(result).toStrictEqual(expected);
    },
  );
});
