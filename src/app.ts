const button = document.querySelector("button")!;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});

let age: number = 50;
let nam: string = "Max";
let toggle: boolean = true;
let empty: null = null;
let notInitialize: undefined = undefined;
let callback = (a: number): number => {
  return 100 + a;
};

let anything: any = -20;
anything = "Text";
anything = {};

let some: unknown;
some = "Text";
let str: string;
if (typeof some === "string") {
  str = some;
}

enum Status {
  LOADING,
  READY,
}

let variable: string | number;

let checkFunctioning: "enable" | "disable";

function showMessage(message: string): void {
  console.log(message);
}

function calc(num1: number, num2: number): number {
  return num1 + num2;
}

function customError(): never {
  throw new Error("Error");
}

// type Page = {
//   title: string;
//   likes: number;
//   accounts: string[];
//   status: "open" | "close";
//   details?: {
//     createAt: string;
//     updateAt: string;
//   };
// };

// const page1: Page = {
//   title: "The awesome page",
//   likes: 100,
//   accounts: ["Max", "Anton", "Nikita"],
//   status: "open",
//   details: {
//     createAt: "2021-01-01",
//     updateAt: "2021-05-01",
//   },
// };

// const page2: Page = {
//   title: "Python or Js",
//   likes: 5,
//   accounts: ["Alex"],
//   status: "close",
// };

class Key {
  private signature: number;

  constructor() {
    this.signature = Math.floor(Math.random() * 100);
  }

  getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door = false;
  tenants: Person[] = [];

  constructor(public key: Key) {}

  public comeIn(person: Person): void {
    if (!this.door) {
      throw new Error("Door is closed");
    }

    this.tenants.push(person);
  }

  public abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {
  openDoor(key: Key) {
    if (key.getSignature() !== this.key.getSignature()) {
      throw new Error("Key to another door");
    }
    return (this.door = true);
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

function getPromise(): Promise<(string | number)[]> {
  return new Promise((resolve) => {
    resolve(["Text", 50]);
  });
}

getPromise().then((data) => {
  console.log(data);
});

type AllType = {
  name: string;
  position: number;
  color: string;
  weight: number;
};
function compare(
  top: Pick<AllType, "name" | "color">,
  bottom: Pick<AllType, "position" | "weight">
): AllType {
  return {
    name: top.name,
    color: top.color,
    position: bottom.position,
    weight: bottom.weight,
  };
}

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

class Component<T> {
  constructor(public props: T) {}
}

interface IProps {
  title: string;
}
class Page extends Component<IProps> {
  pageInfo() {
    console.log(this.props.title);
  }
}
