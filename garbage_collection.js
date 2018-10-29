/* Reachability
The main concept of memory management in JavaScript is reachability.

Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

1.  There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.
        For instance:
        >>  Local variables and parameters of the current function.
        >>  Variables and parameters for other functions on the current chain of nested calls.
        >>  Global variables.
        These values are called roots.
2.  Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

There’s a background process in the JavaScript engine that is called garbage collector.
It monitors all objects and removes those that have become unreachable.
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------------

/*  JavaScript engines apply many optimizations to make GC run faster and not affect the execution.
    Some of the optimizations:
    -   Generational collection – objects are split into two sets: “new ones” and “old ones”. Many objects appear, do their job and die fast, they can be cleaned up aggressively. Those that survive for long enough, become “old” and are examined less often.
    -   Incremental collection – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine tries to split the garbage collection into pieces. Then the pieces are executed one by one, separately. That requires some extra bookkeeping between them to track changes, but we have many tiny delays instead of a big one.
    -   Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution. */

//--------------------------------------------------------------------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Heap organization
/*  V8 divides the heap into several different spaces:
    -   New-space:  Most objects are allocated here.
                    New-space is small and is designed to be garbage collected very quickly, independent of other spaces.
    -   Old-pointer-space:  Contains most objects which may have pointers to other objects.
                            Most objects are moved here after surviving in new-space for a while.
    -   Old-data-space: Contains objects which just contain raw data (no pointers to other objects!).
                        Strings, boxed numbers, and arrays of unboxed doubles are moved here after surviving in new-space for a while.
    -   Large-object-space: This space contains objects which are larger than the size limits of other spaces.
                            Each object gets its own mmap'd region of memory.
                            Large objects are never moved by the garbage collector.
    -   Code-space: Code objects, which contain JITed instructions, are allocated here.
                    This is the only space with executable memory (although Codes may be allocated in large-object-space, and those are executable, too).
    -   Cell-space, property-cell-space and map-space:  These spaces contain Cells, PropertyCells, and Maps, respectively.
                                                        Each of these spaces contains objects which are all the same size
                                                        and has some constraints on what kind of objects they point to, which simplifies collection. 
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Discovering pointers
/*  Distinguishing pointers and data on the heap is the first problem any garbage collector needs to solve.
    The GC needs to follow pointers in order to discover live objects.
    Most garbage collection algorithms can migrate objects from one part of memory to another.
*/
/*  There are three popular approaches to identifying pointers:
    -   Conservative -  This is necessary for implementations which get no support from the compiler.
                        Basically, we treat all aligned words on the heap as if they were pointers (This means some data will be treated as pointers)
                        We can't move any objects around in memory, since we might accidentally change data that we thought was a pointer.
                        As a result, we don't see the benefits of compacting garbage collection (simpler allocation, lower memory footprint, better cache locality).
                        Garbage collectors for C/C++ such as the Boehm-Demers-Weiser garbage collector take this approach.
    -   Compiler hints -    If we are working in a statically-typed language, the compiler can tell us the offsets of pointers within each class.
                            As long as we can identify what class an object comes from, we can find all of its pointers.
                            The Java Virtual Machine takes this approach.
                            Unfortunately, this does not work well for dynamically typed languages like JavaScript,
                            since any field in an object can contain pointers or data.
    -   Tagged pointers -   With this approach, we reserve a bit at the end of each word to indicate whether it is pointer or data.
                            This approach requires limited compiler support, but it's simple to implement while being fairly efficient.
                            V8 takes this approach and some statically typed languages (such as OCaml) also.
*/
/*  Most objects on the heap just contain a list of tagged words, so the garbage collector can quickly scan them,
    following the pointers and ignoring the integers. Some kinds of objects, such as strings, are known to contain only data (no pointers),
    so their contents do not have to be tagged.
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Generational collection
/*  In the vast majority of programs, objects tend to die young:
    most objects have a very short lifetime, while a small minority of objects tend to live much longer.
    To take advantage of this behavior, V8 divides the heap into two generations.
    Objects are allocated in new-space, which is fairly small.
    Allocation in new space is very cheap: we just have an allocation pointer which we increment whenever we want to reserve space for a new object.
    When the allocation pointer reaches the end of new space, a scavenge (minor garbage collection cycle) is triggered,
    which quickly removes the dead objects from new space. Objects which have survived two minor garbage collections are promoted to old-space.
    Old-space is garbage collected during a mark-sweep or mark-compact (major garbage collection cycle), which is much less frequent.
    A major garbage collection cycle is triggered when we have promoted a certain amount of memory to old space.
    This threshold shifts over time depending on the size of old space and the behavior of the program.
*/
/*  Since scavenges occur frequently, they must be very fast. Scavenge is an implementation of Cheney's algorithm. 
    Basically, new-space is divided into two equal sized semi-spaces: to-space and from-space.
    Most allocations are made in to-space. When to-space fills up, we swap to-space and from-space (so all the objects are in from-space).
    Then, we copy the live objects out of from-space, moving them to to-space or promoting them to old-space.
    The objects are compacted in to-space in the process, so this improves cache locality, and allocation remains fast and simple.
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Mark-sweep and mark-compact
/*  To collect old space, which may contain several hundred megabytes of data, we use two closely related algorithms, Mark-sweep and Mark-compact.

    Both of these algorithms operate in two phases: a marking phase and a sweeping phase or a compacting phase.

    During the marking phase, all live objects on the heap are discovered and marked.
    Each page contains a marking bitmap with one bit per allocatable word on that page.
    This is necessary since objects can start at any word-aligned offset. There are three marking states.
    If an object is white, it has not yet been discovered by the garbage collector.
    If an object is grey, it has been discovered by the garbage collector, but not all of its neighbors have been processed yet.
    If an object is black, it has been discovered, and all of its neighbors have been fully processed.
    
    At the beginning of the marking cycle, the marking bitmap is clear, and all objects are white.
    Objects reachable from the roots are colored grey and pushed onto the marking deque.
    At each step, the GC pops an object from the deque, marks it black, marks neighboring white objects as grey, and pushes them onto the deque. 
    The algorithm terminates when the deque is empty and all discovered objects have been marked black.
    Very large objects, such as long arrays, may be processed in pieces to reduce the chance of the deque overflowing.
    If the deque does overflow, objects are still colored grey but are not pushed onto the deque (so their neighbors are not discovered).
    When the deque is empty, the GC must scan the heap for grey objects, push them back onto the deque, and resume marking.
*/
/*  When the marking algorithm terminates, all live objects are marked black, and all dead objects are left white.
    This information is used by either the sweeping phase or the compacting phase, depending on which algorithm is being used.

    The sweeping algorithm scans for contiguous ranges of dead objects, converts them to free spaces, and adds them to free lists.
    The sweeping algorithm is extremely simple: it just iterates across the page's marking bitmap, looking for ranges of unmarked objects.
    Free lists are mostly used by the scavenge algorithm for promoting surviving objects to old-space,
    but they are also used by the compacting algorithm to relocate objects.
    Some kinds of objects can only be allocated in old-space, so free lists are used for those, too.

    The compacting algorithm attempts to reduce actual memory usage by migrating objects from fragmented pages to free spaces on other pages.
    New pages may be allocated, if necessary. Once a page is evacuated, it can be released back to the operating system.
    Basically, for each live object on an evacuation candidate page, space is allocated from a free list on another page.
    The object is copied into the freshly allocated space, and a forwarding address is left in the first word of the original object.
    During the evacuation, the locations of pointers between evacuated objects are recorded. Once the evacuation is complete,
    V8 iterates over the list of recorded pointer locations and updates them to point to the new copies.
    Locations of pointers between different pages are recorded during the marking process, so pointers from other pages are also updated at this time.
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------------
