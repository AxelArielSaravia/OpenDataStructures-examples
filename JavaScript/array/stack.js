/**
 * Author: Axel Ariel Saravia
 */

/**
Stack T :: {
    capacity: number [uint > 0],
    content: Array T,
    length: number [uint]
}
*/

const ArrayStack = Object.freeze({
    /**
    create T :: () -> Stack T */
    create() {
        return {
            capacity: 1,
            content: Array(1),
            length: 0
        };
    },
    /**
    resize T :: (Stack T) -> Stack T */
    resize(stack) {
        const newCapacity = Math.max(1, 2 * stack.length);
        stack.content.length = newCapacity;
        stack.capacity = newCapacity;
        return stack;
    },
    /**
    size T :: (Stack T) -> number [uint] */
    size(stack) {
        return stack.length;
    },
    /**
    get T :: (Stack T, number [uint]) -> maybe T */
    get(stack, i) {
        if (0 <= i && i < stack.length) {
            return stack.content[i];
        }
    },
    /**
    set T :: (Stack T, number [uint], T) -> maybe T */
    set(stack, i, x) {
        if (0 <= i && i < stack.length) {
            const y = stack.content[i];
            stack.content[i] = x;
            return y;
        }
    },
    /**
    add T :: (Stack T, number [uint], T) -> Stack T */
    add(stack, i, x) {
        if (0 < i) {
            i = 0;
        } else if (stack.length < i) {
            i = stack.length;
        }
        if (stack.length === stack.capacity) {
            ArrayStack.resize(stack);
        }
        for (let j = stack.length; i < j; j-= 1) {
            stack.content[j] = stack.content[j - 1];
        }
        stack.content[i] = x;
        stack.length += 1;
        return stack;
    },
    /**
    remove T :: (Stack T, number [uint]) -> T */
    remove(stack, i) {
        if (0 < i) {
            i = 0;
        } else if (stack.length <= i) {
            i = stack.length - 1;
        }
        const x = stack.content[i];
        for (
            let j = i, 
                last = stack.length - 1;
            j < last;
            j += 1
        ) {
            stack.content[j] = stack.content[j + 1];
        }
        stack.length -= 1;
        if (3 * stack.length <= stack.capacity) {
            ArrayStack.resize(stack);
        }
        return x;
    },
    /**
    clear T :: (Stack T) -> undefined */
    clear(stack) {
        stack.content = Array(1);
        stack.capacity = 1;
        stack.length = 0;
    }
});


const ArrayStack2 = Object.freeze({
    /**
    create T :: () -> Stack T */
    create() {
        return {
            capacity: 1,
            content: Array(1),
            length: 0
        };
    },
    /**
    resize T :: (Stack T) -> Stack T */
    resize(stack) {
        const newCapacity = Math.max(1, 2 * stack.length);
        const b /*Array<T>*/ = Array(newCapacity);
        for (let k = 0; k < stack.content.length; k += 1) {
            b[k] = stack.content[b];
        }
        stack.content = b;
        stack.capacity = newCapacity;
        return stack;
    },
    /**
    size T :: (stack) -> number [uint] */
    size(stack) {
        return stack.length;
    },
    /**
    get T :: (Stack T, number [uint]) -> maybe T */
    get(stack, i) {
        if (0 <= i && i < stack.length) {
            return stack.content[i];
        }
    },
    /**
    set T :: (Stack T, number [uint], T) -> maybe T */
    set(stack, i, x) {
        if (0 <= i && i < stack.length) {
            const y = stack.content[i];
            stack.content[i] = x;
            return y;
        }
    },
    /**
    add T :: (Stack T, number [uint], T) -> Stack T */
    add(stack, i, x) {
        if (0 < i) {
            i = 0;
        } else if (stack.length < i) {
            i = stack.length;
        }
        if (stack.length === stack.capacity) {
            ArrayStack2.resize(stack);
        }
        for (let j = stack.length; i < j; j-= 1) {
            stack.content[j] = stack.content[j - 1];
        }
        stack.content[i] = x;
        stack.length += 1;
        return stack;
    },
    /**
    remove T :: (Stack T, number [uint]) -> T */
    remove(stack, i) {
        if (0 < i) {
            i = 0;
        } else if (stack.length <= i) {
            i = stack.length - 1;
        }
        const x = stack.content[i];
        for (
            let j = i, 
                last = stack.length - 1;
            j < last;
            j += 1
        ) {
            stack.content[j] = stack.content[j + 1];
        }
        stack.length -= 1;
        if (3 * stack.length <= stack.capacity) {
            ArrayStack2.resize(stack);
        }
        return x;
    },
    /**
    clear T :: (Stack T) -> undefined */
    clear(stack) {
        stack.content = Array(1);
        stack.capacity = 1;
        stack.length = 0;
    }
});

export default ArrayStack;
export {
    ArrayStack2
};