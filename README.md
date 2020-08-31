# Solirius Sudoku Challenge

Write a script to solve sudoku puzzles.

The script should take a series of puzzles on stdin:

```
1,809200003400806100001030007640002315000000004507060900020407806104000050030908200
2,000008940089526103670300050103602407064015000000000000090801600200703005005000039
```

And provide the correct answer on stdout, e.g.

```
1,879241563453876192261539487648792315392185674517364928925417836184623759736958241
2,532178946489526173671349258153682497764915382928437561397851624246793815815264739
```

The answers don't need to be provided in the order they are given. The value before the comma is the ID of the puzzle.

You can test your script with this tool using `npm`:

```
npx sssc [command to execute your script]

# e.g.
npx sssc node test.js
npx sssc java -jar myapp.jar
``` 
