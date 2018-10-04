// Garbage collection
/*  On the positive side:
    -   it allows for a massive simplification in languages that use it
        (since memory no longer needs to be managed explicitly by the programmer)
    -   It reduces (but does not eliminate!) a large class of errors, memory leaks
        (which plague large long-running applications)
    -   For some programs, it can even improve performance
*/
/*  On the other hand:
    -   using a garbage collected language means relinquishing a great deal of control over how memory is managed in your program,
        (which is an especially big concern for mobile applications)
    -   In JavaScript's case, you relinquish all control over how memory is managed:
        the ECMAScript specification doesn't expose any interface to the garbage collector. 
*/
/*  The fundamental problem garbage collection solves is to identify dead regions of memory.
    Once identified, these regions can be re-used for new allocations or released back to the operating system.
    An object is live if it is reachable through some chain of pointers from an object which is live by definition.
    Everything else is garbage.
*/