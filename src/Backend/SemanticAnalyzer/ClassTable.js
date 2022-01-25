export default class CalssTableItem {
  constructor(N, T, parent, ref) {
    this.Name = N;
    this.Type = T;
    this.parent = parent;
    this.ref = ref;
  }
  display() {
    console.log("----->>Displaying Class<<-----");
    console.log("Name", this.Name);
    console.log("Type", this.Type);
    console.log("parent", this.parent);
    console.log("ref", this.ref);
  }
}
