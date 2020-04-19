import { merge, sanitize } from "./dataObjectUtil";

describe("When merging", () => {
  describe("shallow objects", () => {
    type Shallow = {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    const shallowDefault: Shallow = {
      a: "1111",
      b: "2222",
      c: "3",
      d: "4",
    };
    const expected = {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
    };

    it("should merge them correctly", () => {
      const shallow = {
        a: "1",
        b: "2",
        c: "3",
      };

      const actual = merge(shallow, shallowDefault);

      expect(actual).toEqual<Shallow>(expected);
    });

    it("should sanitize any extraneous data", () => {
      const shallow = {
        a: "1",
        b: "2",
        c: "3",
        garbageProp: "as;dlkfjlas",
      };

      const actual = merge(shallow, shallowDefault);

      expect(actual).toEqual<Shallow>(expected);
    });

    it("should allow null values to be assigned", () => {
      const obj = {
        a: undefined,
        b: null,
      };

      const defaultObj = {
        a: "a",
        b: "b",
      };

      const expectedObj = {
        a: "a",
        b: null,
      };

      const actual = merge(obj, defaultObj);

      expect(actual).toEqual(expectedObj);
    });

    it("should handle all types of data", () => {
      const persitentFunc = () => {};
      const persitentFunc2 = () => {};

      const persistentDate = new Date(0);

      const obj = {
        a: "a",
        garbageString: "asdf",
        number: 123,
        garbageNum: 4324,
        function: persitentFunc,
        garbageFunction: () => {},
        bool: false,
        garbageBool: false,
        date: persistentDate,
        garbageDate: new Date(),
      };

      const defaultObj = {
        a: "aaa",
        number: 112413423,
        number2: 123123,
        function: () => {
          return 2;
        },
        function2: persitentFunc2,
        bool: true,
        bool2: true,
        date: null,
        date2: null,
      };

      const expectedObj = {
        a: "a",
        number: 123,
        number2: 123123,
        function: persitentFunc,
        function2: persitentFunc2,
        bool: false,
        bool2: true,
        date: persistentDate,
        date2: null,
      };

      const actual = merge(obj, defaultObj);

      expect(actual).toEqual(expectedObj);
    });
  });

  describe("more complex objects", () => {
    const defaultObj = {
      a: "aaaa",
      b: {
        d: "dddd",
        f: "f",
      },
      c: "cccc",
      g: {
        h: "h",
      },
    };

    const expected = {
      a: "a",
      b: {
        d: "d",
        f: "f",
      },
      c: "c",
      g: {
        h: "h",
      },
    };

    it("should merge nested routes correctly", () => {
      const obj = {
        a: "a",
        b: {
          d: "d",
        },
        c: "c",
      };

      const actual = merge(obj, defaultObj);

      expect(actual).toEqual(expected);
    });

    it("should sanitize nested routes", () => {
      const obj = {
        a: "a",
        garbage: {
          asdfk: "asdlfk",
        },
        b: {
          d: "d",
          garbage: "asdfk",
        },
        c: "c",
      };

      const actual = merge(obj, defaultObj);

      expect(actual).toEqual(expected);
    });

    it("should handle properties with arrays", () => {
      const obj = {
        a: "a",
        arr0: [],
        arr1: [1, 1, 1],
        garbageArray: [],
      };

      const defObject = {
        a: "aaa",
        arr0: ["asdlf"],
        arr1: [],
        arr2: [2, 2, 2],
      };

      const expectedObj = {
        a: "a",
        arr0: [],
        arr1: [1, 1, 1],
        arr2: [2, 2, 2],
      };

      const actual = merge(obj, defObject);

      expect(actual).toEqual(expectedObj);
    });
  });
});

describe("When only sanatizing", () => {
  describe("shallow objects", () => {
    it("should sanitize out garbage data", () => {
      const obj = {
        a: "a",
        b: "b",
        c: "c",
      };

      const defaultObj = {
        a: "asdf",
        b: "asdf",
      };

      const expected = {
        a: "a",
        b: "b",
      };

      const actual = sanitize(obj, defaultObj);

      expect(actual).toEqual(expected);
    });

    it("should not enforce all props to be on the sanitized object", () => {
      const obj = {
        a: "a",
        b: "b",
      };

      const defaultObj = {
        a: "asdf",
        b: "asdf",
        c: "asdf",
      };

      const expected = {
        a: "a",
        b: "b",
      };

      const actual = sanitize(obj, defaultObj);

      expect(actual).toEqual(expected);
    });

    it("should throw an error if a property is the wrong type", () => {
      const obj = {
        a: 1,
        b: "b",
      };

      const defaultObj = {
        a: "asdf",
        b: "asdf",
      };

      expect(() => sanitize(obj, defaultObj)).toThrow();
    });

    it("should not throw an error if property is null", () => {
      const obj = {
        a: null,
      };

      const defaultObj = {
        a: {},
      };

      expect(() => sanitize(obj, defaultObj)).not.toThrow();
    });
  });
  describe("complex objects", () => {
    it("should sanitize out garbage data", () => {
      const obj = {
        a: "a",
        b: {
          d: "d",
          f: "f",
        },
        c: "c",
        g: {
          h: "h",
        },
      };

      const defaultObj = {
        a: "aaa",
        b: {
          d: "ddd",
        },
        c: "cccc",
        z: {
          z: "zzz",
        },
      };

      const expected = {
        a: "a",
        b: {
          d: "d",
        },
        c: "c",
      };

      const actual = sanitize(obj, defaultObj);

      expect(actual).toEqual(expected);
    });
  });
});
