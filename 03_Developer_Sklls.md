<!--
//cspell::ignore smblock
 -->

## Developer Skills

<details>
<summary>
Setting an coding environment, using debugger tools, the Node.Js runtime environment.
</summary>

### Vs Code configurations

<details>
<summary>
prettier code format extensions, configurable snippets.
</summary>
prettier code extension. installing, setting as default formatter.
uses double quotes instead of single quotes, removing blank lines, adds semi-colons.

we can configure the prettier format by creating a ".prettierrc" file and changing the properties. it's a json file.

```json
{
  "singleQuote": true, // use single quotes instead of doubles
  "arrowParens": "avoid" // omit parentheses in arrow functions when possible
}
```

we can also have our own custom code snippets. we can define them for either global or per file. we can force snippets with **<kbd>ctrl</kbd> + <kbd>space</kbd>**

> preferences -> user snippets.
> choose whatever file.

for example, here is the standard console log snippet

```json
  "Print to console": {
    "scope": "javascript,typescript",
    "prefix": "cl",
    "body": ["console.log();"],
    "description": "Log output to console"
  }
```

and a markdown snippet (in a different file)

```json
	"Markdown Summary Section": {
    "prefix": "smblock",
    "body": [
		"<details>",
		"<summary>",
		"$0",
		"</summary>",
		"</details>"],
    "description": "add details and summary blocks markdown"
    }
```

</details>

### Installing Node Js

<details>
<summary>
Checking our code in a faster matter.
</summary>
the live server extension that allows us run the changed html file immediately.
and there's also node.js, with the live server npm package

_node -v_ check node.js versions
_npm install live-server -g_ install live server package globally
we can then write _live-server.cmd_ in the terminal which will launch the browser in the current directory and will reload the files when changes happen.

</details>

### Learning How to Code

<details>
<summary>
How to learn to code. What to do and what to avoid.
</summary>

1. Set a specific goal.
   1. why are you learning?
   2. what is the goal?
   3. imagine a big project
2. Learn Code
   1. don't copy and paste code.
   2. always type the code yourself
   3. try to understand the code
3. Reinforce learning
   1. after you learn something, use it
   2. take notes
   3. challenge yourself
   4. the goal is to learn, not to finish courses.
4. Practice code outside the course
   1. come up with a project
   2. challenge yourself
   3. avoid tutorial hell
5. Don't try to write the perfect code.
   1. clean and efficient code will come with time.
   2. you will never never know everything. no one knows everything.
   3. don't compare yourself to expert, your measuring stick is yourself
6. Don't learn in isolation
   1. share and explain what you learned
   2. the best way to learn is to teach
   3. share your goals and progress publicly to push yourself
   4. don't stop learning, **never stop**

</details>

### Thinking like a Developer Becoming a Problem Solver

<details>
<summary>
Thinking like a developer.
</summary>

four step protocol to solve problems

> 1. Make sure you 100% understand the problem. **Ask the right questions** to get a clear picture of the problem.
> 2. **Divide and conquer**: break a big problem into smaller sub problems.
> 3. Don't be afraid to do as much **research** as you have to.
> 4. For bigger problems, **write pseudo-code** before writing the actual code.

</details>

### Using Resources

<details>
<summary>
Use google, MDN and stack overflow.
</summary>
code example of 'calculating temperature amplitude' following the 4 points process.
</details>

### Debugging

<details>
<summary>
Finding and fixing bugs.
</summary>

> - "**Software bug**: Defect or problem in a computer program, basically, any unexpected or unintended behavior, of a computer program is a software bug"
> - Bugs are **completely normal** in software development.

we can discover them at any stage, during development, in testing, or even from production.

in complex code, we need to use the debugger.

we can set breakpoints and look at the code from the 'sources' tab.

we can push a 'debugger' statement in the code which is like a breakpoint.

#### Code Challenge 1

<details>
<summary>
print an array transformed.
</summary>

> Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures.\
> Example: [17, 21, 23] will print "... 17ºC in 1
> days ... 21ºC in 2 days ... 23ºC in 3 days ..."
>
> Your tasks:
>
> 1. Create a function 'printForecast' which takes in an array 'arr' and logs a
>    string like the above to the console. Try it with both test datasets.
> 2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!
>
> Test data:
>
> - Data 1: [17, 21, 23]
> - Data 2: [12, 5, -5, 0, 4]
>   GOOD LUCK.

</details>
</details>
</details>
