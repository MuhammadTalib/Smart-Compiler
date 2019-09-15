class Queue {
    constructor() {
        this.node = null
        this.next = null
    }
    enqueue(node) {
        if (this.node === null) {
            this.node = node
            this.next = null
        }
        else {
            var curr = this
            while (curr.next != null) {
                curr = curr.next
            }
            curr.next = new Queue()
            curr.next.node = node
            curr.next.next = null
        }
    }
    dequeue(q) {
        if (this.node === null) {
            return null
        }
        else {
            var node = this.node
            if (this.next === null) {
                this.node = null
                this.next = null
            }
            else {
                this.node = this.next.node
                this.next = this.next.next
            }
            return node
        }
    }
    // pop(){
    // 	if(this.node===null ){
    // 		console.log("start is null")
    // 		return null
    // 	}
    // 	else {
    // 		var curr=this
    // 		while(curr.next!=null){
    // 			curr=curr.next
    // 		}
    // 		var a=curr
    // 		curr.node=null
    // 		return a
    // 	}
    // }
    display() {
        console.log("display queue")
        console.log(this.node)
        var curr = this.next
        while (curr != null) {
            console.log(curr.node)
            curr = curr.next
        }
    }
}