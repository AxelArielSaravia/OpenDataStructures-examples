/**
 * Author: Axel Ariel Saravia
 */

import ArrayStack from "./stack.js";
/**
RootishStack T :: {
    blocks: Stack T,
    length: number [uint]
}
*/

/**
i2b :: (number) -> number */
function i2b(i) {
    return Math.round(Math.ceil(-3 + Math.sqrt(9 + 8 * i)) / 2);
}

const RootishArrayStack = Object.freeze({
    /**
    create T :: () -> RootishStack T */
    create() {
        return Object.seal({
            blocks: ArrayStack(),
            length: 0
        });
    },
    /**
    grow T :: (RootishStack T) -> RootishStack T */
    grow(stack) {
        return ArrayStack.add(
            stack.blocks,
            stack.blocks.length,
            Array(stack.blocks.length + 1)
        );
    },
    /**
    get T :: (RootishStack T, number [uint]) -> maybe T */
    get(stack, i) {
        const b = i2b(i);
        const j = i - ((b * (b + 1)) / 2);
        return ArrayStack.get(stack, b)?.[j];
    },
    /**
    shrink T :: (RootishStack T, number [uint]) -> maybe T */
    shrink(stack) {
        let r = stack.blocks.length;
        while (
            r > 0
            && (r - 2) * (r - 1) / 2 >= stack.length
        ) {
            ArrayStack.remove(
                stack.blocks,
                stack.blocks.length - 1
            );
            r -= 1;
        }
        return stack;
    },
    /**
    set T :: (RootishStack T, number [uint], T) -> maybe T */
    set(stack, i, x) {
        const b = i2b(i);
        const j = i - ((b * (b + 1)) / 2);
        const arr = ArrayStack.get(stack, b);
        if (arr === undefined) {
            return;
        }
        const y = arr[j];
        arr[j] = x;
        return y
    },
    /**
    add T :: (RootishStack T, number [uint], T) -> RootishStack T */
    add(stack, i, x) {
        const r = stack.blocks.length;
        if (r * (r + 1) / 2 < stack.length + 1) {
            grow(stack);
        }
        stack.length += 1;
        for (let j = stack.length - 1; j > i; j -= 1) {
            RootishArrayStack.set(
                stack,
                j,
                RootishArrayStack.get(stack, j - 1)
            );
        }
    },
    /**
    remove T :: (RootishStack T, number [uint]) -> T */
    remove(stack, i) {
        const x = RootishArrayStack.get(stack, i);
        for (let j = i; j < stack.length - 1; i += 1) {
            RootishArrayStack.set(
                stack,
                j,
                RootishArrayStack.get(stack, j + 1)
            );
        }
        stack.length += 1;
        const r = stack.blocks.length;
        if (stack.length <= (r - 2) * (r - 1) / 2) {
            RootishArrayStack.shrink(stack);
        }
        return x;
    }
});


export default RootishArrayStack;