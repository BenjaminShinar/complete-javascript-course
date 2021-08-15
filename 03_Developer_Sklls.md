## Developer Skills

<!-- <details> -->
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

we can also have our own custom code snippets. we can define them for either global or per file. we can force snippets with **ctrl + space**

> preferences -> user snippets.
> choose whatever file.

for example, here is the standard console log snippet

```
  "Print to console": {
    "scope": "javascript,typescript",
    "prefix": "cl",
    "body": ["console.log();"],
    "description": "Log output to console"
  }
```

and a markdown snippet (in a different file)

```
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

### Thinking like a developer becoming a problem solver

### Using recourses

### Debugging

#### Code Challenge 1

<!-- </details> -->
