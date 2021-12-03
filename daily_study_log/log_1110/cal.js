class Calculate {
    constructor(left, right){
        this.left = left;
        this.right = right;
    }

    add(){
        this.print(this.left + this.right);
    }

    sub(){
        this.print(this.left + this.right);
    }

    mul(){
        this.print(this.left + this.right);
    }

    div(){
        this.print(this.right != 0 ? this.left / this.right : 'error');
    }

    print(result){
        console.log(result);
    }
}

const calculate = new Calculate(2,3);
calculate.add()






